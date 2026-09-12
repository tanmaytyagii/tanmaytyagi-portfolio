import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { identity } from "../data/profile";

const Landing = ({ children }: PropsWithChildren) => {
  const [roleA, roleB] = identity.roles;
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {identity.firstName}
              <br />
              <span>{identity.lastName}</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>{identity.roleLead}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{roleA}</div>
              <div className="landing-h2-2">{roleB}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{roleB}</div>
              <div className="landing-h2-info-1">{roleA}</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
