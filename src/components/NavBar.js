import React from "react";

import { Navbar, Container } from "react-bootstrap";
import { faBullseye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./NavBar.css";

function NavBar(props) {
  {
    return (
      <Navbar variant="light" className="top-bar">
        <Container>
          <Navbar.Brand>
            <div className="d-inline-block m-2">
              <FontAwesomeIcon icon={faBullseye} size="lg"/>
              {/* <img alt="UConnect Logo" src={require("../assets/Logo.png")}/> */}
            </div>
            <h3 className="d-inline-block align-middle">UConnect</h3>
          </Navbar.Brand>
          <div>
            <button onClick={props.handleProfile} className="requests-tracker">
              <div style={{ fontSize: 14}}>
                Requests: {props.requests}
              </div>
            </button>
            <button onClick={props.handleProfile}>
              <img alt="Profile Picture" src={props.imageUrl} className="nav-profile-img"/>
            </button>
          </div>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;

      // <AppBar color="secondary">
      //   <Toolbar className="nav-container">
      //     Requests: {props.requests}
      //     <SignOut style={{ position: "absolute", right: "10%" }} />
      //     <Button
      //       style={{ position: "absolute", right: "15%" }}
      //       onClick={props.handleProfile}
      //     >
            // <img
            //   alt="imageUrl"
            //   src={props.imageUrl}
            //   style={{ width: "50px" }}
            // />
      //     </Button>
      //   </Toolbar>
      // </AppBar>
