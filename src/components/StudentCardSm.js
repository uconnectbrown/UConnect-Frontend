import React from "react";
import { Col } from "react-bootstrap";

import "./StudentCardSm.css";

const StudentCardSm = (props) => {
  return (
    <Col xs={6} md={2} className="student-card-sm" onClick={props.onClick}>
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
    </Col>
  );
};

export default StudentCardSm;
