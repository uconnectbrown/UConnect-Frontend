import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Container, Nav, Button, ButtonGroup } from "react-bootstrap";
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

export default SideBar;
