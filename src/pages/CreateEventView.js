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
            <Form.Group controlId="postText">
              <Form.Label>Post Text</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Enter post body"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
}
