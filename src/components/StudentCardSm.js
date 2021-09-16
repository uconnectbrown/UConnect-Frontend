import React from "react";
import { Col } from "react-bootstrap";

import "./StudentCardSm.css";

const StudentCardSm = (props) => {
  return (
    <Col sm={1} className="student-card" onClick={props.onClick}>
      <img
        className="student-card-profile-img"
        alt="Profile Picture"
        src={props.imageUrl}
      />
      {props.name && props.classYear && (
        <div style={{ fontSize: "1rem", fontStyle: "bold" }}>
          {props.name} '{props.classYear.split("0")[1]}
        </div>
      )}
      {props.name && !props.classYear && (
        <div style={{ fontSize: "1rem", fontStyle: "bold" }}>{props.name}</div>
      )}
      {props.majors && (
        <div className="card-text">
          {props.majors
            .filter(Boolean)
            .map((major, i) =>
              i !== props.majors.filter(Boolean).length - 1
                ? major + ", "
                : major
            )}
        </div>
      )}
    </Col>
  );
};

export default StudentCardSm;
