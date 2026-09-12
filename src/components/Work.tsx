import { useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MdArrowOutward } from "react-icons/md";
import { projects, Project } from "../data/profile";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ProjectLinks = ({ project }: { project: Project }) => (
  <div className="work-links">
    <a
      href={project.github}
      target="_blank"
      rel="noreferrer"
      data-cursor="disable"
    >
      GitHub <MdArrowOutward />
    </a>
    {project.live && (
      <a
        href={project.live}
        target="_blank"
        rel="noreferrer"
        data-cursor="disable"
      >
        Live Demo <MdArrowOutward />
      </a>
    )}
  </div>
);

/**
 * A ScrollTrigger killed without `revert` leaves its pin-spacer wrapping the
 * pinned element. Pinning again nests a second spacer inside the dead one, and
 * because the dead spacer keeps its own fixed height, every section after this
 * one lays out against that stale height and draws on top of the pinned stage.
 * Unwrap any orphan before pinning again.
 */
const removeOrphanPinSpacers = (section: HTMLElement) => {
  let parent = section.parentElement;
  while (parent && parent.classList.contains("pin-spacer")) {
    const grandParent = parent.parentElement;
    if (!grandParent) break;
    grandParent.insertBefore(section, parent);
    grandParent.removeChild(parent);
    parent = section.parentElement;
  }
};

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const container = containerRef.current;
      const flex = flexRef.current;
      if (!section || !container || !flex) return;

      removeOrphanPinSpacers(section);

      /**
       * How far the track has to travel so the last card finishes flush with the
       * right edge of the viewport.
       *
       * `flex.scrollWidth` cannot be used: .work-flex carries ::before/::after
       * hairlines that are `calc(50000vw)` wide, which puts its scrollWidth in the
       * hundreds of thousands. The cards are the only thing worth measuring.
       *
       * Read live on every call so ScrollTrigger can re-derive it on refresh —
       * card widths change at three breakpoints (980/600 → 700/350 → 420/350).
       */
      const getDistance = () => {
        const boxes = Array.from(
          flex.getElementsByClassName("work-box")
        ) as HTMLElement[];
        if (!boxes.length) return 0;

        const trackWidth = boxes.reduce(
          (total, box) => total + box.getBoundingClientRect().width,
          0
        );
        // Derive the container's offset from the viewport rather than reading
        // its rect: while the section is pinned it carries an inline width, and
        // a stale one (mid-resize) would centre the container against the wrong
        // box and silently skew every measurement below.
        const viewportWidth = document.documentElement.clientWidth;
        const containerWidth = container.getBoundingClientRect().width;
        const visibleWidth =
          (viewportWidth - containerWidth) / 2 +
          flex.getBoundingClientRect().width;
        // Half a card's horizontal padding, matching the original end position.
        // Reading `padding` as a shorthand returns the *vertical* value once the
        // short-viewport rules kick in, which left the last card cut off.
        const edge =
          parseFloat(window.getComputedStyle(boxes[0]).paddingLeft) / 2;

        return Math.max(0, trackWidth - visibleWidth + edge);
      };

      /**
       * Build/teardown as a pair. ScrollTrigger snapshots the pinned element's
       * inline state when it pins and restores that snapshot on every refresh,
       * so a refresh alone can never widen or narrow the pin to a new viewport —
       * the stale width re-seeds itself. Recreating the trigger is what makes it
       * re-capture, so a viewport change tears down and rebuilds.
       */
      let timeline: gsap.core.Timeline | null = null;

      // `kill(true)` does not reliably strip the inline width/height/inset that
      // pinning writes onto the element. Snapshot the pre-pin style once and put
      // it back verbatim on teardown, so a rebuild measures real CSS layout.
      const originalStyle = section.getAttribute("style");

      const build = () => {
        removeOrphanPinSpacers(section);
        timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            // Functions + invalidateOnRefresh: the pinned range and the travel
            // distance are re-derived on refresh rather than frozen at mount.
            end: () => `+=${getDistance()}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            id: "work",
          },
        });
        timeline.to(flex, { x: () => -getDistance(), ease: "none" });
      };

      const teardown = () => {
        timeline?.scrollTrigger?.kill(true);
        timeline?.kill();
        timeline = null;
        removeOrphanPinSpacers(section);
        if (originalStyle === null) {
          section.removeAttribute("style");
        } else {
          section.setAttribute("style", originalStyle);
        }
      };

      build();

      let settleTimer = 0;
      let frame = 0;
      let lastWidth = Math.round(flex.getBoundingClientRect().width);

      const rebuild = () => {
        window.clearTimeout(settleTimer);
        settleTimer = window.setTimeout(() => {
          lastWidth = Math.round(flex.getBoundingClientRect().width);
          const scrollY = window.scrollY;
          teardown();
          // One frame unpinned lets the section reflow to the new viewport
          // before the rebuild snapshots it.
          frame = window.requestAnimationFrame(() => {
            build();
            ScrollTrigger.refresh();
            window.scrollTo(0, scrollY);
          });
        }, 250);
      };

      // Catches width changes with no window resize behind them: zoom, a
      // scrollbar appearing, the webfont landing. Guarded on the measured width
      // so a rebuild cannot retrigger the observer into a loop.
      const observer = new ResizeObserver(() => {
        if (Math.round(flex.getBoundingClientRect().width) === lastWidth) return;
        rebuild();
      });
      observer.observe(flex);
      window.addEventListener("resize", rebuild);

      return () => {
        window.clearTimeout(settleTimer);
        window.cancelAnimationFrame(frame);
        window.removeEventListener("resize", rebuild);
        observer.disconnect();
        teardown();
      };
    },
    { scope: sectionRef }
  );

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container" ref={containerRef}>
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex" ref={flexRef}>
          {projects.map((project, index) => (
            <div
              className={`work-box${project.featured ? " work-box-featured" : ""}`}
              key={project.id}
            >
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>

                <p className="work-summary">{project.summary}</p>

                {project.pipeline && (
                  <div className="work-pipeline">
                    {project.pipeline.map((stage) => (
                      <span className="work-stage" key={stage}>
                        {stage}
                      </span>
                    ))}
                  </div>
                )}

                <h4>Tools and features</h4>
                <p>{project.tech.join(" · ")}</p>

                <ProjectLinks project={project} />
              </div>

              <div className="work-visual">
                <WorkImage
                  image={project.image}
                  alt={`${project.name} — ${project.category}`}
                  link={project.live ?? project.github}
                />
                {project.featured && project.metrics && (
                  <div className="work-metrics">
                    {project.metrics.map((metric) => (
                      <div className="work-metric" key={metric.label}>
                        <h5>{metric.value}</h5>
                        <p>{metric.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
