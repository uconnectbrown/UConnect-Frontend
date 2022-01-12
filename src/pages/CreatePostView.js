import React from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function CreatePostView() {
  return (
    <div className="CreatePostView">
      <h1>Create Post</h1>
      <div class="p-3 mb-4 bg-light rounded-3">
        <Container fluid py={5} className="PostFormContainer">
          <Form>
            <Form.Group controlId="poster">
              <Form.Label>Poster</Form.Label>
              <Form.Control type="text" placeholder="Enter poster name" />
            </Form.Group>
            <Form.Group controlId="postText">
              <Form.Label>Post Text</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Enter post body"
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
