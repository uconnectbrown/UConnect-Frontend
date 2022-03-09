import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postEvent } from "../util/eventBoardUtil";

export default function CreateEventView({ user }) {
  const navigate = useNavigate();

  const [posterMode, setPosterMode] = React.useState(true);
  const [author, setAuthor] = React.useState("Me");
  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [date, setDate] = React.useState("");
  const [host, setHost] = React.useState("");

  const [validated, setValidated] = React.useState(false);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    setValidated(true);
    e.preventDefault();
    e.stopPropagation();

    if (form.checkValidity() === false) {
      return;
    }

    const res = await postEvent(
      title,
      description,
      new Date(date),
      location,
      host,
      !posterMode,
      posterMode ? user.username : author
    );
    if (res) {
      navigate("/");
    } else {
      alert("Error creating event");
    }
  };

  return (
    <div className="CreatePostView">
      <h1>Create Event</h1>
      <div className="p-3 mb-4 bg-light rounded-3">
        <Container fluid py={5} className="PostFormContainer">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="validationCustom01">
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
                onChange={(e) => setAuthor(e.target.value)}
                disabled={posterMode}
                required={!posterMode}
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
                required
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
                required
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Event Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Event Date and Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={date}
                onChange={(e) =>
                  e.target.value ? setDate(e.target.value) : setDate("")
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="host">
              <Form.Label>Host</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event host"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                required
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
