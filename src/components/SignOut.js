import React from "react";
import { auth } from "../firebase.js";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function SignOut() {
  let history = useHistory();
  return (
    <div>
      <Button
        color="inherit"
        onClick={() => {
          auth.signOut();
          history.push("/");
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}

export default SignOut;
