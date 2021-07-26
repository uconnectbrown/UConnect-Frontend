import React from "react";
import { auth } from "../firebase.js";
import { Button } from "@material-ui/core";

function SignOut() {
  return (
    <div>
      <Button color="inherit" onClick={() => auth.signOut()}>
        Sign Out
      </Button>
    </div>
  );
}

export default SignOut;
