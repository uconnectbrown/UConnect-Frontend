import React from "react";
import { Button, Card, Container, Image } from "react-bootstrap";

import { getModFeedEvents } from "../util/eventBoardUtil";
import "./ModView.css";

export default function ModView() {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    async function fetchEvents() {
      const eventsRes = await getModFeedEvents();
      setEvents(eventsRes || []);
    }
    fetchEvents();
  }, []);

  return (
    <div className="ModView">
      <h1>Moderator Portal</h1>
      <div class="p-3 mb-4 rounded-3">
        <Container fluid py={5} className="FeedContainer">
          {events.map((event) => (
            <Card className="ModCard">
              <Card.Header>
                <Image
                  src={event.authorInfo.imageUrl}
                  alt="avatar"
                  roundedCircle
                  width={32}
                  height={32}
                />
                <b> {event.authorInfo.firstName}</b>
              </Card.Header>
              <Card.Body>
                <p>{event.title}</p>
                <p>{event.description}</p>
                <p>{event.location}</p>
                <p>{new Date(event.startTime).toLocaleString()}</p>
                <p>
                  Submitted by: {event.authorInfo.firstName}{" "}
                  {event.authorInfo.lastName}, Hosted By: {event.host}
                </p>
              </Card.Body>
              <Card.Footer>
                <Button variant="success">Approve</Button>
                <Button variant="danger">Reject</Button>
              </Card.Footer>
            </Card>
          ))}
        </Container>
      </div>
    </div>
  );
}
