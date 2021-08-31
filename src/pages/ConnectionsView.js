// Setup
import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";

// Components
import StudentModal from "../components/StudentModal";
import Message from "../components/Message";

import { Container, Row, Modal } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import StudentCard from "../components/StudentCard";

function Connections() {
  const [pending, setPending] = useState([]);
  const [connections, setConnections] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const emailId = auth.currentUser.email.split("@")[0];
  const [studentInfo, setStudentInfo] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getPending();
  }, []);

  useEffect(() => {
    getConnections();
  }, []);

  const getPending = () => {
    axios
      .get(`/pending/${emailId}`)
      .then((res) => {
        setPending(res.data.pending);
      })
      .catch((err) => console.log(err));
  };

  const getConnections = () => {
    axios
      .get(`/connections/${emailId}`)
      .then((res) => {
        console.log(res.data.connections)
        setConnections(res.data.connections);
      })
      .catch((err) => console.log(err));
  };

  const handleOpenPending = (index) => {
    setStudentId(pending[index].emailId);
  };

  const handleOpenConnected = (index) => {
    setStudentId(connections[index].emailId);
  };

  const handleCloseStudent = () => {
    setStudentId("");
    getPending();
    getConnections();
  };

  const handleOpenMessage = (id, image, name) => {
    setStudentInfo([id, image, name]);
    setMessageOpen(true);
  };

  const handleCloseMessage = () => {
    setMessageOpen(false);
  };

  const filterName = (name, query) => {
    let fn = name.split(" ")[0].toLowerCase().trim();
    let ln = name.split(" ")[1].toLowerCase().trim();
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
      .get(`/connections/${emailId}`)
      .then((res) => {
        setConnections(
          res.data.connections.filter((student) =>
            filterName(student.name, query)
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const clearSearch = () => {
    getConnections();
  }

  console.log(pending)

  const renderSearchBar = () => {
    return (
      <div className="search-bar">
        <form onSubmit={searchName} style={{ width: '97%'}}> 
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

  return (
    <Container className="uconnect-connections" style={{ marginTop: '1rem' }}>
      <Modal 
        keyboard
        show={studentId} 
        onHide={handleCloseStudent}
        dialogClassName="student-modal"
      >
        <StudentModal
          studentId={studentId}
          handleClose={handleCloseStudent}
          // handleRequest={props.handleRequest}
          // requests={props.requests}
          handleOpenMessage={handleOpenMessage}
        />
      </Modal>
      <Row>
        {pending.length > 0 && 
          <>
            <h3>Pending Connections</h3>
            {pending.map((p, i) => 
              <StudentCard 
                name={p.name} 
                imageUrl={p.imageUrl}
                onClick={() => handleOpenPending(i)}
              />
            )}
          </>
        }
      </Row>

      <h1>All Connections</h1>
      {renderSearchBar()}
      <Row className="mt-3">
        {connections && connections.map((c, i) => 
          <StudentCard 
            name={c.name} 
            classYear={c.classYear}
            imageUrl={c.imageUrl}
            onClick={() => handleOpenConnected(i)}
          />
        )}
      </Row>
    </Container>
  )

      // <Dialog open={messageOpen && studentInfo}>
      //   <Message
      //     handleCloseMessage={handleCloseMessage}
      //     studentInfo={studentInfo}
      //   />
      // </Dialog>
}

export default Connections;
