import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Container, Nav, Button, ButtonGroup } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCommentAlt, faUserFriends, faDesktop } from "@fortawesome/free-solid-svg-icons"

import "./SideBar.css"

function SideBar(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const courses = props.courses;

  return (
    <Container className="pr-5">
      <Nav defaultActiveKey='/home' className='flex-column'>
        <Link to="/#/home" style={{ textDecoration: "none" }}>
          <Button variant="outline-light" className='nav-button'>
            <FontAwesomeIcon icon={faHome} style={{ width: '100%'}}/>
            Home
          </Button>
        </Link>
        <Link to="/#/messages" style={{ textDecoration: "none" }}>
          <Button variant="outline-light" className='nav-button'>
            <FontAwesomeIcon icon={faCommentAlt} style={{ width: '100%'}}/>
            Messages
          </Button>
        </Link>
        <Link to="/#/connections" style={{ textDecoration: "none" }}>
          <Button variant="outline-light" className='nav-button'>
            <FontAwesomeIcon icon={faUserFriends} style={{ width: '100%'}}/> 
            Connections
          </Button>
        </Link>
        <div 
          onMouseEnter={() => setShowDropdown(true)} 
          onMouseLeave={() => setShowDropdown(false)}
        >
          <Button variant="outline-light" className='nav-button dropdown mb-5' >
            <FontAwesomeIcon icon={faDesktop} style={{ width: '100%'}}/> 
            Courses
          {showDropdown && 
            <ButtonGroup vertical style={{ width: '100%'}}> 
              {courses.map((course, i) => {
                if (!course.code) return null
                let link = "/#/courses/" + course.code.replace(/\s/g, "");
                return (
                  <Link to={link} style={{ textDecoration: "none", width: '100%', maxWidth: '100%' }}>
                    <Button variant="outline-light" className='nav-button m-0'>
                      {course.code}
                    </Button>
                  </Link>
              )})}
            </ButtonGroup>
          }
          </Button>
        </div>
      </Nav>
    </Container>
  );
}

export default SideBar;
