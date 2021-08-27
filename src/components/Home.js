// Setup
import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase.js";
import Select from "react-select";

// Components
import Student from "./Student";
import Message from "./Message";

import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from "@fortawesome/free-solid-svg-icons"

import "./Home.css"

// Resources
import { classYears, majors } from "../resources/searchOptions";

function Home(props) {
  const [emailId, setEmailId] = useState(null);
  const [email, setEmail] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [students, setStudents] = useState(null);
  const [searchMode, setSearchMode] = useState(false);
  const [query, setQuery] = useState("");
  const [studentId, setStudentId] = useState("");
  const [classYears_, setClassYears] = useState([]);
  const [majors_, setMajors] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);
  const [messageOpen, setMessageOpen] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setEmailId(auth.currentUser.email.split("@")[0]);
      setEmail(auth.currentUser.email);
    }
  }, []);

  useEffect(() => {
    if (emailId) getFeatured();
  }, [emailId]);

  const getFeatured = () => {
    axios
      .get(`/featured/${emailId}`)
      .then((res) => {
        setFeatured(res.data.featured);
      })
      .catch((err) => console.log(err));
  };

  const searchField = (years, majors) => {
    axios
      .get(`/all/${email}`)
      .then((res) => {
        setStudents(
          res.data.filter((student) =>
            filterField(student.classYear, student.majors, years, majors)
          )
        );
      })
      .then(() => {
        setSearching(true);
      })
      .catch((err) => console.log(err));
  };

  const searchName = (query) => {
    axios
      .get(`/all/${email}`)
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

  const filterField = (classYear, majors, years, majors_) => {
    const compare = (a1, a2) => a1.filter((v) => a2.includes(v)).length;
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

  const canSearch = (classYears_, majors_) => {
    if (classYears_.length > 0 || majors_.length > 0) return true;
  };

  const handleOpenStudent = (index) => {
    setStudentId(students[index].email.split("@")[0]);
  };

  const handleOpenFeatured = (index) => {
    setStudentId(featured[index].emailId);
  };

  const handleCloseStudent = () => {
    setStudentId(null);
  };

  const handleOpenMessage = (id, image, name) => {
    setStudentInfo([id, image, name]);
    setMessageOpen(true);
  };

  const handleCloseMessage = () => {
    setMessageOpen(false);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault()
    searchName(query)
  }

  const clearSearch = () => {
    setStudents([]);
    setClassYears([]);
    setMajors([]);
    setQuery("");
    setSearching(false);
  }

  const renderSearchBar = () => {
    return (
      <div className="search-bar">
        <form onSubmit={onSearchSubmit} style={{ width: '97%'}}> 
          <label htmlFor="search">
            <span className="visually-hidden">Search for students</span>
          </label>
          <input
            type="text"
            className="search-input"
            id="search"
            placeholder="Search for students"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <button onClick={clearSearch}>
          <FontAwesomeIcon icon={faTimes} color={'grey'}/>
        </button>
      </div>
  )}

  const renderFilters = () => {
    return <Row className="my-3" style={{ paddingLeft: '0.5rem'}}>
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
  }

  const renderSeachResults = () => {
    return <div>
      {students.map((student, i) => {
        return (
          <Row className="search-card align-items-center" onClick={() => handleOpenStudent(i)} key={i}>
            <Col md={2} lg={1}>
              <img className="search-profile-img" alt="Profile Picture" src={student.imageUrl}/>
            </Col>
            <Col md={5} lg={5}>
              <div style={{ fontSize: '1.2em', fontStyle: 'bold' }}>{student.firstName + " " + student.lastName}</div>
              <div className="card-text">{student.classYear}</div>
              <div className="card-text">{student.majors.map((major) => major)}</div>
            </Col>
            <Col md={5} lg={6}>
              <ul style={{ marginBottom: 0 }}>
                <li className="card-text">thing in common</li>
                <li className="card-text">thing in common</li>
                <li className="card-text">thing in common</li>
              </ul>
            </Col>
          </Row>
        )
      })}
    </div>
  }

  const renderFeatured = () => {
    return <div>
      <h5 className="mt-4">Featured Profiles</h5>
      <div class="featured-container pb-4 pt-1">
        {
          featured.map((student, i) => { 
            return (
              <div className="featured-card mx-lg-3 mx-sm-1" onClick={() => handleOpenFeatured(i)}>
                <img className="featured-profile-img" alt="Profile Picture" src={student.imageUrl}/>
                <div className="card-text mb-3">{student.name}</div>
                <Button style={{ marginTop: 'auto' }}>
                  Request
                </Button>
              </div>
            )
          })
        }  
      </div>
    </div>
  }

  return (
    <Container fluid className="uconnect-home" style={{ marginTop: '1rem' }}>
      {/* <Dialog open={messageOpen && studentInfo}>
        <Message
          handleCloseMessage={handleCloseMessage}
          studentInfo={studentInfo}
        />
      </Dialog> */}

      <Modal 
        keyboard
        show={studentId} 
        onHide={handleCloseStudent}
        dialogClassName="student-modal"
      >
        <Modal.Body>
          <Student
            studentId={studentId}
            handleClose={handleCloseStudent}
            handleRequest={props.handleRequest}
            requests={props.requests}
            handleOpenMessage={handleOpenMessage}
          />
        </Modal.Body>
      </Modal>
      <h1>Connect</h1>
      {renderSearchBar()}
      {renderFilters()}
      {students && renderSeachResults()}
      {!searching && featured && renderFeatured()}
    </Container>
  )
}

export default Home;
