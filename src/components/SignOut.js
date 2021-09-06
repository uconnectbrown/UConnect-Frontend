import React from "react";
import { auth } from "../firebase.js";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function SignOut(props) {
  let history = useHistory();

  async function signout() {
    await auth.signOut();
    history.push("/");
  }
  return (
    <div style={props.style}>
      <Button
        className="mb-3"
        size="large"
        color="inherit"
        onClick={() => {
          signout();
          props.reset();
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}

export default SignOut;
