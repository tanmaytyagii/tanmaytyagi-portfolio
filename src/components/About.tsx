import "./styles/About.css";
import { about } from "../data/profile";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">{about.title}</h3>
        <p className="para">{about.body}</p>
      </div>
    </div>
  );
};

export default About;
