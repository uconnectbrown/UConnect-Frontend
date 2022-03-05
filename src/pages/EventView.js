import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import CommentCard from "../components/CommentCard";

import EventCard from "../components/EventCard";
import "./EventView.css";
import { getEvent, postComment } from "../util/eventBoardUtil";

export default function EventView(props) {
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

  const onSubmit = (e) => {
    e.preventDefault();
    postComment(event.id, commentText, props.user.username, false);
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
                  <Form onSubmit={onSubmit}>
                    <Form.Label>Post a comment</Form.Label>
                    <Form.Group controlId="commentText">
                      <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Enter comment body"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
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
