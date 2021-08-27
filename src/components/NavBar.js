import React from "react";
import { Link } from "react-router-dom";

import { Navbar, Container } from "react-bootstrap";
import { faBullseye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Logo from "../assets/Logo.png"

import "./NavBar.css";

function NavBar(props) {
  {
    return (
      <Navbar variant="light" className="topbar">
        <Container>
          <Navbar.Brand>
            <div className="d-inline-block m-2">
              <img alt="UConnect Logo" src={Logo} className="topbar-logo"/>
            </div>
            <h3 className="d-inline-block align-middle">UConnect</h3>
          </Navbar.Brand>
          <div>
            <button onClick={props.handleProfile} className="requests-tracker">
              <div style={{ fontSize: 14}}>
                Requests: {props.requests}
              </div>
            </button>
            <Link to="/profile">
              <button>
                <img alt="Profile Picture" src={props.imageUrl} className="nav-profile-img"/>
              </button>
            </Link>
          </div>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;

      // <AppBar color="secondary">
      //   <Toolbar>
      //     Requests: {props.requests}
      //     <SignOut
      //       style={{ position: "absolute", right: "10%" }}
      //       reset={props.reset}
      //     />
      //     <Link to="/profile">
      //       <Button>
      //         <img
      //           alt="imageUrl"
      //           src={props.imageUrl}
      //           style={{ width: "50px" }}
      //         />
      //       </Button>
      //     </Link>
      //   </Toolbar>
      // </AppBar>