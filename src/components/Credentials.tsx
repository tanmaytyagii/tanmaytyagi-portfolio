import "./styles/Credentials.css";
import { MdArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";
import { SiCodechef, SiLeetcode } from "react-icons/si";
import { TbCode } from "react-icons/tb";
import { IconType } from "react-icons";
import { certifications, problemSolving } from "../data/profile";

/* Same marks the social rail already uses, so the two read as one system. */
const platformIcons: Record<string, IconType> = {
  codolio: TbCode,
  leetcode: SiLeetcode,
  codechef: SiCodechef,
  github: FaGithub,
};

const Credentials = () => {
  return (
    <div className="credentials-section section-container" id="credentials">
      <div className="credentials-container">
        <div className="credentials-col">
          <h3 className="credentials-label">Certifications</h3>
          <ul className="credentials-list">
            {certifications.map((certification) => (
              <li key={certification.name}>
                <h4>{certification.name}</h4>
                <p>{certification.issuer}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="credentials-col">
          <h3 className="credentials-label">{problemSolving.label}</h3>
          <p className="credentials-blurb">{problemSolving.blurb}</p>

          {problemSolving.stats.length > 0 && (
            <div className="credentials-stats">
              {problemSolving.stats.map((stat) => (
                <div className="credentials-stat" key={stat.label}>
                  <h4>{stat.value}</h4>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          <div className="ps-grid">
            {problemSolving.platforms.map((platform) => {
              const Icon = platformIcons[platform.key];
              return (
                <a
                  key={platform.key}
                  className={`ps-card${platform.wide ? " ps-wide" : ""}${
                    platform.primary ? " ps-primary" : ""
                  }`}
                  href={platform.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                >
                  <span className="ps-head">
                    {Icon && (
                      <span className="ps-icon" aria-hidden="true">
                        <Icon />
                      </span>
                    )}
                    <span className="ps-name">{platform.name}</span>
                    <span className="ps-arrow" aria-hidden="true">
                      <MdArrowOutward />
                    </span>
                  </span>
                  <span className="ps-kicker">{platform.kicker}</span>
                  <span className="ps-blurb">{platform.blurb}</span>
                  <span className="ps-cta">{platform.cta}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credentials;
