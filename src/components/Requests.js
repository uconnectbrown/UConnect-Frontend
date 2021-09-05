// Setup
import React, { useState, useEffect } from "react";
import OutgoingLogo from "../assets/OutgoingLogo.png";
import { Row, Col, Container, Modal } from "react-bootstrap";

// Components
import StudentModal from "../components/StudentModal";

import Tooltip from "@material-ui/core/Tooltip";

// Styling
import "./Requests.css";

function Requests(props) {
  const [studentId, setStudentId] = useState("");
  const [outgoing, setOutgoing] = useState(props.outgoing);
  useEffect(() => {
    setOutgoing(props.outgoing);
  }, [props.outgoing]);

  const handleOpenStudent = (index) => {
    setStudentId(outgoing[index].emailId);
  };

  const handleCloseStudent = () => {
    setStudentId(null);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col style={{ justifyContent: "center" }}>Available</Col>
          <Col style={{ justifyContent: "center" }}>Outgoing</Col>
        </Row>
        <Row xs="auto" md="auto" lg="auto">
          <Col>
            {props.requests}
            <img
              alt="Outgoing Logo"
              src={OutgoingLogo}
              className="outgoing-logo"
            />
          </Col>
          <Col>
            {props.outgoing.map((student, i) => {
              return (
                <Tooltip title="Outgoing requests">
                  <Col sm={1} style={{ justifyContent: "center" }}>
                    <button onClick={() => handleOpenStudent(i)}>
                      <img
                        alt={student.emailId}
                        src={student.imageUrl}
                        className="outgoing-avatar"
                      />
                    </button>
                  </Col>
                </Tooltip>
              );
            })}
          </Col>
        </Row>
      </Container>
      <Modal
        keyboard
        show={studentId}
        onHide={handleCloseStudent}
        dialogClassName="student-modal"
      >
        <Modal.Body>
          <StudentModal
            closeOnUndo={true}
            studentId={studentId}
            handleClose={handleCloseStudent}
            incRequests={props.incRequests}
            requests={props.requests}
            updateOutgoing={props.updateOutgoing}
            outgoing={props.outgoing}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Requests;
