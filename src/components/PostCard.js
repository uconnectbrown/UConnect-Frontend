import React from "react";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function PostCard(props) {
  return (
    <Link to={`/post/${props.postNumber}`} style={{ textDecoration: "none" }}>
      <Card className="PostCard">
        <Card.Title>Post {props.postNumber}</Card.Title>
        <Card.Body style={{ textAlign: "center" }}>
          <Card.Text>{props.postText}</Card.Text>
          <Link to="#">
            <Button variant="secondary" size="sm">
              <FontAwesomeIcon icon={faHeart} /> {props.likeCount}
            </Button>{" "}
            <Button variant="secondary" size="sm">
              <FontAwesomeIcon icon={faComment} /> {props.commentCount}
            </Button>{" "}
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://uconnectbrown.com/post/${props.postNumber}`
                )
              }
            >
              <FontAwesomeIcon icon={faShare} />
            </Button>
          </Link>
        </Card.Body>
        <Card.Footer className="PostFooter">
          <small className="text-muted">{props.timeAgoPosted} mins ago</small>
        </Card.Footer>
      </Card>
    </Link>
  );
}
