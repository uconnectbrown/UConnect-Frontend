import React from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function PostCard(props) {
  return (
    <Link
      to={`/post/${props.post.postNumber}`}
      style={{ textDecoration: "none" }}
    >
      <Card className="PostCard">
        <Card.Title>Post {props.post.postNumber}</Card.Title>
        <Card.Body style={{ textAlign: "center" }}>
          <Card.Text>{props.post.postText}</Card.Text>
          <Link to="#">
            <Button variant="secondary" size="sm">
              <FontAwesomeIcon icon={faHeart} /> {props.post.likeCount}
            </Button>{" "}
            <Button
              variant="secondary"
              size="sm"
              as={Link}
              to={`/post/${props.post.postNumber}/comment`}
            >
              <FontAwesomeIcon icon={faComment} /> {props.post.commentCount}
            </Button>{" "}
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://uconnectbrown.com/post/${props.post.postNumber}`
                )
              }
            >
              <FontAwesomeIcon icon={faShare} />
            </Button>
          </Link>
        </Card.Body>
        <Card.Footer className="PostFooter">
          <Row>
            <Col className="text-start">
              <Image
                src={props.post.author.avatar}
                alt="avatar"
                roundedCircle
                width={32}
                height={32}
              />
              <b> {props.post.author.displayName}</b>
            </Col>
            <Col className="text-end">
              <small className="text-muted">
                {props.post.timeAgoPosted} mins ago
              </small>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Link>
  );
}
