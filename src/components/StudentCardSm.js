import React from "react";
import { Col } from "react-bootstrap";

import "./StudentCardSm.css";

const StudentCardSm = (props) => {
  return (
    <Col sm={1} className="student-card-sm" onClick={props.onClick}>
      <div style={{ border: "5px solid #ffffff", borderRadius: "10rem" }}>
        <img
          className={
            props.ownImageUrl ===
            "https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media"
              ? "student-card-profile-img-blur"
              : "student-card-profile-img"
          }
          alt="Profile Picture"
          src={props.imageUrl}
        />
      </div>
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
