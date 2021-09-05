// Setup
import React, { useState, useEffect } from "react";
import OutgoingLogo from "../assets/OutgoingLogo.png";
import { Row, Col, Modal } from "react-bootstrap";

// Components
import StudentModal from "../components/StudentModal";

import Tooltip from "@material-ui/core/Tooltip";

// Styling
import "./Requests.css";

function Requests(props) {
  const [studentId, setStudentId] = useState("");
  const logoArr = [];
  const [outgoing, setOutgoing] = useState(props.outgoing);
  useEffect(() => {
    setOutgoing(props.outgoing);
  }, [props.outgoing]);

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
        <Col>
          Available
          <Row>
            {logoArr.map((i) => {
              return (
                <Tooltip title="Requests available">
                  <Col sm={1} style={{ justifyContent: "center" }}>
                    <img
                      alt="Outgoing"
                      src={OutgoingLogo}
                      className="outgoing-logo"
                    />
                  </Col>
                </Tooltip>
              );
            })}
          </Row>
        </Col>
        {props.outgoing && (
          <Col>
            Outgoing
            <Row>
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
            </Row>
          </Col>
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
