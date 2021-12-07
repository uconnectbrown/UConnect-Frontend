import React from "react";
import { Card, Container, Row } from "react-bootstrap";

import "./HomeView.css";

export default function HomeView() {
  const MyCard = (props) => (
    <Card>
      <Card.Title>Post ###</Card.Title>
      <Card.Body>
        <Card.Text>
          Bacon ipsum dolor amet ball tip cupim alcatra meatball kevin jerky.
          Shankle rump burgdoggen ball tip filet mignon hamburger flank tri-tip
          shank sausage turducken kevin porchetta. Leberkas kevin capicola
          hamburger filet mignon biltong sirloin flank fatback boudin. Chuck
          buffalo chislic swine strip steak ball tip jerky beef pastrami
          chicken. Cow ball tip jowl pig strip steak rump.
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">3 mins ago</small>
      </Card.Footer>
    </Card>
  );

  return (
    <div className="HomeView">
      <h1>Home</h1>
      <div class="p-5 mb-4 bg-light rounded-3">
        <Container fluid py={5}>
          <Row xs={1} md={2} lg={3}>
            {Array.from({ length: 10 }).map((_, idx) => (
              <MyCard key={idx} />
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
