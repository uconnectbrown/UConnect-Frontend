// Setup
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";

// MUI Stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SignOut from "./SignOut.js";

// Styles
import "./NavBar.css";

function NavBar(props) {
  {
    return (
      <AppBar color="secondary">
        <Toolbar className="nav-container">
          Requests: {props.requests}
          <SignOut style={{ position: "absolute", right: "10%" }} />
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
