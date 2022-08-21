// Setup
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { auth } from "../firebase";
import axios from "axios";

import Select from "react-select";

// Components
import StudentModal from "../components/StudentModal";
import SearchBar from "../components/SearchBar";
import StudentCard from "../components/StudentCard";
import { Row, Modal, Button } from "react-bootstrap";

// Styling
import "./CourseView.css";

// Resources
import { searchOptions, searchTypes } from "../resources/searchOptions";

function Course(props) {
  const { codeParam } = useParams();
  const [name, setName] = useState(props.name);
  const [code, setCode] = useState(props.code);
  const codeNS = codeParam;
  const [email, setEmail] = useState(null);
  const [, setEmailId] = useState(null);

  const [students, setStudents] = useState(null);
  const [students_, setStudents_] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [, setMessageOpen] = useState(false);
  const [, setStudentInfo] = useState([]);
  const [query, setQuery] = useState("");
  const [, setSearching] = useState(false);
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

  // authenticate
  useEffect(() => {
    if (auth.currentUser) {
      setEmailId(auth.currentUser.email.split("@")[0]);
      setEmail(auth.currentUser.email);
    }
  }, []);

  // init course code and name
  useEffect(() => {
    setCode(props.code);
    setName(props.name);
  }, [props.code, props.name]);

  // init students
  useEffect(() => {
    if (email && codeNS) {
      getStudents();
      props.getCourseInfo(codeNS);
    }
  }, [email, codeNS]);

  // get students
  const getStudents = () => {
    axios
      .get(`/students/${email}/${codeNS}`)
      .then((res) => {
        setStudents(res.data);
        setStudents_(res.data);
      })
      .catch((err) => console.log(err));
  };

  // display students according to query
  useEffect(() => {
    if (query.length === 0) {
      setStudents_(students);
    }
    if (students && query.length > 0) {
      setStudents_(
        students.filter((student) =>
          filterName(student.firstName, student.lastName, query)
        )
      );
    }
  }, [query]);

  // handle filter
  useEffect(() => {
    if (selectedOptions.length === 0) {
      setStudents_(students);
    }
    if (students && selectedOptions.length > 0) {
      setStudents_(
        students.filter((student) => {
          if (student[params[searchType]].length > 1) {
            return (
              selectedOptions
                .map((option) => {
                  return option.value;
                })
                .filter((v) => student[params[searchType]].includes(v)).length >
              0
            );
          } else
            return selectedOptions
              .map((option) => {
                return option.value;
              })
              .includes(student[params[searchType]]);
        })
      );
    }
  }, [selectedOptions]);

  // open student card
  const handleOpenStudent = (index) => {
    setStudentId(students_[index].email.split("@")[0]);
  };

  // not used at the moment
  const handleOpenMessage = (id, image, name) => {
    setStudentInfo([id, image, name]);
    setMessageOpen(true);
  };

  // close student card
  const handleCloseStudent = () => {
    setStudentId("");
  };

  // filter students by name query
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

  // clear search
  const clearSearch = () => {
    setStudents_(students);
    setSearching(false);
    setQuery("");
  };

  // search bar
  const renderSearchBar = () => {
    return (
      <SearchBar
        placeholder="Search for students by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        clearSearch={clearSearch}
      />
    );
  };

  // search buttons
  const renderSearchButtons = () => {
    return (
      <>
        {/* <Button
          className="search-button"
          onClick={() => searchField(selectedOptions, params[searchType])}
          disabled={selectedOptions.length === 0}
        >
          Search
        </Button> */}
        <Button
          className="search-button"
          variant="light"
          onClick={() => {
            setStudents_(students);
            setSelectedOptions([]);
            setSearching(false);
          }}
        >
          Clear
        </Button>
      </>
    );
  };

  // filter picker
  const renderSearchPicker = () => {
    return (
      <Row className="search-picker my-2">
        <Select
          name="searchType"
          defaultValue={searchTypes[0]}
          options={searchTypes.slice(0, 3)}
          isOptionDisabled={(option) => option.disabled}
          onChange={(options) => {
            setSearchType(options.value);
            setSelectedOptions([]);
            setQuery("");
          }}
        />
      </Row>
    );
  };

  // multiselect search
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

  return (
    <div>
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
            onHide={handleCloseStudent}
            requests={props.requests}
            handleOpenMessage={handleOpenMessage}
            updateOutgoing={props.updateOutgoing}
            outgoing={props.outgoing}
            decPending={props.decPending}
            imageUrl={props.imageUrl}
          />
        </Modal.Body>
      </Modal>
      {/* <Dialog open={messageOpen && studentInfo}>
        <Message
          handleCloseMessage={handleCloseMessage}
          studentInfo={studentInfo}
        />
      </Dialog> */}
      <h1 style={{ marginTop: "1rem" }}>
        {code}: {name}
      </h1>
      {renderSearchPicker()}
      {searchType === 0 && renderSearchBar()}
      {searchType !== 0 && renderDataList(searchType)}
      {searchType !== 0 && renderSearchButtons()}
      <Row>
        {students_ &&
          students_.map((student, i) => {
            return (
              <StudentCard
                name={`${student.firstName} ${student.lastName}`}
                classYear={student.classYear}
                majors={student.majors}
                imageUrl={student.imageUrl}
                ownImageUrl={props.imageUrl}
                onClick={() => handleOpenStudent(i)}
              />
            );
          })}
      </Row>
    </div>
  );
}

export default Course;
