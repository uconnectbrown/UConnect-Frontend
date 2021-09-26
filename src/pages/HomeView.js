// Setup
import React, { useEffect, useState } from "react";
import axios from "axios";
import { db, auth } from "../firebase.js";
import Select from "react-select";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

// Components
import StudentModal from "../components/StudentModal";
import Message from "../components/Message";
import SearchBar from "../components/SearchBar";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import Logo from "../assets/Logo.png";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

// Styling
import "./HomeView.css";
import Tooltip from "@material-ui/core/Tooltip";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import FeaturedOB from "../assets/Featured.png";
import CoursesOB from "../assets/Courses.png";
import ProfileOB from "../assets/Profile.png";
import OtherProfileOB from "../assets/OtherProfile.png";

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
  const [onboardPage, setOnboardPage] = useState(0);
  const [firstTime, setFirstTime] = useState(props.firstTime);

  const params = [
    "",
    "classYear",
    "majors",
    "varsitySports",
    "pickUpSports",
    "instruments",
  ];

  useEffect(() => {
    setFirstTime(props.firstTime);
  }, [props.firstTime]);

  useEffect(() => {
    if (auth.currentUser) {
      setEmailId(auth.currentUser.email.split("@")[0]);
      setEmail(auth.currentUser.email);
    }
  }, []);

  useEffect(() => {
    if (emailId) {
      getFeatured();
      disableSearchTypes();
    }
  }, [emailId]);

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
              setQuery("");
            }}
          />
        </Col>
        <Col>
          <Tooltip
            title="Extracurriculars not included in your profile are grayed out"
            placement="right"
          >
            <span>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                color="#505050"
                style={{ marginTop: 10 }}
              />
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
                <div
                  style={{ border: "5px solid #f3f3f3", borderRadius: "10rem" }}
                >
                  <img
                    className={
                      props.imageUrl ===
                      "https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media"
                        ? "search-profile-img-blur"
                        : "search-profile-img"
                    }
                    alt="Profile Picture"
                    src={student.imageUrl}
                  />
                </div>
              </Col>
              <Col md={4} lg={4}>
                <div style={{ fontSize: "1.2em", fontStyle: "bold" }}>
                  {student.name}
                </div>

                <div className="card-text">Class of {student.classYear}</div>
                <div className="card-text">
                  {student.majors
                    .filter(Boolean)
                    .map((major, i) =>
                      i !== student.majors.filter(Boolean).length - 1
                        ? major + ", "
                        : major
                    )}
                </div>
              </Col>
              <Col md={3} lg={3}>
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
              <Col md={3} lg={3}>
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
    let color;
    return (
      <div>
        <p className="mt-4">
          <h5 style={{ display: "inline" }}>Featured Profiles</h5>
          <Tooltip
            placement="right"
            title="These profiles are generated weekly and are recommended based on the information you have provided in your profile."
          >
            <span>
              <FontAwesomeIcon
                style={{ marginLeft: 15 }}
                icon={faQuestionCircle}
                color="#505050"
              />
            </span>
          </Tooltip>
        </p>
        <div class="featured-container pb-4 pt-1" style={{display:"flex flex-row"}}>
          {featured.map((student, i) => {
            return (
              <div
                className="featured-card mx-lg-3 mx-sm-1"
                style={{display:"flex", marginRight:15}}
                onClick={() => {
                  handleOpenFeatured(i);
                }}
              >
                <div
                  style={{ border: "5px solid #ffffff", borderRadius: "10rem" }}
                >
                  <img
                    className={
                      props.imageUrl ===
                      "https://firebasestorage.googleapis.com/v0/b/uconnect-5eebd.appspot.com/o/no-img.png?alt=media"
                        ? "featured-profile-img-blur"
                        : "featured-profile-img"
                    }
                    alt="Profile Picture"
                    src={student.imageUrl}
                  />
                </div>
                <div className="card-text mb-3">
                  {student.name} '{student.classYear.split("0")[1]}
                </div>
                <div style={{ width: 80, height: 80 }}>
                  <Tooltip placement="top" title="Compatibility Score">
                    <span>
                      <CircularProgressbar
                        value={student.compatability}
                        text={`${student.compatability}%`}
                        styles={buildStyles({
                          pathColor: `rgba(62, 152, ${
                            256 - 10 * (100 - student.compatability)
                          })`,
                          textColor: `rgba(62, 152, ${
                            256 - 10 * (100 - student.compatability)
                          })`,
                        })}
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
                other Brown students. The following slides will walk you through
                the site's core functionality.
              </p>
            </div>
          )}
          {onboardPage === 1 && (
            <div align="center">
              <h3>Your Profile (1/5)</h3>
              <p>
                Customize your profile with interests, extracurriculars, and
                courses.
              </p>
              <hr />
              <img alt="profile" src={ProfileOB} className="onboarding" />
            </div>
          )}
          {onboardPage === 2 && (
            <div align="center">
              <h3>Search and Filter (2/5)</h3>
              <p>
                Search for Brown students by name, concentration, or
                extracurriculars.
              </p>
              <hr />
              <ReactPlayer
                className="video"
                url={"https://www.youtube.com/watch?v=KPVWQ1nq-VI"}
                playing={true}
                loop={true}
              />
            </div>
          )}
          {onboardPage === 3 && (
            <div align="center">
              <h3>Requests and Connections (3/5)</h3>
              <p>
                Request to connect with other users. You can send up to 10
                requests at any given time and connected users can message each
                other.
              </p>
              <hr />
              <img
                alt="otherProfile"
                src={OtherProfileOB}
                className="onboarding"
              />
            </div>
          )}
          {onboardPage === 4 && (
            <div align="center">
              <h3>Courses (4/5)</h3>
              <p>Connect with classmates.</p>
              <hr />
              <img alt="courses" src={CoursesOB} className="onboarding" />
            </div>
          )}
          {onboardPage === 5 && (
            <div align="center">
              <h3>Featured Profiles (5/5)</h3>
              <p>
                Not sure who you're looking for? Every Thursday, you will
                receive a new set of featured profiles that are recommended
                based on the info you have provided in your profile.
              </p>
              <hr />
              <img alt="featured" src={FeaturedOB} className="onboarding" />
            </div>
          )}
          <div align="right">
            {onboardPage > 0 && (
              <button onClick={handlePreviousPage}>Back</button>
            )}
            {onboardPage < 5 && <button onClick={handleNextPage}>Next</button>}
            {onboardPage === 5 && (
              <Link to="/profile">
                <button>Done</button>
              </Link>
            )}
            <br />
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <Container fluid className="uconnect-home" style={{ marginTop: "1rem" }}>
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
            decPending={props.decPending}
            imageUrl={props.imageUrl}
          />
        </Modal.Body>
      </Modal>
      <h1>Connect</h1>
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
