import React, { Component } from "react";
import { db, auth } from "../firebase";

export class test extends Component {
  render() {
    let id = auth.currentUser.email;
    return (
      <div>
        <h1>{id}</h1>
      </div>
    );
  }
}

export default test;
