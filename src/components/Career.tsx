import "./styles/Career.css";
import { career } from "../data/profile";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {career.map((entry) => (
            <div className="career-info-box" key={entry.organisation}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{entry.role}</h4>
                  <h5>{entry.organisation}</h5>
                </div>
                <h3>{entry.period}</h3>
              </div>
              <p>{entry.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
