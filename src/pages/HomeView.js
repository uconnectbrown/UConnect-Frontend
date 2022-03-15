import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import EventCard from "../components/EventCard";
import { getEvents } from "../util/eventBoardUtil";
import "./HomeView.css";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

export default function HomeView() {
  const [events, setEvents] = React.useState([]);
  // Set to -2 on startup because backend return 0 if end is reached, -1 if no content,
  // both 0 and -1 indicates no more query calls are necessary.
  // But backend will retrieve latest indices if startIndex is negative, which is why we set to -2 on startup
  const lastQueriedIndexRef = React.useRef(-2);
  const defaultEventCountPerQuery = 10;

  const fetchEvents = React.useCallback(async () => {
    const lastQueriedIndex = lastQueriedIndexRef.current;
    console.log(lastQueriedIndex);
    if (lastQueriedIndex === 0 || lastQueriedIndex === -1) {
      return;
    }

    const eventsRes = await getEvents(
      // lastQueriedIndex is already on the page, so the next query starts at (lastQueriedIndex - 1)
      lastQueriedIndex - 1,
      defaultEventCountPerQuery
    );

    lastQueriedIndexRef.current = eventsRes.lastQueriedIndex;
    setEvents([...events, ...eventsRes.events] || []);
  }, [events]);

  // leave the dependency list in and EMPTY, otherwise will create an infinite loop until the end of db is reached
  // because useEffect without an empty dependency list will trigger after every render and fetchEvents() triggers
  // a render every time unless the end of db is reached
  React.useEffect(() => {
    fetchEvents();
  }, []);

  const handleOnDocumentBottom = React.useCallback(() => {
    fetchEvents();
  }, [fetchEvents]);
  useBottomScrollListener(
    handleOnDocumentBottom,
    {
      offset: 1,
      debounce: 1000,
    },
    [fetchEvents]
  );

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
          <Row>
            {lastQueriedIndexRef.current === 0
              ? "You have reached the beginning of time. Refresh the page to see the newest events on campus!"
              : ""}
          </Row>
        </Container>
      </div>
    </div>
  );
}
