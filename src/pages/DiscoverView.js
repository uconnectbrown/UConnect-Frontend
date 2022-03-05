// Setup
import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

// Components
import StudentModal from "../components/StudentModal";
import SearchBar from "../components/SearchBar";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";

// Styling
import "./DiscoverView.css";
import Tooltip from "@material-ui/core/Tooltip";
import "react-circular-progressbar/dist/styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

// Resources
import { searchOptions, searchTypes } from "../resources/searchOptions";

function DiscoverView(props) {
  const { user } = props;

  const [students, setStudents] = useState(null);

  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchType, setSearchType] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [studentId, setStudentId] = useState("");

  const params = [
    "",
    "classYear",
    "majors",
    "varsitySports",
    "pickUpSports",
    "instruments",
  ];

  const searchField = (options, param) => {
    setLoading(true);
    options = options.map((option) => option.value);
    axios
      .post(`/searchField`, { options, param })
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .then(() => {
        setSearching(true);
      })
      .catch((err) => console.log(err));
  };

  const searchName = (query) => {
    setLoading(true);
    axios
      .get(`/searchName?q=${query}`)
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .then(() => {
        if (query) {
          setSearching(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleOpenStudent = (index) => {
    setStudentId(students[index].emailId);
  };

  const handleCloseStudent = () => {
    setStudentId(null);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (query.length > 0) searchName(query);
    else {
      setStudents([]);
      setQuery("");
      setSearching(false);
    }
  };

  const clearSearch = () => {
    setStudents([]);
    setQuery("");
    setSearching(false);
  };

  const renderSearchPicker = () => {
    return (
      <Row className="search-picker my-2">
        <Col>
          <Select
            name="searchType"
            defaultValue={searchTypes[0]}
            options={searchTypes}
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
        loading={loading}
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
                      props.imageUrl === "https://i.imgur.com/1m8kMyt.png"
                        ? "search-profile-img-blur"
                        : "search-profile-img"
                    }
                    alt="Profile"
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

  return (
    <Container fluid className="uconnect-home" style={{ marginTop: "1rem" }}>
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
            outgoing={props.outgoing}
            decPending={props.decPending}
            imageUrl={props.imageUrl}
            onHide={handleCloseStudent}
            fetchUser={props.fetchUser}
          />
        </Modal.Body>
      </Modal>
      <h1>Discover &amp; Connect</h1>
      {renderSearchPicker()}
      {searchType === 0 && renderSearchBar()}
      {searchType !== 0 && renderDataList(searchType)}
      {searchType !== 0 && renderSearchButtons()}
      {students && renderSearchResults()}
    </Container>
  );
}

export default DiscoverView;
