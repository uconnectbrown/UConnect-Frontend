// Setup
import React, { useState, useEffect } from "react";
import axios from "axios";
import { db, auth } from "../firebase";

// Components
import StudentModal from "../components/StudentModal";
import SearchBar from "../components/SearchBar";
import Message from "../components/Message";
import StudentCard from "../components/StudentCard";
import StudentCardSm from "../components/StudentCardSm";

import { Container, Row, Modal } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Connections(props) {
  const [pending, setPending] = useState([]);
  const [connections, setConnections] = useState(null);
  const [connections_, setConnections_] = useState(null);
  const [outgoing, setOutgoing] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [emailId, setEmailId] = useState(null);
  const [studentInfo, setStudentInfo] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      setEmailId(auth.currentUser.email.split("@")[0]);
    }
  }, []);

  useEffect(() => {
    if (emailId) {
      getPending();
      props.fetchPending();
    }
  }, [emailId]);

  useEffect(() => {
    if (emailId) getOutgoing();
  }, [emailId]);

  useEffect(() => {
    if (emailId) getConnections();
  }, [emailId]);

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

  useEffect(() => {
    if (query.length === 0) {
      setConnections_(connections);
    }
    if (connections && query.length > 0) {
      setConnections_(
        connections.filter((connection) =>
          filterName(
            connection.name.split(" ")[0],
            connection.name.split(" ")[1],
            query
          )
        )
      );
    }
  }, [query]);

  const getPending = () => {
    axios
      .get(`/pending/${emailId}`)
      .then((res) => {
        setPending(res.data.pending);
      })
      .catch((err) => console.log(err));
  };

  // Outgoing
  const getOutgoing = () => {
    let students = [];
    db.collection("profiles")
      .doc(emailId)
      .collection("sent")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          students.push(doc.data());
        });
        setOutgoing(students);
      })
      .catch((err) => console.log(err));
  };

  const getConnections = () => {
    axios
      .get(`/connections/${emailId}`)
      .then((res) => {
        setConnections(res.data.connections);
        setConnections_(res.data.connections);
      })
      .catch((err) => console.log(err));
  };

  const handleOpenPending = (index) => {
    setStudentId(pending[index].emailId);
  };

  const handleOpenOutgoing = (index) => {
    setStudentId(outgoing[index].emailId);
  };

  const handleOpenConnected = (index) => {
    setStudentId(connections_[index].emailId);
  };

  const handleCloseStudent = () => {
    setStudentId("");
    getPending();
    getOutgoing();
  };

  const handleOpenMessage = (id, image, name) => {
    setStudentInfo([id, image, name]);
    setMessageOpen(true);
  };

  const handleCloseMessage = () => {
    setMessageOpen(false);
  };

  const clearSearch = () => {
    setQuery("");
    getConnections();
  };

  const renderSearchBar = () => {
    return (
      <SearchBar
        placeholder="Search for connections by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        clearSearch={clearSearch}
      />
    );
  };

  return (
    <Container
      className="uconnect-connections h-100"
      style={{ marginTop: "1rem", overflow: "auto" }}
    >
      <Modal
        keyboard
        show={studentId}
        onHide={handleCloseStudent}
        dialogClassName="student-modal"
      >
        <Modal.Body>
          <StudentModal
            studentId={studentId}
            // handleRequest={props.handleRequest}
            // requests={props.requests}
            updateConnections={getConnections}
            handleOpenMessage={handleOpenMessage}
            decPending={props.decPending}
            outgoing={outgoing}
            imageUrl={props.imageUrl}
            incRequests={props.incRequests}
          />
        </Modal.Body>
      </Modal>
      <Row>
        {pending.length > 0 && (
          <>
            <h4>Incoming Requests ({pending.length})</h4>
            <Row>
              {pending.map((p, i) => (
                <StudentCardSm
                  name={p.name}
                  classYear={p.classYear}
                  imageUrl={p.imageUrl}
                  onClick={() => handleOpenPending(i)}
                  ownImageUrl={props.imageUrl}
                />
              ))}
            </Row>
          </>
        )}
      </Row>

      <Row>
        {outgoing && outgoing.length > 0 && (
          <>
            <h4>Outgoing Requests ({outgoing.length})</h4>
            {outgoing.map((p, i) => (
              <StudentCardSm
                name={p.name}
                classYear={p.classYear}
                imageUrl={p.imageUrl}
                onClick={() => handleOpenOutgoing(i)}
                ownImageUrl={props.imageUrl}
              />
            ))}
          </>
        )}
      </Row>

      <h1>All Connections</h1>
      {connections && connections.length === 0 && (
        <h3>You do not have any connections yet.</h3>
      )}
      {connections && connections.length > 0 && renderSearchBar()}
      <Row className="mt-3">
        {connections_ &&
          connections_.map((c, i) => (
            <StudentCard
              name={c.name}
              ownImageUrl={props.imageUrl}
              classYear={c.classYear}
              imageUrl={c.imageUrl}
              onClick={() => handleOpenConnected(i)}
            />
          ))}
      </Row>
    </Container>
  );

  // <Dialog open={messageOpen && studentInfo}>
  //   <Message
  //     handleCloseMessage={handleCloseMessage}
  //     studentInfo={studentInfo}
  //   />
  // </Dialog>
}

export default Connections;
