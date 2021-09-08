import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Navbar, Container } from "react-bootstrap";
import { faBullseye, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import Tooltip from "@material-ui/core/Tooltip";

import Logo from "../assets/Logo.png";

import "./NavBar.css";

// Components
import Requests from "./Requests";

function NavBar(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [outgoing, setOutgoing] = useState(props.outgoing);
  const [help, setHelp] = useState(false);

  useEffect(() => {
    setOutgoing(props.outgoing);
  }, [props.outgoing]);

  return (
    <Navbar variant="light" className="topbar">
      <Container>
        <Link to="/home">
          <Navbar.Brand>
            <div className="d-inline-block m-2">
              <img alt="UConnect Logo" src={Logo} className="topbar-logo" />
            </div>
            <h2 className="d-inline-block align-middle nav-header">UConnect</h2>
          </Navbar.Brand>
        </Link>
        <div>
          {/* <button onClick={props.handleProfile} className="requests-tracker">
            <div
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
              style={{ fontSize: 14 }}
            >
              {!showDropdown && "Requests"}
              {showDropdown && (
                <Requests
                  requests={props.requests}
                  incRequests={props.incRequests}
                  outgoing={props.outgoing}
                  updateOutgoing={props.updateOutgoing}
                  style={{ width: "100%" }}
                />
              )}
            </div>
          </button> */}
          <button style={{pointerEvents: "none"}} className="requests-tracker">
            Requests: {props.requests}
          </button>
          
          <Tooltip title="Functionality Info">
            <button onClick={() => setHelp(true)}>
              <FontAwesomeIcon icon={faQuestionCircle} style={{marginLeft:-10, marginRight: 8}}/>
            </button>
          </Tooltip>
          <Modal show={help} dialogClassName="student-modal">
            <Modal.Body className="mx-5 px-5 py-4">
              <h3>Featured Profiles</h3>
              <p style={{ fontSize: '14px' }}>
                Every Thursday at 9PM EST, each user will receive a new set of
                featured profiles. These recommended profiles are determined
                based on the information you have provided in your profile. The
                more information you provide, the better your featured profiles
                will be.
              </p>
              <h3>Requests and Connections</h3>
              <p style={{ fontSize: '14px' }}>
                Every user has a set of 10 connection requests which can be sent
                to any other UConnect user. Sending a request reduces the number
                of remaining requests one has, but requests are returned to the
                sender when they have been accepted. Once two users are
                connected, they now have the ability to message each other and
                have access additional information such as their common courses.
              </p>
              <h3>Search and Filter</h3>
              <p style={{ fontSize: '14px' }}>
                One of the best ways to find others is by using the search bar
                on the home page. You are able to search for people by criteria
                such as their name, concentration, or extracurriculars.
              </p>
              <h3>Courses</h3>
              <p style={{ fontSize: '14px' }}>
                You can also access the other students in your courses by adding
                courses to your profile and then clicking on the course tab on
                the left side panel. The search bar at the top of the course
                page allows you to easily search and filter your classmates
                based on their name, class year, and concentration.
              </p>
              <h3>Your Profile</h3>
              <p style={{ fontSize: '14px' }}>
                Your profile page allows you to edit your profile and add pieces
                of information such as what courses you are taking and what
                extracurriculars you are involved in. Adding more additional
                information will also give you access to more powerful search
                tools to find other students who are relevant to you.
              </p>
              <div align="right">
                <button onClick={() => setHelp(false)}>Close</button>
              </div>
            </Modal.Body>
          </Modal>
          <Link to="/profile">
          <button>
            <img
              alt="Profile Picture"
              src={props.imageUrl}
              className="nav-profile-img"
            />
          </button>
        </Link>
        </div>
      </Container>
    </Navbar>
  );
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
