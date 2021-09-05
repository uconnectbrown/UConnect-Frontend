// Setup
import React from "react";
import firebase from "firebase";
import { db, auth } from "../firebase.js";
import { useHistory } from "react-router-dom";

import { Row, Col, Container, Button } from "react-bootstrap";
import "./WelcomeView.css";



// Body
function Welcome(props) {
  let history = useHistory();

  function checkExists(emailId) {
    db.doc(`/profiles/${emailId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          props.grantAccess();
          history.push("/home");
        } else {
          props.denyAccess();
          history.push({
            pathname: "/profileBuild",
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

  return <div className="welcome-page">
    <div className="welcome-container">
      <h1 className="welcome-header">UConnect</h1>
      <Button 
        onClick={signInWithGoogle} 
        className="w-100 mt-2 mb-3"
        size="lg"
      >
        Sign In
      </Button>
      <div>
        <div>First time using UConnect? &nbsp;&nbsp;
          <a href="/" onClick={signInWithGoogle}>Sign Up</a>
        </div>
      </div>
    </div>
  </div>
}

export default Welcome;
