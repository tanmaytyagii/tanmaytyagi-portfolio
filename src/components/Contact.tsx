import { MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { identity } from "../data/profile";

/**
 * Contact answers one question: how to reach Tanmay. Profile links live in the
 * floating rail (all seven) and, for the coding platforms, in Problem Solving —
 * so they are deliberately not repeated here.
 */
const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href={`mailto:${identity.email}`} data-cursor="disable">
                {identity.email}
              </a>
            </p>
            <h4>Location</h4>
            <p>{identity.location}</p>
          </div>
          <div className="contact-box">
            <h2>
              Built and maintained <br /> by <span>{identity.shortName}</span>
            </h2>
            <h5>
              <MdCopyright /> {new Date().getFullYear()}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
