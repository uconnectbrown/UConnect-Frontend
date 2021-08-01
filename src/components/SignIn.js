// Setup
import React from "react";
import firebase from "firebase";
import { db, auth } from "../firebase.js";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function SignIn() {
  let history = useHistory();

  function checkExists(emailId) {
    db.doc(`/profiles/${emailId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          history.push("/coursesView");
        } else {
          history.push({
            pathname: "/profileBuild",
            state: { validRoute: true },
          });
        }
      });
  }

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(() => {
        let emailId = auth.currentUser.email.split("@")[0];
        checkExists(emailId);
      })
      .catch((err) => console.log(err));
  }
  return <Button onClick={signInWithGoogle}>Sign In</Button>;
}

export default SignIn;
