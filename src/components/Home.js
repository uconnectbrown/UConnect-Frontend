// Setup
import React, { useEffect, useState } from "react";
import axios from "axios";
import { db, auth } from "../firebase.js";
import Select from "react-select";

// Components
import StudentModal from "./StudentModal";
import Message from "./Message";

import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./Home.css";

// Resources
import {
  searchOptions,
  searchTypes,
  classYears,
  majors,
} from "../resources/searchOptions";
import { DockRounded, TramOutlined } from "@material-ui/icons";

function Home(props) {
  const [emailId, setEmailId] = useState(null);
  const [email, setEmail] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [students, setStudents] = useState(null);
  const [query, setQuery] = useState("");
  const [studentId, setStudentId] = useState("");
  const [classYears_, setClassYears] = useState([]);
  const [majors_, setMajors] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);
  const [messageOpen, setMessageOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchType, setSearchType] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const params = ["", "classYear", "majors"];

  useEffect(() => {
    if (auth.currentUser) {
      setEmailId(auth.currentUser.email.split("@")[0]);
      setEmail(auth.currentUser.email);
    }
  }, []);

  useEffect(() => {
    if (emailId) {
      getFeatured();
      checkValidOptions();
    }
  }, [emailId]);

  const checkValidOptions = () => {
    let optionBools = [false, false, false, true, true, true];
    db.doc(`/profiles/${emailId}`)
      .get()
      .then((doc) => {
        if (doc.data().varsitySports.filter(Boolean).length > 0) {
          optionBools[3] = false;
        }
        if (doc.data().pickUpSports.filter(Boolean).length > 0) {
          optionBools[4] = false;
        }
        if (doc.data().instruments.filter(Boolean).length > 0) {
          optionBools[5] = false;
        }
        return optionBools;
      })
      .then((bools) => {
        for (let i = 0; i < bools.length; i++) {
          if (bools[i]) {
            searchTypes[i].disabled = true;
          } else searchTypes[i].disabled = false;
        }
      });
  };

  const getFeatured = () => {
    axios
      .get(`/featured/${emailId}`)
      .then((res) => {
        setFeatured(res.data.featured);
      })
      .catch((err) => console.log(err));
  };

  const searchField = (options, param) => {
    options = options.map((option) => option.value);
    axios
      .post(`/searchField/${email}`, { options, param })
      .then((res) => {
        setStudents(res.data);
      })
      .then(() => {
        setSearching(true);
      })
      .catch((err) => console.log(err));
  };

  const searchName = (query) => {
    axios
      .get(`/searchName/${email}/${query}`)
      .then((res) => {
        setStudents(res.data);
      })
      .then(() => {
        setSearching(true);
      })
      .catch((err) => console.log(err));
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
    setStudentId(students[index].emailId);
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
    e.preventDefault();
    searchName(query);
  };

  const clearSearch = () => {
    setStudents([]);
    setClassYears([]);
    setMajors([]);
    setQuery("");
    setSearching(false);
  };

  const sendRequest = (receiverId) => {
    let senderInfo = {};
    db.doc(`/profiles/${emailId}`)
      .get()
      .then((doc) => {
        senderInfo.name = doc.data().firstName + " " + doc.data().lastName;
        senderInfo.imageUrl = doc.data().imageUrl;
        senderInfo.classYear = doc.data().classYear;
        return senderInfo;
      })
      .then((info) => {
        axios.post(`/request/${emailId}/${receiverId}`, info);
      })
      .then(() => {
        return axios.get(`/reqfeatured/${emailId}/${receiverId}`);
      })
      .then(() => {
        props.handleRequest();
        getFeatured();
      })
      .catch((err) => console.log(err));
  };

  const acceptRequest = (student) => {
    let info = {
      senderName: student.name,
      senderImageUrl: student.imageUrl,
      senderClassYear: student.classYear,
    };
    db.doc(`/profiles/${emailId}`)
      .get()
      .then((doc) => {
        info.receiverName = doc.data().firstName + " " + doc.data().lastName;
        info.receiverImageUrl = doc.data().imageUrl;
        info.receiverClassYear = doc.data().classYear;
        return info;
      })
      .then((info) => {
        axios.post(`/accept/${student.emailId}/${emailId}`, info);
      })
      .then(() => {
        return axios.get(`/accfeatured/${student.emailId}/${emailId}`);
      })
      .then(() => {
        getFeatured();
      })
      .catch((err) => console.log(err));
  };

  const renderPicker = () => {
    return (
      <div>
        <Select
          name="searchType"
          defaultValue={searchTypes[0]}
          options={searchTypes}
          isOptionDisabled={(option) => option.disabled}
          onChange={(options) => {
            setSearchType(options.value);
          }}
        />
      </div>
    );
  };

  const renderDataList = (i) => {
    return (
      <Select
        name="searchType"
        isMulti
        value={selectedOptions}
        options={searchOptions[i]}
        onChange={(options) => setSelectedOptions(options)}
      />
    );
  };

  const renderSearchBar = () => {
    return (
      <div className="search-bar">
        <form onSubmit={onSearchSubmit} style={{ width: "97%" }}>
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
          <FontAwesomeIcon icon={faTimes} color={"grey"} />
        </button>
      </div>
    );
  };

  const renderSearchButtons = () => {
    return (
      <div>
        <button
          onClick={() => searchField(selectedOptions, params[searchType])}
        >
          Search
        </button>
        <button
          onClick={() => {
            setStudents([]);
            setSelectedOptions([]);
          }}
        >
          Clear
        </button>
      </div>
    );
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

  const renderSearchResults = () => {
    return (
      <div>
        {students.map((student, i) => {
          return (
            <Row
              className="search-card align-items-center"
              onClick={() => handleOpenStudent(i)}
              key={i}
            >
              <Col md={2} lg={1}>
                <img
                  className="search-profile-img"
                  alt="Profile Picture"
                  src={student.imageUrl}
                />
              </Col>
              <Col md={5} lg={5}>
                <div style={{ fontSize: "1.2em", fontStyle: "bold" }}>
                  {student.name}
                </div>
                <div className="card-text">{student.classYear}</div>
                <div className="card-text">
                  {student.majors.map((major) => major)}
                </div>
              </Col>
              <Col md={5} lg={6}>
                <ul style={{ marginBottom: 0 }}>
                  <li className="card-text">{student.score}</li>
                  <li className="card-text">thing in common</li>
                  <li className="card-text">thing in common</li>
                </ul>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  };

  const renderFeatured = () => {
    return (
      <div>
        <h5 className="mt-4">Featured Profiles</h5>
        <div class="featured-container pb-4 pt-1">
          {featured.map((student, i) => {
            return (
              <div
                className="featured-card mx-lg-3 mx-sm-1"
                onClick={() => {
                  handleOpenFeatured(i);
                }}
              >
                <img
                  className="featured-profile-img"
                  alt="Profile Picture"
                  src={student.imageUrl}
                />
                <div className="card-text mb-3">{student.name}</div>
                {student.status === "nil" && (
                  <Button
                    style={{ marginTop: "auto" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      sendRequest(student.emailId);
                    }}
                  >
                    Request
                  </Button>
                )}
                {student.status === "out" && <p>Sent</p>}
                {student.status === "inc" && (
                  <Button
                    style={{ marginTop: "auto" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      acceptRequest(student);
                    }}
                  >
                    Accept Request
                  </Button>
                )}
                {student.status === "con" && <p>Connected</p>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Container fluid className="uconnect-home" style={{ marginTop: "1rem" }}>
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
        <StudentModal
          studentId={studentId}
          handleClose={handleCloseStudent}
          handleRequest={props.handleRequest}
          requests={props.requests}
          handleOpenMessage={handleOpenMessage}
        />
      </Modal>
      <h1>Connect</h1>
      {renderPicker()}
      {searchType === 0 && renderSearchBar()}
      {searchType !== 0 && renderDataList(searchType)}
      {searchType !== 0 && renderSearchButtons()}
      {/* {renderFilters()} */}
      {students && renderSearchResults()}
      {!searching && featured && renderFeatured()}
    </Container>
  );
}

export default Home;
