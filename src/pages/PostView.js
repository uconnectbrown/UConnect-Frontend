import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import CommentCard from "../components/CommentCard";

import PostCard from "../components/PostCard";
import "./PostView.css";
import { getPost } from "../util/postingBoardUtil";

const ipsum =
  "Bacon ipsum dolor amet burgdoggen frankfurter corned beef pork swine prosciutto pig doner chicken alcatra meatball chislic leberkas fatback. T-bone strip steak alcatra tenderloin pork chop kielbasa. Pork ball tip buffalo hamburger. Shankle porchetta venison sirloin flank. Prosciutto venison pastrami spare ribs ground round tenderloin. Jerky short ribs rump pastrami ribeye.";

export default function PostView() {
  const { postId } = useParams();
  const location = useLocation();
  const isAuthoring = location.pathname.includes("comment");

  const [post, setPost] = React.useState();

  React.useEffect(() => {
    async function fetchPost() {
      const postRes = await getPost(postId);
      setPost(postRes);
    }
    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="PostView">
      <Container className="PostContainer">
        <PostCard post={post} />
        <div className="PostComments">
          <h3>Comments</h3>
          {isAuthoring && (
            <>
              <Card>
                <Container>
                  <Form>
                    <Form.Label>Post a comment</Form.Label>
                    <Form.Group controlId="commentText">
                      <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Enter comment body"
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Container>
              </Card>
              <hr />
            </>
          )}
          {post.comments.map((comment) => (
            <CommentCard key={comment.commentNumber} comment={comment} />
          ))}
        </div>
      </Container>
    </div>
  );
}
