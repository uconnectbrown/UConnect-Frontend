import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import EventCard from "../components/EventCard";
import { getEvents } from "../util/eventBoardUtil";
import "./HomeView.css";

export default function HomeView() {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    async function fetchEvents() {
      const eventsRes = await getEvents();
      setEvents(eventsRes || []);
    }
    fetchEvents();
  }, []);

  return (
    <div className="HomeView">
      <Row>
        <Col sm={10}>
          <h1>Home</h1>
        </Col>
        <Col sm={2}>
          <Button as={Link} variant="primary" to="/event-create">
            Create Event
          </Button>
          {/* <Button as={Link} variant="danger" to="/moderator">
            Moderator
          </Button> */}
        </Col>
      </Row>
      <div className="p-3 mb-4 rounded-3">
        <Container fluid py={5} className="FeedContainer">
          <Row sm={1} lg={2} xl={3}>
            {events.map((event) => (
              <EventCard key={event.index} event={event} />
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
