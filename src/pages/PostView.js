import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import PostCard from "../components/PostCard";
import "./PostView.css";

const ipsum =
  "Bacon ipsum dolor amet burgdoggen frankfurter corned beef pork swine prosciutto pig doner chicken alcatra meatball chislic leberkas fatback. T-bone strip steak alcatra tenderloin pork chop kielbasa. Pork ball tip buffalo hamburger. Shankle porchetta venison sirloin flank. Prosciutto venison pastrami spare ribs ground round tenderloin. Jerky short ribs rump pastrami ribeye.";

export default function PostView() {
  const { postId } = useParams();

  return (
    <div className="PostView">
      <Container className="PostContainer">
        <PostCard
          postNumber={postId}
          postText={ipsum}
          likeCount={Math.floor(Math.random() * 100)}
          commentCount={Math.floor(Math.random() * 100)}
          timeAgoPosted={Math.floor(Math.random() * 100)}
        />
      </Container>
    </div>
  );
}
