// Setup
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { Link } from "react-router-dom";

// MUI Stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SignOut from "./SignOut.js";
import Button from "@material-ui/core/Button";

// Styles
import "./NavBar.css";

function NavBar(props) {
  {
    return (
      <AppBar color="secondary">
        <Toolbar>
          Requests: {props.requests}
          <SignOut style={{ position: "absolute", right: "10%" }} />
          <Link to="/profile">
            <Button>
              <img
                alt="imageUrl"
                src={props.imageUrl}
                style={{ width: "50px" }}
              />
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
