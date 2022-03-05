import React from "react";

import { useNavigate } from "react-router-dom";

function SignOut(props) {
  let navigate = useNavigate();

  async function signout() {
    localStorage.clear();
    navigate("/");
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
