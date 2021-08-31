import React from 'react';
import { Col } from 'react-bootstrap';

import './StudentCard.css';

const StudentCard = (props) => {
  return (
    <Col sm={2} className="student-card" onClick={props.onClick}>
      <img
        className="student-card-profile-img"
        alt="Profile Picture"
        src={props.imageUrl}
      />
      <div style={{ fontSize: "1rem", fontStyle: "bold" }}>
        {props.name}
      </div>
      {props.classYear && 
        <div className="card-text">{props.classYear}</div>
      }
      {props.majors && 
        <div className="card-text">
          {props.majors.map((major) => major)}
        </div>
      }
    </Col>
  )
}

export default StudentCard;