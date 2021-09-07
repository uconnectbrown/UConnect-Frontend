// Setup
import React, { useEffect, useState } from "react";
import axios from "axios";
import { db, auth } from "../firebase.js";
import Select from "react-select";
import { Link } from "react-router-dom";

// Components
import StudentModal from "../components/StudentModal";
import Message from "../components/Message";
import SearchBar from "../components/SearchBar";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import Logo from "../assets/Logo.png";

// Styling
import "./HomeView.css";
import Tooltip from "@material-ui/core/Tooltip";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

// Resources
import { searchOptions, searchTypes } from "../resources/searchOptions";
import { DockRounded, TramOutlined } from "@material-ui/icons";

function HomeView(props) {
  const [emailId, setEmailId] = useState(null);
  const [email, setEmail] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [students, setStudents] = useState(null);
  const [query, setQuery] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentInfo, setStudentInfo] = useState([]);
  const [messageOpen, setMessageOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchType, setSearchType] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [firstTime, setFirstTime] = useState(null);
  const [onboardPage, setOnboardPage] = useState(0);
  const params = [
    "",
    "classYear",
    "majors",
    "varsitySports",
    "pickUpSports",
    "instruments",
  ];

  useEffect(() => {
    if (auth.currentUser) {
      setEmailId(auth.currentUser.email.split("@")[0]);
      setEmail(auth.currentUser.email);
    }
  }, []);

  useEffect(() => {
    if (emailId) {
      checkFirstTime();
      getFeatured();
      disableSearchTypes();
    }
  }, [emailId]);

  const checkFirstTime = () => {
    db.doc(`profiles/${emailId}`)
      .get()
      .then((doc) => {
        return setFirstTime(doc.data().firstTime);
      })
      .catch((err) => console.log(err));
  };

  const handleNextPage = () => {
    setOnboardPage(onboardPage + 1);
  };
  const handlePreviousPage = () => {
    setOnboardPage(onboardPage - 1);
  };

  const disableSearchTypes = () => {
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
        console.log(res.data.featured);
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
        if (query) {
          setSearching(true);
        }
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
    if (query.length > 0) searchName(query);
    else {
      setStudents([]);
      setQuery("");
      setSearching(false);
      getFeatured();
    }
  };

  const clearSearch = () => {
    setStudents([]);
    setQuery("");
    setSearching(false);
    getFeatured();
  };

  const renderSearchPicker = () => {
    return (
      <Row className="search-picker my-2">
        <Col>
          <Select
            name="searchType"
            defaultValue={searchTypes[0]}
            options={searchTypes}
            isOptionDisabled={(option) => option.disabled}
            onChange={(options) => {
              setSearchType(options.value);
              setSelectedOptions([]);
            }}
          />
        </Col>
        <Col>
          <Tooltip
            title="Extracurriculars not included in your profile are grayed out"
            placement="right"
          >
            <span>
              <FontAwesomeIcon icon={faInfoCircle} style={{ marginTop: 10 }} />
            </span>
          </Tooltip>
        </Col>
      </Row>
    );
  };

  const renderDataList = (i) => {
    return (
      <Row className="multiselect-search">
        <Select
          name="searchType"
          isMulti
          value={selectedOptions}
          options={searchOptions[i]}
          isOptionDisabled={(option) => option.disabled}
          onChange={(options) => setSelectedOptions(options)}
        />
      </Row>
    );
  };

  const renderSearchBar = () => {
    return (
      <SearchBar
        placeholder="Search for students by name"
        onSubmit={onSearchSubmit}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        clearSearch={clearSearch}
      />
    );
  };

  const renderSearchButtons = () => {
    return (
      <>
        <Button
          className="search-button"
          onClick={() => {
            searchField(selectedOptions, params[searchType]);
          }}
          disabled={selectedOptions.length === 0}
        >
          Search
        </Button>
        <Button
          className="search-button"
          variant="light"
          onClick={() => {
            setStudents([]);
            setSelectedOptions([]);
            setSearching(false);
            getFeatured();
          }}
        >
          Clear
        </Button>
      </>
    );
  };

  const renderSearchResults = () => {
    return (
      <div className="pt-4 px-2">
        {searching && <h3>Search Results ({students.length})</h3>}
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

                <div className="card-text">Class of {student.classYear}</div>
                <div className="card-text">
                  {student.majors.map((major) => major)}
                </div>
              </Col>
              <Col md={5} lg={6}>
                <ul style={{ marginBottom: 0 }}>
                  {student.courseOverlap === 1 && (
                    <li className="card-text">
                      {student.courseOverlap} course in common
                    </li>
                  )}
                  {student.courseOverlap > 1 && (
                    <li className="card-text">
                      {student.courseOverlap} courses in common
                    </li>
                  )}
                  {student.interestOverlap === 1 && (
                    <li className="card-text">
                      {student.interestOverlap} interest in common
                    </li>
                  )}
                  {student.interestOverlap > 1 && (
                    <li className="card-text">
                      {student.interestOverlap} interests in common
                    </li>
                  )}
                </ul>
              </Col>
              <Col md={5} lg={6}>
                <ul style={{ marginBottom: 0 }}>
                  {student.shareVarsity && (
                    <li className="card-text">Plays a varsity sport</li>
                  )}
                  {student.sharePickUp && (
                    <li className="card-text">Plays pickup sports</li>
                  )}
                  {student.shareInstruments && (
                    <li className="card-text">Plays an instrument</li>
                  )}
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
        <p className="mt-4">
        <h5 style={{display:"inline"}} >Featured Profiles</h5>
        <Tooltip
              placement="right"
              title="These profiles are generated weekly and are recommended based on the information you have provided in your profile."
            >
              <span>
                <FontAwesomeIcon style={{marginLeft: 15}} icon={faInfoCircle} />
              </span>
            </Tooltip>
        </p>
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
                <div className="card-text mb-3">
                  {student.name} '{student.classYear.split("0")[1]}
                </div>
                <div style={{ width: 80, height: 80 }}>
                  <Tooltip placement="top" title="Compatibility Score">
                    <span>
                    <CircularProgressbar
                    value={student.compatability}
                    text={`${student.compatability}%`}
                  />
                    </span>
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderOnboard = () => {
    return (
      <Modal show={firstTime} dialogClassName="student-modal">
        <Modal.Body>
          {onboardPage === 0 && (
            <div align="center">
              <img
                alt="UConnect Logo"
                style={{
                  width: "auto",
                  height: "auto",
                  maxHeight: "200px",
                  marginBottom: "20px",
                }}
                src={Logo}
                className="topbar-logo"
              />
              <h3>Welcome to UConnect!</h3>
              <p>
                A platform designed to help you form meaningful connections with
                other Brown students. The following slide will walk you through
                the site's core functionality.
              </p>
            </div>
          )}
          {onboardPage === 1 && (
            <div>
              <h3>Featured Profiles</h3>
              <p>
                Every Thursday at 9PM EST, each user will receive a new set of
                featured profiles. These recommended profiles are determined
                based on the information you have provided in your profile. The
                more information you provide, the better your featured profiles
                will be.
              </p>
              <h3>Requests and Connections</h3>
              <p>
                Every user has a set of 10 connection requests which can be sent
                to any other UConnect user. Sending a request reduces the number
                of remaining requests one has, but requests are returned to the
                sender when they have been accepted. Once two users are
                connected, they now have the ability to message each other and
                have access to additional information such as their common courses.
              </p>
              <h3>Search and Filter</h3>
              <p>
                One of the best ways to find others is by using the search bar
                on the home page. You are able to search for people by criteria
                such as their name, concentration, or extracurriculars.
              </p>
              <h3>Courses</h3>
              <p>
                You can also access the other students in your courses by adding
                courses to your profile and then clicking on the course tab on
                the left side panel. The search bar at the top of the course
                page allows you to easily search and filter your classmates
                based on their name, class year, and concentration.
              </p>
              <h3>Your Profile</h3>
              <p>
                Your profile page allows you to edit your profile and add pieces
                of information such as what courses you are taking and what
                extracurriculars you are involved in. Adding more additional
                information will also give you access to more powerful search
                tools to find other students who are relevant to you.
              </p>
            </div>
          )}
          <div align="right">
            {onboardPage > 0 && (
              <button onClick={handlePreviousPage}>Back</button>
            )}
            {onboardPage < 1 && <button onClick={handleNextPage}>Next</button>}
            {onboardPage === 1 && (
              <Link to="/profile">
                <button>Done</button>
              </Link>
            )}
          </div>
        </Modal.Body>
      </Modal>
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
      {renderOnboard()}
      <Modal
        keyboard
        show={studentId}
        onHide={handleCloseStudent}
        dialogClassName="student-modal"
      >
        <Modal.Body>
          <StudentModal
            studentId={studentId}
            decRequests={props.decRequests}
            incRequests={props.incRequests}
            requests={props.requests}
            handleOpenMessage={handleOpenMessage}
            updateOutgoing={props.updateOutgoing}
            outgoing={props.outgoing}
          />
        </Modal.Body>
      </Modal>
      <h1>
        Connect{" "}
        <Tooltip
          style={{ marginLeft: 5 }}
          placement="right"
          title="Search and filter through all Brown students on UConnect"
        >
          <span>
            <FontAwesomeIcon
              style={{ fontSize: 16, marginBottom: 5 }}
              icon={faInfoCircle}
            />
          </span>
        </Tooltip>
      </h1>
      {renderSearchPicker()}
      {searchType === 0 && renderSearchBar()}
      {searchType !== 0 && renderDataList(searchType)}
      {searchType !== 0 && renderSearchButtons()}
      {/* {renderFilters()} */}
      {students && renderSearchResults()}
      {!searching && featured && renderFeatured()}
    </Container>
  );
}

export default HomeView;
