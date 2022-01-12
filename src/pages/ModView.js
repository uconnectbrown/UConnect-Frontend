import React from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import PostCard from "../components/PostCard";
import { getModFeedPosts } from "../util/postingBoardUtil";
import "./ModView.css";

export default function ModView() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    async function fetchPosts() {
      const postsRes = await getModFeedPosts();
      setPosts(postsRes || []);
    }
    fetchPosts();
  }, []);

  return (
    <div className="ModView">
      <h1>Moderator Portal</h1>
      <div class="p-3 mb-4 rounded-3">
        <Container fluid py={5} className="FeedContainer">
          {posts.map((post) => (
            <Card className="ModCard">
              <Card.Header>
                <Image
                  src={post.author.avatar}
                  alt="avatar"
                  roundedCircle
                  width={32}
                  height={32}
                />
                <b> {post.author.displayName}</b>
              </Card.Header>
              <Card.Body>{post.postText}</Card.Body>
              <Card.Footer>
                <Button variant="success">Approve</Button>
                <Button variant="danger">Reject</Button>
              </Card.Footer>
            </Card>
          ))}
        </Container>
      </div>
    </div>
  );
}
