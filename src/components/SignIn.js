// Setup
import React from "react";
import firebase from "firebase";
import { auth } from "../firebase.js";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function SignIn() {
  let history = useHistory();
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(() => {
      history.push("/profileView");
    });
  }
  return <Button onClick={signInWithGoogle}>Sign In</Button>;
}

export default SignIn;
