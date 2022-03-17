import React from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faShare,
  faThumbsUp,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { like, love, interest } from "../util/eventBoardUtil";

export default function EventCard({ event, user }) {
  const navigate = useNavigate();

  const [likes, setLikes] = React.useState(event.reactions.likeCount);
  const [loves, setLoves] = React.useState(event.reactions.loveCount);
  const [interesteds, setInteresteds] = React.useState(
    event.reactions.interestedCount
  );

  let liked = event.reactions.likeUsernames.includes(user?.username);
  let loved = event.reactions.loveUsernames.includes(user?.username);
  let interested = event.reactions.interestedUsernames.includes(user?.username);

  const handleLike = async () => {
    const res = await like(event.id);
    if (res) {
      setLikes((count) => count + 1);
      liked = !liked;
    }
  };

  const handleLove = async () => {
    const res = await love(event.id);
    if (res) {
      setLoves((count) => count + 1);
      loved = !loved;
    }
  };

  const handleInterest = async () => {
    const res = await interest(event.id);
    if (res) {
      setInteresteds((count) => count + 1);
      interested = !interested;
    }
  };

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
          <Button
            variant={liked ? "secondary" : "outline-secondary"}
            size="sm"
            onClick={handleLike}
          >
            <FontAwesomeIcon icon={faThumbsUp} /> {likes}
          </Button>{" "}
          <Button
            variant={loved ? "secondary" : "outline-secondary"}
            size="sm"
            onClick={handleLove}
          >
            <FontAwesomeIcon icon={faHeart} /> {loves}
          </Button>{" "}
          <Button
            variant={interested ? "secondary" : "outline-secondary"}
            size="sm"
            onClick={handleInterest}
          >
            <FontAwesomeIcon icon={faEye} /> {interesteds}
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
            onClick={() => {
              navigator.clipboard.writeText(
                `https://uconnectbrown.com/event/${event.index}`
              );
              alert("Copied link to clipboard!");
            }}
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
