import React from "react";
import { auth } from "../firebase.js";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

// Components
import App from "../App.js";

function SignOut() {
  let history = useHistory();

  async function signout() {
    await auth.signOut();
    history.push("/");
  }
  return (
    <div>
      <Button
        color="inherit"
        onClick={() => {
          signout();
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}

export default SignOut;
