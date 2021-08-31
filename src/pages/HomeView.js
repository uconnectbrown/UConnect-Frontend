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
      getFeatured();
      disableSearchTypes();
      disableVarsity();
    }
  }, [emailId]);

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

  const disableVarsity = () => {
    let validSports = [];
    db.collection("varsitySports")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          validSports.push(doc.id);
        });
        for (let i = 0; i < searchOptions[3].length; i++) {
          if (
            validSports.includes(searchOptions[3][i].value.replace(/\s/g, ""))
          ) {
            searchOptions[3][i].disabled = false;
          } else searchOptions[3][i].disabled = true;
        }
      })
      .catch((err) => console.log(err));
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
    console.log(options);
    console.log(param);
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
    };
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
          onClick={() => searchField(selectedOptions, params[searchType])}
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
