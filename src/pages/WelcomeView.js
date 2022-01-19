// Setup
import React from "react";
import { Button } from "react-bootstrap";
import "./WelcomeView.css";
import { signInWithGoogle } from "../util/authUtil.js";

import Logo from "../assets/Logo.png";

// Body
function Welcome(props) {
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
