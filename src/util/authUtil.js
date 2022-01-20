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
    if (!token) return;

    localStorage.setItem("JWTToken", token);
    localStorage.setItem("Username", "nicholas_bottone@brown.edu"); // FIXME: remove this
  } catch (err) {
    console.error(err);
  }
}

export async function getUser(username) {
  // return {
  //   username,
  //   email: "",
  //   firstName: "",
  //   lastName: "",
  //   classYear: "",
  //   requests: 10,
  //   profilePicture: "",
  //   profileCompleted: true,
  //   courses: [
  //     {
  //       code: "CSCI 0330",
  //       name: "Introduction to Computer Systems",
  //     },
  //   ],
  //   majors: [],
  //   pronouns: "",
  //   location: {
  //     city: "",
  //     state: "",
  //     country: "",
  //   },
  //   interests: [],
  //   connections: [],
  //   sentRequests: [],
  //   receivedRequests: [],
  // };

  try {
    const res = await axios.post(`/v1/user/${username}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    if (err.response.status === 403) {
      localStorage.removeItem("JWTToken");
      localStorage.removeItem("Username");
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
