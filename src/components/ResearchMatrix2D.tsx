import { useState } from "react";
import { metrics } from "../data/research";

/**
 * Mobile stand-in for the 3D matrix. Same numbers, same reading — paired bars
 * per metric, tap to open the same detail the 3D tooltip shows. Rendered
 * instead of the WebGL canvas below the desktop breakpoint, so phones never
 * load the Three.js chunk at all.
 */
const ResearchMatrix2D = () => {
  const [open, setOpen] = useState<string | null>(metrics[0].key);

  return (
    <div className="rm2-wrap">
      <div className="rm-legend rm2-legend">
        <span>
          <i className="rm-dot rm-dot-llm" /> LLM
        </span>
        <span>
          <i className="rm-dot rm-dot-rag" /> RAG
        </span>
      </div>

      <ul className="rm2-list">
        {metrics.map((m) => {
          const isOpen = open === m.key;
          const leadRag = m.lowerIsBetter ? m.rag < m.llm : m.rag > m.llm;
          return (
            <li key={m.key} className={isOpen ? "rm2-open" : ""}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : m.key)}
                aria-expanded={isOpen}
              >
                <span className="rm2-name">
                  {m.name}
                  {m.lowerIsBetter && <i className="rm2-down">↓</i>}
                </span>

                <span className="rm2-bars">
                  <span className="rm2-row">
                    <span
                      className="rm2-bar rm2-bar-llm"
                      style={{ width: `${m.llm * 100}%` }}
                    />
                    <b>{m.llm.toFixed(2)}</b>
                  </span>
                  <span className="rm2-row">
                    <span
                      className="rm2-bar rm2-bar-rag"
                      style={{ width: `${m.rag * 100}%` }}
                    />
                    <b>{m.rag.toFixed(2)}</b>
                  </span>
                </span>
              </button>

              {isOpen && (
                <div className="rm2-detail">
                  <p className="rm-dir">
                    {m.lowerIsBetter ? "Lower is better" : "Higher is better"}
                    <em> · {leadRag ? "RAG" : "LLM"} leads</em>
                  </p>
                  <p className="rm-blurb">{m.blurb}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ResearchMatrix2D;
