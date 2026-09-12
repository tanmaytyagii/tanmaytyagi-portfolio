import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { metrics, Metric } from "../data/research";

/* Palette lifted from the site tokens so the scene reads as part of the page. */
const LLM_COLOR = "#6f6a74";
const RAG_COLOR = "#a274ff";
const GRID_COLOR = "#3a3440";

const STEP = 1.78; // spacing between metric groups
const BAR_W = 0.46;
const BAR_D = 0.46;
const HEIGHT = 4.6; // world height of a 1.0 score
const SPAN = (metrics.length - 1) * STEP;

type Hover = { metric: Metric; system: "llm" | "rag" } | null;

const barGeometry = new THREE.BoxGeometry(1, 1, 1);

function Bar({
  x,
  z,
  value,
  color,
  active,
  dimmed,
  onOver,
  onOut,
}: {
  x: number;
  z: number;
  value: number;
  color: string;
  active: boolean;
  dimmed: boolean;
  onOver: () => void;
  onOut: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const grown = useRef(0);
  const target = value * HEIGHT;

  useFrame((_s, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    // grow in on first reveal, then hold
    if (grown.current < 1) {
      grown.current = Math.min(1, grown.current + delta * 1.6);
    }
    const eased = 1 - Math.pow(1 - grown.current, 3);
    const h = Math.max(0.001, target * eased);
    mesh.scale.set(BAR_W, h, BAR_D);
    mesh.position.set(x, h / 2, z);
    const mat = mesh.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = THREE.MathUtils.lerp(
      mat.emissiveIntensity,
      active ? 0.85 : 0.14,
      delta * 8
    );
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, dimmed ? 0.35 : 1, delta * 8);
  });

  return (
    <mesh
      ref={ref}
      geometry={barGeometry}
      castShadow={false}
      onPointerOver={(e) => {
        e.stopPropagation();
        onOver();
      }}
      onPointerOut={onOut}
    >
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.14}
        roughness={0.45}
        metalness={0.15}
        transparent
        opacity={1}
      />
    </mesh>
  );
}

function Scene({
  hover,
  setHover,
}: {
  hover: Hover;
  setHover: (h: Hover) => void;
}) {
  const { invalidate } = useThree();

  // Any hover change needs a repaint while frameloop is on demand.
  useEffect(() => invalidate(), [hover, invalidate]);

  const gridLines = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 4; i++) {
      const y = (i / 4) * HEIGHT;
      pts.push(
        new THREE.Vector3(-SPAN / 2 - 1.5, y, -1.1),
        new THREE.Vector3(SPAN / 2 + 1.0, y, -1.1)
      );
    }
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    return g;
  }, []);

  return (
    <group position={[0.85, -HEIGHT / 2 - 0.15, 0]}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[4, 9, 6]} intensity={2.1} />
      <directionalLight position={[-6, 4, -4]} intensity={0.7} color="#c2a4ff" />

      {/* score gridlines, back plane */}
      <lineSegments geometry={gridLines}>
        <lineBasicMaterial color={GRID_COLOR} transparent opacity={0.55} />
      </lineSegments>

      {/* score axis labels */}
      {[0, 0.25, 0.5, 0.75, 1].map((v) => (
        <Html
          key={v}
          position={[-SPAN / 2 - 1.95, v * HEIGHT, -1.1]}
          center
          style={{ pointerEvents: "none" }}
          zIndexRange={[2, 0]}
        >
          <span className="rm-axis">{v.toFixed(2)}</span>
        </Html>
      ))}

      {metrics.map((m, i) => {
        const x = i * STEP - SPAN / 2;
        const isActive = hover?.metric.key === m.key;
        const anyHover = hover !== null;
        return (
          <group key={m.key}>
            <Bar
              x={x - 0.3}
              z={0.42}
              value={m.llm}
              color={LLM_COLOR}
              active={isActive && hover?.system === "llm"}
              dimmed={anyHover && !isActive}
              onOver={() => setHover({ metric: m, system: "llm" })}
              onOut={() => setHover(null)}
            />
            <Bar
              x={x + 0.3}
              z={-0.42}
              value={m.rag}
              color={RAG_COLOR}
              active={isActive && hover?.system === "rag"}
              dimmed={anyHover && !isActive}
              onOver={() => setHover({ metric: m, system: "rag" })}
              onOut={() => setHover(null)}
            />
            <Html
              position={[x, -0.42, 0.6]}
              center
              style={{ pointerEvents: "none" }}
              zIndexRange={[2, 0]}
            >
              <span className={`rm-tick${isActive ? " rm-tick-on" : ""}`}>
                {m.short}
                {m.lowerIsBetter && <i>↓</i>}
              </span>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

const ResearchMatrix = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<Hover>(null);
  const [visible, setVisible] = useState(false);

  // Only render while the chart is actually on screen.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const lead = hover
    ? hover.metric.lowerIsBetter
      ? hover.metric.rag < hover.metric.llm
        ? "RAG"
        : "LLM"
      : hover.metric.rag > hover.metric.llm
      ? "RAG"
      : "LLM"
    : null;

  return (
    <div className="rm-wrap" ref={wrapRef}>
      <div className="rm-canvas">
        <Canvas
          frameloop={visible ? "always" : "never"}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 4.4, 15.2], fov: 32 }}
          onPointerMissed={() => setHover(null)}
        >
          <Scene hover={hover} setHover={setHover} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 5}
            maxPolarAngle={Math.PI / 2.15}
            minAzimuthAngle={-Math.PI / 3.2}
            maxAzimuthAngle={Math.PI / 3.2}
            rotateSpeed={0.55}
            enableDamping
            dampingFactor={0.08}
          />
        </Canvas>

        {hover && (
          <div className="rm-tip" role="status">
            <h5>{hover.metric.name}</h5>
            <div className="rm-tip-vals">
              <div className={hover.system === "llm" ? "on" : ""}>
                <span className="rm-dot rm-dot-llm" />
                LLM<b>{hover.metric.llm.toFixed(2)}</b>
              </div>
              <div className={hover.system === "rag" ? "on" : ""}>
                <span className="rm-dot rm-dot-rag" />
                RAG<b>{hover.metric.rag.toFixed(2)}</b>
              </div>
            </div>
            <p className="rm-dir">
              {hover.metric.lowerIsBetter ? "Lower is better" : "Higher is better"}
              <em> · {lead} leads</em>
            </p>
            <p className="rm-blurb">{hover.metric.blurb}</p>
          </div>
        )}
      </div>

      <div className="rm-foot">
        <div className="rm-legend">
          <span>
            <i className="rm-dot rm-dot-llm" /> LLM
          </span>
          <span>
            <i className="rm-dot rm-dot-rag" /> RAG
          </span>
        </div>
        <p className="rm-hint">Drag to rotate · hover a bar for detail</p>
      </div>
    </div>
  );
};

export default ResearchMatrix;
