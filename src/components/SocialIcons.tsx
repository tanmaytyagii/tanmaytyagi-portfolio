import {
  FaGithub,
  FaLinkedinIn,
  FaRegEnvelope,
  FaXTwitter,
} from "react-icons/fa6";
import { SiCodechef, SiLeetcode } from "react-icons/si";
import "./styles/SocialIcons.css";
import { TbCode, TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { identity } from "../data/profile";

const icons = [
  { label: "GitHub", href: identity.links.github, Icon: FaGithub },
  { label: "LinkedIn", href: identity.links.linkedin, Icon: FaLinkedinIn },
  { label: "LeetCode", href: identity.links.leetcode, Icon: SiLeetcode },
  { label: "CodeChef", href: identity.links.codechef, Icon: SiCodechef },
  { label: "Codolio", href: identity.links.codolio, Icon: TbCode },
  { label: "X", href: identity.links.x, Icon: FaXTwitter },
  { label: "Email", href: `mailto:${identity.email}`, Icon: FaRegEnvelope },
];

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        {icons.map(({ label, href, Icon }) => (
          <span key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              title={label}
            >
              <Icon />
            </a>
          </span>
        ))}
      </div>
      {identity.resumeUrl && (
        <a
          className="resume-button"
          href={identity.resumeUrl}
          target="_blank"
          rel="noreferrer"
        >
          <HoverLinks text="RESUME" />
          <span>
            <TbNotes />
          </span>
        </a>
      )}
    </div>
  );
};

export default SocialIcons;
