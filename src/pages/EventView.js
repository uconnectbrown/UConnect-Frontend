import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import CommentCard from "../components/CommentCard";

import EventCard from "../components/EventCard";
import "./EventView.css";
import { getEvent, postComment } from "../util/eventBoardUtil";

export default function EventView(props) {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const location = useLocation();

  const isAuthoring = location.pathname.includes("comment");
  const [commentText, setCommentText] = React.useState("");

  const [event, setEvent] = React.useState();

  React.useEffect(() => {
    async function fetchEvent() {
      const eventRes = await getEvent(eventId);
      setEvent(eventRes);
    }
    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postComment(
      event.id,
      commentText,
      props.user.username,
      false
    );
    if (res) {
      // Hacky way to refresh the page until the backend returns a proper response
      navigate("/");
      navigate(`/event/${event.index}`);
    } else {
      alert("Error creating comment");
    }
  };

  return (
    <div className="PostView">
      <Container className="PostContainer">
        <EventCard event={event} />
        <div className="PostComments">
          <h3>Comments</h3>
          {isAuthoring && (
            <>
              <Card>
                <Container>
                  <Form onSubmit={handleSubmit}>
                    <Form.Label>Post a comment</Form.Label>
                    <Form.Group controlId="commentText">
                      <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Enter comment body"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Container>
              </Card>
              <hr />
            </>
          )}
          {event.comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </Container>
    </div>
  );
}
