import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";

export default function CommentCard(props) {
  return (
    <Card body>
      <Row>
        <Col className="comment-card-display-name">
          <Image
            src={
              props.comment.authorInfo.imageUrl ||
              "https://i.imgur.com/1m8kMyt.png"
            }
            alt="avatar"
            roundedCircle
            width={32}
            height={32}
          />
          <b>
            {" "}
            {props.comment.authorInfo.firstName}{" "}
            {props.comment.authorInfo.lastName}
          </b>
        </Col>
        <Col className="text-end">
          <small className="text-muted">
            {new Date(props.comment.timestamp).toLocaleString()}
          </small>
        </Col>
      </Row>

      <div className="comment-card-text">{props.comment.content}</div>
    </Card>
  );
}
