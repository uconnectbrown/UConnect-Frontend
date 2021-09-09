// Setup
import React from "react";
import firebase from "firebase";
import { db, auth } from "../firebase.js";
import { useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import { Button } from "react-bootstrap";
import "./WelcomeView.css";

import Logo from "../assets/Logo.png";

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

  return (
    <div className="welcome-page">
      <div className="welcome-container">
        <div className="d-flex align-items-center justify-content-center">
          <img
            alt="UConnect Logo"
            src={Logo}
            className="topbar-logo d-inline-block m-2"
          />
          <h1 className="welcome-header d-inline-block m-2">UConnect</h1>
        </div>
        <Button
          onClick={signInWithGoogle}
          className="w-100 mt-4 mb-3"
          size="lg"
        >
          Sign In
        </Button>
        <div>
          <div>
            First time using UConnect? &nbsp;&nbsp;
            <br />
            <span className="sign-in-link" onClick={signInWithGoogle}>
              Sign Up with Brown email
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
