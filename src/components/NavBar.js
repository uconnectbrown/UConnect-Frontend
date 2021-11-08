import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Navbar, Container, Col, Button } from "react-bootstrap";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import Tooltip from "@material-ui/core/Tooltip";

import Logo from "../assets/Logo.png";
import Arrow from "../assets/arrow_vector.svg";
import ArrowFilled from "../assets/arrow_vector_filled.svg";

import "./NavBar.css";

function NavBar(props) {
  const [help, setHelp] = useState(false);

  const renderRequests = () => {
    const requests = [...Array(10).keys()];
    const spent = 10 - props.requests;

    // ArrowIcon is smaller on mobile devices
    const ArrowIcon = (index) => (
      <img src={index < spent ? Arrow : ArrowFilled} alt="Request Arrow" />
    );
    const MobileArrowIcon = (index) => (
      <img
        src={index < spent ? Arrow : ArrowFilled}
        alt="Request Arrow"
        width="12px"
      />
    );

    return (
      <Tooltip
        title={
          <div style={{ fontSize: "12px", padding: "5px" }}>
            {props.requests !== 1 &&
              `You have ${props.requests} requests remaining`}
            {props.requests === 1 &&
              `You have ${props.requests} request remaining`}
          </div>
        }
      >
        <div className="d-inline-block mx-2">
          {requests.map((i) => {
            if (window.innerWidth < 768) {
              return <MobileArrowIcon key={i} index={i} />;
            } else {
              return <ArrowIcon key={i} index={i} />;
            }
          })}
        </div>
      </Tooltip>
    );
  };

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
          {renderRequests()}

          <Tooltip
            title={
              <div style={{ fontSize: "12px", padding: "5px" }}>User Guide</div>
            }
          >
            <button onClick={() => setHelp(true)}>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                size="lg"
                color="#473F9B"
              />
            </button>
          </Tooltip>
          <Modal
            keyboard
            dialogClassName="student-modal"
            show={help}
            onHide={() => setHelp(false)}
          >
            {/* close button to close modal */}
            <Modal.Header closeButton>
              <Modal.Title>User Guide</Modal.Title>
            </Modal.Header>

            <Modal.Body className="mx-1 px-5 py-4">
              <h3>Featured Profiles</h3>
              <p style={{ fontSize: "14px" }}>
                Every Thursday, each user will receive a new set of featured
                profiles. These recommended profiles are determined based on the
                information you have provided in your profile. The more
                information you provide, the better your featured profiles will
                be.
              </p>
              <h3>Requests and Connections</h3>
              <p style={{ fontSize: "14px" }}>
                Every user has a set of 10 connection requests which can be sent
                to any other UConnect user. Sending a request reduces the number
                of remaining requests one has, but requests are returned to the
                sender when they have been accepted. Once two users are
                connected, they now have the ability to message each other and
                have access additional information such as their common courses.
              </p>
              <h3>Search and Filter</h3>
              <p style={{ fontSize: "14px" }}>
                One of the best ways to find others is by using the search bar
                on the home page. You are able to search for people by criteria
                such as their name, concentration, or extracurriculars.
              </p>
              <h3>Courses</h3>
              <p style={{ fontSize: "14px" }}>
                You can also access the other students in your courses by adding
                courses to your profile and then clicking on the course tab on
                the left side panel. The search bar at the top of the course
                page allows you to easily search and filter your classmates
                based on their name, class year, and concentration.
              </p>
              <h3>Your Profile</h3>
              <p style={{ fontSize: "14px" }}>
                Your profile page allows you to edit your profile and add pieces
                of information such as what courses you are taking and what
                extracurriculars you are involved in. Adding more additional
                information will also give you access to more powerful search
                tools to find other students who are relevant to you.
              </p>
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
