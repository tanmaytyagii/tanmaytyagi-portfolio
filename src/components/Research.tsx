import { lazy, Suspense, useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import "./styles/Research.css";
import {
  architectures,
  confusionMatrix,
  findings,
  implementation,
  losses,
  methodology,
  metrics,
  narrative,
  paper,
} from "../data/research";
import ResearchMatrix2D from "./ResearchMatrix2D";

/* The WebGL chart is desktop-only, so phones never download the chunk. */
const ResearchMatrix = lazy(() => import("./ResearchMatrix"));

const useCanRender3D = () => {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 769px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setOk(query.matches && !reduced.matches);
    update();
    query.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      query.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);
  return ok;
};

const Frame = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`research-frame ${className}`}>
    <span className="research-corner" />
    {children}
  </div>
);

const Research = () => {
  const canRender3D = useCanRender3D();
  const [cell, setCell] = useState(confusionMatrix.cells[0].key);
  const activeCell =
    confusionMatrix.cells.find((c) => c.key === cell) ?? confusionMatrix.cells[0];

  return (
    <div className="research-section section-container" id="research">
      <div className="research-container">
        <h2>
          Published <span>research</span>
        </h2>

        {/* ---------------- paper identity ---------------- */}
        <Frame className="research-head">
          <div className="research-status">
            <span className="research-dot" />
            {paper.status}
            <em>{paper.venue}</em>
          </div>

          <h3 className="research-title">{paper.title}</h3>

          <div className="research-byline">
            <p className="research-authors">
              {paper.authors.map((a, i) => (
                <span key={a} className={i === 0 ? "research-me" : ""}>
                  {a}
                  {i < paper.authors.length - 1 && <i>·</i>}
                </span>
              ))}
            </p>
            <p className="research-inst">{paper.institution}</p>
          </div>

          <div className="research-head-foot">
            <div className="research-contribution">
              <strong>{paper.contribution.value}</strong>
              <span>
                {paper.contribution.label}
                <em>{paper.contribution.note}</em>
              </span>
            </div>
            <div className="research-role-tag">{paper.role}</div>
          </div>
        </Frame>

        {/* ---------------- narrative rail ---------------- */}
        <ol className="research-rail">
          {narrative.map((step) => (
            <li key={step.index}>
              <span className="research-rail-n">{step.index}</span>
              <div>
                <h4>{step.kicker}</h4>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* ---------------- methodology pipeline ---------------- */}
        <div className="research-block">
          <h4 className="research-label">Methodology</h4>
          <div className="research-pipe">
            {methodology.map((stage, i) => (
              <div className="research-node" key={stage.title}>
                <span className="research-node-i">{String(i + 1).padStart(2, "0")}</span>
                <h5>
                  {stage.title}
                  {stage.meta && <em>{stage.meta}</em>}
                </h5>
                <p>{stage.detail}</p>
              </div>
            ))}
          </div>
          <p className="research-scope">{paper.surveyScope}</p>
        </div>

        {/* ---------------- 3D comparison matrix ---------------- */}
        <div className="research-block">
          <h4 className="research-label">
            Comparative matrix
            <em>Table II · normalized scores</em>
          </h4>
          {canRender3D ? (
            <Suspense fallback={<div className="rm-loading">Loading matrix…</div>}>
              <ResearchMatrix />
            </Suspense>
          ) : (
            <ResearchMatrix2D />
          )}
        </div>

        {/* ---------------- reported change ---------------- */}
        <div className="research-block">
          <h4 className="research-label">
            Reported comparative change
            <em>RAG against the LLM baseline</em>
          </h4>
          <div className="research-findings">
            {findings.map((f) => (
              <div className="research-finding" key={f.label}>
                <strong>{f.value}</strong>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
          <p className="research-scope">
            Comparative figures reported across the surveyed systems — not the result of a
            newly trained model.
          </p>
        </div>

        {/* ---------------- conceptual confusion matrix ---------------- */}
        <div className="research-block">
          <h4 className="research-label">
            {confusionMatrix.label}
            <em>Table IV</em>
          </h4>
          <div className="research-cm">
            {["llm", "rag"].map((sys) => (
              <div className={`research-cm-panel research-cm-${sys}`} key={sys}>
                <h5>{sys.toUpperCase()}</h5>
                <div className="research-cm-grid">
                  {confusionMatrix.cells.map((c) => (
                    <button
                      type="button"
                      key={c.key}
                      className={`research-cm-cell${cell === c.key ? " on" : ""}${
                        c.good ? " good" : " bad"
                      }`}
                      onMouseEnter={() => setCell(c.key)}
                      onFocus={() => setCell(c.key)}
                      onClick={() => setCell(c.key)}
                      data-cursor="disable"
                    >
                      <span className="research-cm-code">{c.code}</span>
                      <span className="research-cm-val">
                        {(sys === "llm" ? c.llm : c.rag).toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="research-cm-read">
            <strong>
              {activeCell.code} — {activeCell.name}
            </strong>
            <span>{activeCell.blurb}</span>
          </div>
          <p className="research-scope">{confusionMatrix.note}</p>
        </div>

        {/* ---------------- architecture + objective ---------------- */}
        <div className="research-block research-split">
          <div>
            <h4 className="research-label">Where the two differ</h4>
            <div className="research-arch">
              {architectures.map((a) => (
                <div className={`research-arch-col research-arch-${a.key}`} key={a.key}>
                  <h5>{a.name}</h5>
                  <ol>
                    {a.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                  <p>{a.caption}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="research-label">
              Training objective
              <em>conceptual</em>
            </h4>
            <div className="research-loss">
              {losses.map((l) => (
                <div className="research-loss-row" key={l.key}>
                  <h5>{l.name}</h5>
                  <code>{l.formula}</code>
                  <p>{l.note}</p>
                </div>
              ))}
            </div>

            <h4 className="research-label research-label-gap">Companion implementation</h4>
            <p className="research-impl">{implementation.summary}</p>
            <div className="research-stack">
              {implementation.stack.map((t) => (
                <span className="research-chip" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- CTA ---------------- */}
        <Frame className="research-cta">
          <div className="research-cta-in">
            <div>
              <div className="research-status">
                <span className="research-dot" />
                {paper.status}
                <em>{paper.role}</em>
              </div>
              <h3>{paper.title}</h3>
              <p>
                {metrics.length} evaluation dimensions · {paper.contribution.value} papers
                reviewed by me · {paper.venue}
              </p>
            </div>
            <a
              className="research-cta-link"
              href={paper.repo}
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
            >
              {paper.cta} <MdArrowOutward />
            </a>
          </div>
        </Frame>
      </div>
    </div>
  );
};

export default Research;
