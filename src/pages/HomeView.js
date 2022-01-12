import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import PostCard from "../components/PostCard";
import "./HomeView.css";

const ipsum =
  "Bacon ipsum dolor amet burgdoggen frankfurter corned beef pork swine prosciutto pig doner chicken alcatra meatball chislic leberkas fatback. T-bone strip steak alcatra tenderloin pork chop kielbasa. Pork ball tip buffalo hamburger. Shankle porchetta venison sirloin flank. Prosciutto venison pastrami spare ribs ground round tenderloin. Jerky short ribs rump pastrami ribeye.";

export default function HomeView() {
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
      <div class="p-3 mb-4 rounded-3">
        <Container fluid py={5} className="FeedContainer">
          <Row sm={1} lg={2} xl={3}>
            {Array.from({ length: 10 }).map((_, idx) => (
              <PostCard
                key={idx}
                postNumber={idx}
                postText={ipsum}
                likeCount={Math.floor(Math.random() * 100)}
                commentCount={Math.floor(Math.random() * 100)}
                timeAgoPosted={Math.floor(Math.random() * 100)}
                author={{
                  displayName: "John Doe",
                  avatar: "https://placekitten.com/g/64/64",
                }}
              />
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
