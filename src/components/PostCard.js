import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PostCard(props) {
  return (
    <Card className="PostCard" as={Link} to={`/post/${props.postNumber}`}>
      <Card.Title>Post {props.postNumber}</Card.Title>
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Text>{props.postText}</Card.Text>
        {/* Like button with count of number of reactions */}
        <Button variant="secondary" size="sm">
          <i class="far fa-heart"></i> ({props.likeCount})
        </Button>{" "}
        <Button variant="secondary" size="sm">
          <i class="far fa-comments"></i> ({props.commentCount})
        </Button>
      </Card.Body>
      <Card.Footer className="PostFooter">
        <small className="text-muted">{props.timeAgoPosted} mins ago</small>
      </Card.Footer>
    </Card>
  );
}
