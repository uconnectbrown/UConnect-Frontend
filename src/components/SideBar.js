import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Nav, Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserFriends,
  faDesktop,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import Badge from "@material-ui/core/Badge";

import "./SideBar.css";

function SideBar(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const courses = props.courses;

  const [, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const screenWidth = window.innerWidth;

  // render laptop-screen sidebar
  if (screenWidth >= 768) {
    return (
      <Nav defaultActiveKey="/home" className="flex-column px-lg-4">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Button variant="outline-light" className="nav-button">
            <FontAwesomeIcon icon={faHome} style={{ width: "100%" }} />
            Home
          </Button>
        </Link>
        <Link to="/discover" style={{ textDecoration: "none" }}>
          <Button variant="outline-light" className="nav-button">
            <FontAwesomeIcon icon={faSearch} style={{ width: "100%" }} />
            Discover
          </Button>
        </Link>
        <Link to="/connections" style={{ textDecoration: "none" }}>
          <Button variant="outline-light" className="nav-button">
            <span>
              <FontAwesomeIcon icon={faUserFriends} style={{ width: "100%" }} />
              {props.pending > 0 && (
                <Badge
                  badgeContent={props.pending}
                  color="primary"
                  style={{ marginTop: 18 }}
                />
              )}
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

  // render mobile-friendly navbar
  return (
    <Nav bg="light" variant="pills" fill justify>
      <Nav.Item>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Button variant="outline-light" className="nav-button">
            <FontAwesomeIcon icon={faHome} />
          </Button>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/discover" style={{ textDecoration: "none" }}>
          <Button variant="outline-light" className="nav-button">
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/connections" style={{ textDecoration: "none" }}>
          <Button variant="outline-light" className="nav-button">
            <span>
              <FontAwesomeIcon icon={faUserFriends} />
              <Badge
                badgeContent={props.pending}
                color="primary"
                style={{ marginTop: 18 }}
              ></Badge>
            </span>
          </Button>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <div
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <Button variant="outline-light" className="nav-button dropdown mb-5">
            <FontAwesomeIcon icon={faDesktop} />
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
      </Nav.Item>
    </Nav>
  );
}

export default SideBar;
