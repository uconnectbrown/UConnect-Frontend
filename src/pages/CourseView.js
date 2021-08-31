// Setup
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { auth } from "../firebase";
import axios from "axios";

import Select from "react-select";

// Components
import StudentModal from "../components/StudentModal";
import Message from "../components/Message";
import SearchBar from "../components/SearchBar";
import StudentCard from "../components/StudentCard";

import Dialog from "@material-ui/core/Dialog";
import { Row, Col, Modal } from 'react-bootstrap';
import './CourseView.css';

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
      <h1 style={{ marginTop: '1rem'}}>{code}</h1>
      <SearchBar
        placeholder={`Search for students in ${code}`}
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
        {students && students.map((student, i) => {
          return <StudentCard 
            name={`${student.firstName} ${student.lastName}`} 
            classYear={student.classYear}
            majors={student.majors}
            imageUrl={student.imageUrl}
            onClick={() => handleOpenStudent(i)}
          />
        })}
      </Row>
    </div>
  );
}

export default Course;
