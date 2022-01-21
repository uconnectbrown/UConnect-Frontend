import axios from "axios";
import React, { useEffect } from "react";

export function signInWithGoogle() {
  window.open(
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&access_type=offline&prompt=consent&hd=brown.edu`,
    "_self"
  );
}

export async function authenticateToken() {
  try {
    const res = await axios.get("/");
    return res.status === 200;
  } catch (err) {
    return false;
  }
}

export async function authenticateGoogleOAuth(authCode) {
  try {
    const res = await axios.post("/v1/user/authenticate/oauth/google", {
      authCode,
    });

    const token = res.data.jwtToken;
    const username = res.data.username;

    if (token) localStorage.setItem("JWTToken", token);
    if (username) localStorage.setItem("Username", username);
  } catch (err) {
    console.error(err);
  }
}

export async function getMyUser() {
  const username = localStorage.getItem("Username");
  const user = await getUser(username);
  if (user === 403) {
    localStorage.removeItem("JWTToken");
    localStorage.removeItem("Username");
    return null;
  }
  return user;
}

export async function getUser(username) {
  return {
    username,
    firstName: "Nicholas",
    lastName: "Bottone",
    classYear: "2024",
    bio: "I am a student at Brown University studying Computer Science.",
    requests: 10,
    profilePicture: "https://i.imgur.com/1m8kMyt.png",
    isProfileCompleted: true,
    courses: [
      {
        code: "CSCI 0330",
        name: "Introduction to Computer Systems",
      },
    ],
    majors: ["Computer Science"],
    pronouns: "he/him",
    location: {
      city: "Greenville",
      state: "RI",
      country: "USA",
    },
    interests: ["Computer Science", "Video Games"],
    connections: [],
    sentRequests: [],
    receivedRequests: [],
    groups: [],
    varsitySports: [],
    pickUpSports: [],
    instruments: [],
    interests1: [],
    interests2: [],
    interests3: [],
  };

  try {
    const res = await axios.post(`/v1/user/${username}`);
    const user = res.data;
    if (!user.profilePicture)
      user.profilePicture = "https://i.imgur.com/1m8kMyt.png";
    console.log(user);
    return user;
  } catch (err) {
    if (err.response.status === 403) {
      return 403;
    }
    return null;
  }
}

export function GoogleOAuthComponent() {
  useEffect(() => {
    async function handleAuth() {
      const oneTimeCode = new URLSearchParams(window.location.search).get(
        "code"
      );
      if (oneTimeCode) {
        await authenticateGoogleOAuth(oneTimeCode);
      }
      window.open("/", "_self");
    }
    handleAuth();
  }, []);

  return <></>;
}
