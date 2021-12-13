import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./HomeView.css";

export default function HomeView() {
  const MyCard = (props) => (
    <Card className="PostCard" as={Link} to={`/post/${props.postNumber}`}>
      <Card.Title>Post {props.postNumber}</Card.Title>
      <Card.Body>
        <Card.Text>
          Bacon ipsum dolor amet ball tip cupim alcatra meatball kevin jerky.
          Shankle rump burgdoggen ball tip filet mignon hamburger flank tri-tip
          shank sausage turducken kevin porchetta. Leberkas kevin capicola
          hamburger filet mignon biltong sirloin flank fatback boudin. Chuck
          buffalo chislic swine strip steak ball tip jerky beef pastrami
          chicken. Cow ball tip jowl pig strip steak rump.
        </Card.Text>
        {/* Like button with count of number of reactions */}
        <Button variant="secondary" size="sm">
          Like
        </Button>
      </Card.Body>
      <Card.Footer className="PostFooter">
        <small className="text-muted">3 mins ago</small>
      </Card.Footer>
    </Card>
  );

  return (
    <div className="HomeView">
      <Row>
        <Col sm={10}>
          <h1>Home</h1>
        </Col>
        <Col sm={2}>
          <Button as={Link} variant="primary" to="/post/create">
            Create Post
          </Button>
        </Col>
      </Row>
      <div class="p-3 mb-4 bg-light rounded-3">
        <Container fluid py={5} className="FeedContainer">
          <Row sm={1} lg={2} xl={3}>
            {Array.from({ length: 10 }).map((_, idx) => (
              <MyCard key={idx} postNumber={idx} />
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
