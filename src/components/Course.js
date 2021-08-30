// Setup
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { auth } from "../firebase";
import axios from "axios";

import Select from "react-select";

// Components
import StudentModal from "./StudentModal";
import Message from "./Message";
import SearchBar from "./SearchBar";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import InputLabel from "@material-ui/core/InputLabel";
import CardContent from "@material-ui/core/CardContent";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";

import { Row, Col, Modal } from 'react-bootstrap'
import './Course.css'

// Resources
import { classYears, majors } from "../resources/searchOptions";

function Course(props) {
  const { codeParam } = useParams();
  const code = props.code;
  const codeNS = codeParam;
  const email = auth.currentUser.email;
  const [students, setStudents] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [studentInfo, setStudentInfo] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [classYears_, setClassYears] = useState([]);
  const [majors_, setMajors] = useState([]);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    if (codeNS) getStudents();
  }, [clear, code, codeParam]);

  const getStudents = () => {
    axios
      .get(`/students/${email}/${codeNS}`)
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleOpenStudent = (index) => {
    setStudentId(students[index].email.split("@")[0]);
  };

  const handleOpenMessage = (id, image, name) => {
    setStudentInfo([id, image, name]);
    setMessageOpen(true);
  };

  const handleCloseMessage = () => {
    setMessageOpen(false);
  };

  const handleCloseStudent = () => {
    setStudentId("");
  };

  const canSearch = (query, classYears_, majors_) => {
    if (searchMode) {
      if (query !== "") return true;
    } else {
      if (classYears_.length > 0 || majors_.length > 0) return true;
    }
  };

  const searchField = (years, majors_) => {
    axios
      .get(`/students/${email}/${codeNS}`)
      .then((res) => {
        setStudents(
          res.data.filter((student) =>
            filterField(student.classYear, student.majors, years, majors_)
          )
        );
      })
      .then(() => {
        setSearching(true);
      })
      .catch((err) => console.log(err));
  };

  const filterField = (classYear, majors, years, majors_) => {
    const compare = (a1, a2) => a1.filter((v) => a2.includes(v)).length;
    console.log(years, majors_);
    if (years.length > 0 && majors_.length > 0) {
      if (years.includes(classYear) && compare(majors, majors_) > 0)
        return true;
    } else if (years.length > 0 && majors_.length === 0) {
      if (years.includes(classYear)) return true;
    } else if (years.length === 0 && majors_.length > 0) {
      if (compare(majors, majors_) > 0) return true;
    }
  };

  const filterName = (fn, ln, query) => {
    fn = fn.toLowerCase().trim();
    ln = ln.toLowerCase().trim();
    query = query.toLowerCase().trim();
    if (fn.split(query)[0] === "") return true;
    if (ln === query) return true;
    if (query.split(" ").length === 2) {
      let query1 = query.split(" ")[0];
      let query2 = query.split(" ")[1];
      if (fn.split(query1)[0] === "" && ln.split(query2)[0] === "") return true;
    }
  };

  const searchName = (query) => {
    axios
      .get(`/students/${email}/${codeNS}`)
      .then((res) => {
        setStudents(
          res.data.filter((student) =>
            filterName(student.firstName, student.lastName, query)
          )
        );
      })
      .then(() => {
        setSearching(true);
      })
      .catch((err) => console.log(err));
  };

  const clearSearch = () => {
    setStudents([]);
    setClassYears([]);
    setMajors([]);
    setSearching(false);
    setQuery("");
    setClear(!clear);
  };

  const renderFilters = () => {
    return (
      <Row className="my-3" style={{ paddingLeft: "0.5rem" }}>
        <Col md={9} lg={4}>
          <Select
            closeMenuOnSelect={classYears_.length === classYears.length - 1}
            isMulti
            name="classYears"
            value={classYears_}
            options={classYears}
            onChange={(options) => setClassYears(options)}
            placeholder="Filter by class year..."
          />
        </Col>
        <Col md={9} lg={4}>
          <Select
            closeMenuOnSelect={majors_.length === majors.length - 1}
            isMulti
            name="concentration"
            value={majors_}
            options={majors}
            onChange={(options) => setMajors(options)}
            placeholder="Filter by concentration..."
          />
        </Col>
      </Row>
    );
  };

  const renderStudents = () => {
    return students.map((student, i) => {
      return (
        <Col sm={2} className="course-profile-card" onClick={() => handleOpenStudent(i)}>
          <img
            className="course-profile-img"
            alt="Profile Picture"
            src={student.imageUrl}
          />
          <div style={{ fontSize: "1rem", fontStyle: "bold" }}>
            {student.firstName} {student.lastName}
          </div>
          <div className="card-text">{student.classYear}</div>
          <div className="card-text">
            {student.majors.map((major) => major)}
          </div>
        </Col>
      )
    })
  }

  return (
    <div>
      <Modal
        keyboard
        show={studentId}
        onHide={handleCloseStudent}
        dialogClassName="student-modal"
      >
        <StudentModal
          studentId={studentId}
          handleClose={handleCloseStudent}
          handleRequest={props.handleRequest}
          requests={props.requests}
          handleOpenMessage={handleOpenMessage}
        />
      </Modal>
      {/* <Dialog open={messageOpen && studentInfo}>
        <Message
          handleCloseMessage={handleCloseMessage}
          studentInfo={studentInfo}
        />
      </Dialog> */}
      {code}
      <SearchBar
        placeholder="placeholder"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSubmit={() => {
          searchName(query);
          setSearching(true);
        }}
        clearSearch={clearSearch}
      />
      {renderFilters()}
      <Row>
        {students && renderStudents()}
      </Row>
    </div>
  );
}

export default Course;
