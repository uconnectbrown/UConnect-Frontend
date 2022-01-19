import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import PostCard from "../components/PostCard";
import { getPosts } from "../util/postingBoardUtil";
import "./HomeView.css";

export default function HomeView() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    async function fetchPosts() {
      const postsRes = await getPosts();
      setPosts(postsRes || []);
    }
    fetchPosts();
  }, []);

  return (
    <div className="HomeView">
      <Row>
        <Col sm={10}>
          <h1>Home</h1>
        </Col>
        <Col sm={2}>
          <Button as={Link} variant="primary" to="/post-create">
            Create Post
          </Button>
          <Button as={Link} variant="danger" to="/moderator">
            Moderator
          </Button>
        </Col>
      </Row>
      <div class="p-3 mb-4 rounded-3">
        <Container fluid py={5} className="FeedContainer">
          <Row sm={1} lg={2} xl={3}>
            {posts.map((post) => (
              <PostCard key={post.postNumber} post={post} />
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
