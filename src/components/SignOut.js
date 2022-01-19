import React from "react";
import { auth } from "../firebase.js";

import { useNavigate } from "react-router-dom";

function SignOut(props) {
  let history = useNavigate();

  async function signout() {
    await auth.signOut();
    history.push("/");
  }
  return (
    <div style={props.style}>
      <button
        className="mb-3"
        size="large"
        color="inherit"
        onClick={() => {
          signout();
          props.reset();
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export default SignOut;
