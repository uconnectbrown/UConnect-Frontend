import React from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function CreatePostView() {
  const [posterMode, setPosterMode] = React.useState(true);
  const [poster, setPoster] = React.useState("Me");
  const [postText, setPostText] = React.useState("");
  // TODO: Renovate this to include all the new event fields

  return (
    <div className="CreatePostView">
      <h1>Create Event</h1>
      <div class="p-3 mb-4 bg-light rounded-3">
        <Container fluid py={5} className="PostFormContainer">
          <Form>
            <Form.Group controlId="posterMode">
              <Form.Label>Poster</Form.Label>
              <Form.Check
                type="switch"
                label={posterMode ? "Post as Me" : "Post as Pseudonym"}
                name="posterMode"
                checked={posterMode}
                onChange={() => {
                  setPosterMode(!posterMode);
                  !posterMode ? setPoster("Me") : setPoster("");
                }}
              />
              <Form.Control
                type="text"
                placeholder="Enter poster name"
                value={poster}
                disabled={posterMode}
              />
            </Form.Group>
            <Form.Group controlId="postText">
              <Form.Label>Post Text</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Enter post body"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
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
