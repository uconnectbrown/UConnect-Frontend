import React from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <Card
      className="PostCard"
      onClick={() => {
        navigate(`/event/${event.eventId}`);
      }}
    >
      <Card.Title>{event.eventTitle}</Card.Title>
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Text>{event.eventDescription}</Card.Text>
        <Card.Text>{event.eventLocation}</Card.Text>
        <Card.Text>{new Date(event.eventDate).toLocaleString()}</Card.Text>
        <span onClick={(e) => e.stopPropagation()}>
          <Button variant="secondary" size="sm">
            <FontAwesomeIcon icon={faHeart} /> {event.likeCount}
          </Button>{" "}
          <Button
            variant="secondary"
            size="sm"
            as={Link}
            to={`/event/${event.eventId}/comment`}
          >
            <FontAwesomeIcon icon={faComment} /> {event.commentCount}
          </Button>{" "}
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              navigator.clipboard.writeText(
                `https://uconnectbrown.com/event/${event.eventId}`
              )
            }
          >
            <FontAwesomeIcon icon={faShare} />
          </Button>
        </span>
      </Card.Body>
      <Card.Footer className="PostFooter">
        <Row>
          <Col className="text-start" sm={9}>
            <Image
              src={event.author.avatar}
              alt="avatar"
              roundedCircle
              width={32}
              height={32}
            />
            <b> {event.author.displayName}</b> on behalf of{" "}
            <b>{event.hostedBy}</b>
          </Col>
          <Col className="text-end" sm={3}>
            <small className="text-muted">{event.timeAgoPosted} mins ago</small>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}
