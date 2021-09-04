// Setup
import React, { useState, useEffect } from "react";
import OutgoingLogo from "../assets/OutgoingLogo.png";
import { Row, Col, Modal } from "react-bootstrap";

// Components
import StudentModal from "../components/StudentModal";

// Styling
import "./Requests.css";

function Requests(props) {
  const [studentId, setStudentId] = useState("");
  const logoArr = [];
  const outgoing = props.outgoing;
  for (let i = 0; i < props.requests; i++) {
    logoArr.push(true);
  }
  const handleOpenStudent = (index) => {
    setStudentId(outgoing[index].emailId);
  };

  const handleCloseStudent = () => {
    setStudentId(null);
  };

  return (
    <div>
      <Row>
        Available:
        {logoArr.map((i) => {
          return (
            <Col sm={1} style={{ justifyContent: "center" }}>
              <img
                alt="Outgoing"
                src={OutgoingLogo}
                className="outgoing-logo"
              />
            </Col>
          );
        })}
      </Row>
      <Row>
        Outgoing:
        {outgoing && (
          <div>
            {outgoing.map((student, i) => (
              <button onClick={() => handleOpenStudent(i)}>
                <img
                  alt={student.emailId}
                  src={student.imageUrl}
                  className="outgoing-avatar"
                />
              </button>
            ))}
          </div>
        )}
      </Row>
      <Modal
        keyboard
        show={studentId}
        onHide={handleCloseStudent}
        dialogClassName="student-modal"
      >
        <Modal.Body>
          <StudentModal
            studentId={studentId}
            handleClose={handleCloseStudent}
            incRequests={props.incRequests}
            requests={props.requests}
            updateOutgoing={props.updateOutgoing}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Requests;
