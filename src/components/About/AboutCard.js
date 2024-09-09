import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Rishabh Pandey </span>
            from <span className="purple"> UttarPradesh, India.</span>
            <br />
            I am currently employed as a Cyber Security Specialist at Arrow Electronics.
            <br />
            I have completed B.Tech in Electronics And Communication at AKTU
            <br />
            <br />
            Apart from cyber security, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
          
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
