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
        navigate(`/event/${event.index}`);
      }}
    >
      <Card.Title>{event.title}</Card.Title>
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Text>{event.description}</Card.Text>
        <Card.Text>Location: {event.location}</Card.Text>
        <Card.Text>{new Date(event.startTime).toLocaleString()}</Card.Text>
        <span onClick={(e) => e.stopPropagation()}>
          <Button variant="secondary" size="sm">
            <FontAwesomeIcon icon={faHeart} /> {event.likes}
          </Button>{" "}
          <Button
            variant="secondary"
            size="sm"
            as={Link}
            to={`/event/${event.index}/comment`}
          >
            <FontAwesomeIcon icon={faComment} /> {event.comments.length}
          </Button>{" "}
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              navigator.clipboard.writeText(
                `https://uconnectbrown.com/event/${event.index}`
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
              src={
                event.authorInfo.imageUrl || "https://i.imgur.com/1m8kMyt.png"
              }
              alt="avatar"
              roundedCircle
              width={32}
              height={32}
            />
            <b>
              {" "}
              {event.authorInfo.firstName} {event.authorInfo.lastName}
            </b>{" "}
            on behalf of <b>{event.host}</b>
          </Col>
          <Col className="text-end" sm={3}>
            <small className="text-muted">
              {Math.floor((Date.now() - event.timestamp) / 60_000)} mins ago
            </small>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}
