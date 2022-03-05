import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { postEvent } from "../util/eventBoardUtil";

export default function CreatePostView() {
  const [posterMode, setPosterMode] = React.useState(true);
  const [author, setAuthor] = React.useState("Me");
  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [date, setDate] = React.useState("");
  const [host, setHost] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    postEvent(title, description, date, location, host, !posterMode, author);
  };

  return (
    <div className="CreatePostView">
      <h1>Create Event</h1>
      <div class="p-3 mb-4 bg-light rounded-3">
        <Container fluid py={5} className="PostFormContainer">
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="posterMode">
              <Form.Label>Poster</Form.Label>
              <Form.Check
                type="switch"
                label={posterMode ? "Post as Me" : "Post as Pseudonym"}
                name="posterMode"
                checked={posterMode}
                onChange={() => {
                  setPosterMode(!posterMode);
                  !posterMode ? setAuthor("Me") : setAuthor("");
                }}
              />
              <Form.Control
                type="text"
                placeholder="Enter poster name"
                value={author}
                disabled={posterMode}
              />
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                rows="3"
                placeholder="Enter event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Event Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Enter event description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Event Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Event Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter event date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="host">
              <Form.Label>Host</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event host"
                value={host}
                onChange={(e) => setHost(e.target.value)}
              />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
}
