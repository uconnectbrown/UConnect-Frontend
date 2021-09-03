// Setup
import React, { useEffect, useState } from "react";
import axios from "axios";
import { db, auth } from "../firebase.js";
import Select from "react-select";

// Components
import StudentModal from "../components/StudentModal";
import Message from "../components/Message";
import SearchBar from "../components/SearchBar";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";

// Styling
import "./HomeView.css";
import Tooltip from "@material-ui/core/Tooltip";

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

  const handleCloseOnBoard = () => {
    setFirstTime(false);
    // backend function to turn firsttime to false in the profile
    axios.get(`/onboard/${emailId}`).catch((err) => console.log(err));
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

  const renderSearchPicker = () => {
    return (
      <Row className="search-picker my-2">
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
                <div className="card-text">{student.classYear}</div>
                <div className="card-text">
                  {student.majors.map((major) => major)}
                </div>
              </Col>
              <Col md={5} lg={6}>
                <ul style={{ marginBottom: 0 }}>
                  <li className="card-text">{student.score}</li>
                  {student.courseOverlap > 0 && (
                    <li className="card-text">
                      {student.courseOverlap} courses in common
                    </li>
                  )}
                  {student.interestsOverlap > 0 && (
                    <li className="card-text">
                      {student.interestOverlap} interests in common
                    </li>
                  )}
                  {student.shareVarsity && (
                    <li className="card-text">Plays a varsity sport</li>
                  )}
                  {student.shareGreek && (
                    <li className="card-text">Involved in greek life</li>
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
        <h5 className="mt-4">Featured Profiles</h5>
        <Tooltip
          title="Featured profiles are generated each week and recommended to you based on the information you have provided in your profile."
          placement="right"
        >
          <h4>?</h4>
        </Tooltip>
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

  const renderOnboard = () => {
    return (
      <Modal show={false}>
        {onboardPage === 0 && (
          <div>
            <h3>Welcome to UConnect!</h3>
            <h4>
              This is a platform designed to help you discover and form
              meaningful connections with other Brown students. Before getting
              started, please click through these brief slides which explain the
              core functionality of the site.
            </h4>
          </div>
        )}
        {onboardPage === 1 && (
          <div>
            <h3>Requests</h3>
            <h4>
              When you created your profile, you recieved 10 requests which can
              be sent to any Brown student you come across on the website. When
              your connection request is accepted, you will get the request back
              and be able to send it to someone else, and, if for some reason
              your request has not been accepted after 2 days, you will be able
              to unrequest in order to get the request back.
            </h4>
          </div>
        )}
        {onboardPage === 2 && (
          <div>
            <h3>Connections</h3>
            <h4>
              When you accept someone's request or someone accept's your
              request, the two of you will have formed a connection. Once
              connected, you will now have access to additional pieces of
              information such as who your mutual connections are and what
              courses you have in common. Being connected also gives you the
              ability to message the other user.
            </h4>
          </div>
        )}
        {onboardPage === 3 && (
          <div>
            <h3>Search and Filter</h3>
            <h4>
              One of the best ways to find other students is by using the search
              bar on the home page. You are able to search for students by
              criteria such as their name, concentration, or extracurriculars
              (e.g. varsity sports, pick-up sports, instruments, etc.).
            </h4>
          </div>
        )}
        {onboardPage === 4 && (
          <div>
            <h3>Featured Profiles</h3>
            <h4>
              Every Thursday at 9pm, you will recieve a new set of featured
              profiles which are prominently displayed on the home page. These
              featured profiles are some of the individuals that UConnect
              believes are highly compatible with you and are recommended based
              on the information you have provided in your profile. This makes
              it so that, the more information you provide, the better your
              featured profiles will be.
            </h4>
          </div>
        )}
        {onboardPage === 5 && (
          <div>
            <h3>Your Profile</h3>
            <h4>
              Your own profile can be accessed by clicking the profile image in
              the top right of your screen. This page allows you to see what
              your profile will look like to others and also lets you edit your
              profile and add pieces of information such as what courses you are
              taking and what extracurriculars you are involved in. Adding more
              additional information will also give you access to more powerful
              search tools to find other students who are relevant to you.
            </h4>
          </div>
        )}
        {onboardPage === 6 && (
          <div>
            <h3>Courses</h3>
            <h4>
              You can access the other students in your courses by adding
              courses to your profile and then clicking on the course tab on the
              left side panel. The search bar at the top of the course page
              allows you to easily search and filter your classmates based on
              their name, class year, and concentration.
            </h4>
          </div>
        )}
        {onboardPage === 7 && (
          <div>
            <h3>Finished</h3>
            <h4>
              Congrats on completing the onboarding process; now enjoy
              connecting!
            </h4>
          </div>
        )}

        <h4 align="center">{onboardPage + 1}/8</h4>

        <span align="right">
          {onboardPage > 0 && (
            <button onClick={handlePreviousPage}>Back</button>
          )}
          {onboardPage < 7 && <button onClick={handleNextPage}>Next</button>}
          {onboardPage === 7 && (
            <button onClick={handleCloseOnBoard}>Done</button>
          )}
        </span>
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
        <StudentModal
          studentId={studentId}
          handleClose={handleCloseStudent}
          handleRequest={props.handleRequest}
          requests={props.requests}
          handleOpenMessage={handleOpenMessage}
        />
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
