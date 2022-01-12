import axios from "axios";

// Input: integer post id number
// Output: post object
export async function getPost(postId) {
  return {
    id: postId,
    author: "John Doe",
    post: "This is a test post",
  };

  try {
    const response = await axios.get(`/api/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Output: array of post objects
export async function getPosts() {
  return [
    {
      id: 1,
      author: "John Doe",
      post: "This is a test post",
    },
    {
      id: 2,
      author: "Bobby Joe",
      post: "Whoop whoop",
    },
  ];

  try {
    const response = await axios.get(`/api/posts`);
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
