import React, { useState } from "react";
import { Link } from "react-router-dom";

// MUI Stuff
import Button from "@material-ui/core/Button";

function SideBar(props) {
  const [page, setPage] = useState("home");
  const [dropDown, setDropDown] = useState(false);
  const courses = props.courses;
  return (
    <div>
      <Link to="/home" style={{ textDecoration: "none" }}>
        <Button
          fullWidth
          variant="contained"
          color={page === "home" ? "primary" : "default"}
          onClick={() => setPage("home")}
        >
          Home
        </Button>
      </Link>
      <Link to="/messages" style={{ textDecoration: "none" }}>
        <Button
          fullWidth
          variant="contained"
          color={page === "messages" ? "primary" : "default"}
          onClick={() => setPage("messages")}
        >
          Messages
        </Button>
      </Link>
      <Link to="/connections" style={{ textDecoration: "none" }}>
        <Button
          fullWidth
          variant="contained"
          color={page === "connections" ? "primary" : "default"}
          onClick={() => setPage("connections")}
        >
          Connections
        </Button>
      </Link>

      <Button
        fullWidth
        variant="contained"
        color={page === "courses" ? "primary" : "default"}
        onClick={() => {
          setDropDown(!dropDown);
        }}
      >
        Courses
      </Button>

      {courses && dropDown && (
        <div>
          {courses.map((course) => {
            if (course.code) {
              let link = "/courses/" + course.code.replace(/\s/g, "");
              return (
                <Link to={link} style={{ textDecoration: "none" }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      setDropDown(!dropDown);
                      setPage("courses");
                      props.handleCode(course.code);
                    }}
                  >
                    {course.code}
                  </Button>
                </Link>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

export default SideBar;
