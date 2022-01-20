import axios from "axios";

const ipsum =
  "Bacon ipsum dolor amet burgdoggen frankfurter corned beef pork swine prosciutto pig doner chicken alcatra meatball chislic leberkas fatback. T-bone strip steak alcatra tenderloin pork chop kielbasa. Pork ball tip buffalo hamburger. Shankle porchetta venison sirloin flank. Prosciutto venison pastrami spare ribs ground round tenderloin. Jerky short ribs rump pastrami ribeye.";

// Input: integer post id number
// Output: post object
export async function getPost(postNumber) {
  return {
    postNumber: postNumber,
    postText: ipsum,
    likeCount: Math.floor(Math.random() * 100),
    commentCount: Math.floor(Math.random() * 100),
    timeAgoPosted: Math.floor(Math.random() * 100),
    author: {
      displayName: "John Doe",
      avatar: "https://placekitten.com/g/64/64",
    },
    comments: [
      {
        author: {
          displayName: "John Doe",
          avatar: "https://placekitten.com/g/62/62",
        },
        timestamp: "1 hour ago",
        comment: "This is a comment",
        commentNumber: 1,
      },
      {
        author: {
          displayName: "Bob Smith",
          avatar: "https://placekitten.com/g/60/60",
        },
        timestamp: "2 hour ago",
        comment: "This is another comment!!!",
        commentNumber: 2,
      },
    ],
  };

  try {
    const response = await axios.get(`/api/posts/${postNumber}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Output: array of post objects
export async function getPosts() {
  return Array.from({ length: 10 }).map((_, idx) => ({
    postNumber: idx,
    postText: ipsum,
    likeCount: Math.floor(Math.random() * 100),
    commentCount: Math.floor(Math.random() * 100),
    timeAgoPosted: Math.floor(Math.random() * 100),
    author: {
      displayName: "John Doe",
      avatar: "https://placekitten.com/g/64/64",
    },
  }));

  try {
    const response = await axios.get(`/api/posts`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Output: array of post objects
export async function getModFeedPosts() {
  return Array.from({ length: 10 }).map((_, idx) => ({
    postId: idx,
    postText: ipsum,
    author: {
      displayName: "John Doe",
      avatar: "https://placekitten.com/g/64/64",
    },
  }));

  try {
    const response = await axios.get(`/api/posts/modfeed`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Input: integer post id number, boolean for like or unlike
// Output: post object
export async function likePost(postId, like) {
  try {
    const response = await axios.post(`/api/posts/${postId}/like`, {
      like,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Input: integer post id number, string comment text, optional string display name
// Output: post object
export async function postComment(postId, comment, displayName) {
  try {
    const response = await axios.post(`/api/posts/${postId}/comment`, {
      comment,
      displayName,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Input: string post text, optional string display name
// Output: post object
export async function postPost(postText, displayName) {
  try {
    const response = await axios.post(`/api/posts`, {
      postText,
      displayName,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
