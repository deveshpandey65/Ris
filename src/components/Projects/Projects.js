import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/Screenshot 2024-09-06 184553.png";
import chatify from "../../Assets/Projects/Screenshot 2024-09-06 184207.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/Screenshot 2024-09-06 184500.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Connect With <strong className="purple">Me </strong>
        </h1>
        <p style={{ color: "white" }}>
          Follow me in these platforms.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Instagram"
              demoLink="https://www.instagram.com/cyberrishabh/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Youtube"
              demoLink="https://www.youtube.com/@CyberRishabh"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="LinkedIn"
              demoLink="https://www.linkedin.com/in/rishabhpandeyy/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Twitter"
              demoLink="https://www.linkedin.com/in/rishabhpandeyy/"
            />
          </Col>

          
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
