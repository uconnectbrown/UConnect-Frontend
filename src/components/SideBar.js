import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Container, Nav, Navbar, NavDropdown, Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCommentAlt,
  faUserFriends,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";
import Badge from "@material-ui/core/Badge";

import "./SideBar.css";

function SideBar(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const courses = props.courses;

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const screenWidth = window.innerWidth;

  // render laptop-screen sidebar
  if (screenWidth > 576) {
    return (
      <Nav defaultActiveKey="/home" className="flex-column px-lg-4">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Button variant="outline-light" className="nav-button">
            <FontAwesomeIcon icon={faHome} style={{ width: "100%" }} />
            Home
          </Button>
        </Link>
        <Link to="/messages" style={{ textDecoration: "none" }}>
          <Button variant="outline-light" className="nav-button">
            <span>
              <FontAwesomeIcon icon={faCommentAlt} style={{ width: "100%" }} />
  
              <Badge
                badgeContent={props.messageCount}
                color="primary"
                style={{ marginTop: 18 }}
              ></Badge>
            </span>
            Messages
          </Button>
        </Link>
        <Link to="/connections" style={{ textDecoration: "none" }}>
          <Button variant="outline-light" className="nav-button">
            <span>
              <FontAwesomeIcon icon={faUserFriends} style={{ width: "100%" }} />
              <Badge
                badgeContent={props.pending}
                color="primary"
                style={{ marginTop: 18 }}
              ></Badge>
            </span>
            Connections
          </Button>
        </Link>
        <div
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <Button variant="outline-light" className="nav-button dropdown mb-5">
            <FontAwesomeIcon icon={faDesktop} style={{ width: "100%" }} />
            Courses
            {showDropdown && (
              <ButtonGroup vertical style={{ width: "100%" }}>
                {courses
                  .map((course) => {
                    if (course.code) {
                      return course.code;
                    }
                  })
                  .filter(Boolean).length === 0 && (
                  <Link
                    to="/profile"
                    style={{
                      textDecoration: "none",
                      width: "100%",
                      maxWidth: "100%",
                    }}
                  >
                    <Button variant="outline-light" className="nav-button m-0">
                      Add courses to your profile.
                    </Button>
                  </Link>
                )}
                {courses.map((course, i) => {
                  if (!course.code) return null;
                  let link = "/courses/" + course.code.replace(/\s/g, "");
                  return (
                    <Link
                      to={link}
                      style={{
                        textDecoration: "none",
                        width: "100%",
                        maxWidth: "100%",
                      }}
                    >
                      <Button
                        variant="outline-light"
                        className="nav-button m-0"
                        onClick={() => {
                          props.handleCode(course.code);
                          props.handleName(course.name);
                        }}
                      >
                        {course.code}
                      </Button>
                    </Link>
                  );
                })}
              </ButtonGroup>
            )}
          </Button>
        </div>
      </Nav>
    );
  }

  // render mobile-friendly collapsible navbar
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/home" style={{ textDecoration: "none" }}>
              <Nav.Link href="#home">Home</Nav.Link>
            </Link>
            <Link to="/messages" style={{ textDecoration: "none" }}>
              <Nav.Link href="#link">Messages</Nav.Link>
            </Link>
            <Link to="/connections" style={{ textDecoration: "none" }}>
              <Nav.Link href="#connections">Connections</Nav.Link>
            </Link>
            <NavDropdown title="Courses" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

}

export default SideBar;
