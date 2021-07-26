// Setup
import React from "react";
import firebase from "firebase";
import { auth } from "../firebase.js";
import { Button } from "@material-ui/core";

function SignIn() {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return <Button onClick={signInWithGoogle}>Sign In</Button>;
}

export default SignIn;
