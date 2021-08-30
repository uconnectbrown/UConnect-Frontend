// Setup
import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";

// Components
import StudentModal from "../components/StudentModal";
import Message from "../components/Message";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import SearchBar from "material-ui-search-bar";
import InputLabel from "@material-ui/core/InputLabel";
import CardContent from "@material-ui/core/CardContent";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";

import { Container, Row, Col, Modal } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from "@fortawesome/free-solid-svg-icons"

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

  const handleOpenPStudent = (index) => {
    setStudentId(pending[index].emailId);
  };

  const handleOpenCStudent = (index) => {
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

  const renderConnections = () => {
    <Row>
      {connections.map(con => (
        <div>
          hello
        </div>
      ))}
    </Row>
  }

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
      <h1>All Connections</h1>
      {renderSearchBar()}
      {connections && renderConnections()}
    </Container>
  )

  return (
    <div>
      <Dialog open={studentId}>
        <StudentModal
          studentId={studentId}
          handleClose={handleCloseStudent}
          handleOpenMessage={handleOpenMessage}
        />
      </Dialog>
      <Dialog open={messageOpen && studentInfo}>
        <Message
          handleCloseMessage={handleCloseMessage}
          studentInfo={studentInfo}
        />
      </Dialog>
      Pending Connections
      <GridList cols={5} spacing={10} cellHeight="auto">
        {pending.map((student, index) => {
          return (
            <GridListTile item component="Card" sm>
              <Card align="center">
                <ButtonBase
                  size="large"
                  color="primary"
                  onClick={() => handleOpenPStudent(index)}
                  style={{ width: "100%" }}
                >
                  <CardContent>
                    <img
                      width="50px"
                      alt="Profile Picture"
                      src={student.imageUrl}
                    />
                    <Typography variant="body2">{student.name}</Typography>
                  </CardContent>
                </ButtonBase>
              </Card>
            </GridListTile>
          );
        })}
      </GridList>
      <Typography>All Connections</Typography>
      <SearchBar
          value={query}
          onChange={(newValue) => setQuery(newValue)}
          onRequestSearch={() => {
            searchName(query);
          }}
        />
      {connections && (
        <div>
          <GridList cols={5} spacing={10} cellHeight="auto">
            {connections.map((connection, index) => {
              return (
                <GridListTile item component="Card" sm>
                  <Card align="center">
                    <ButtonBase
                      size="large"
                      color="primary"
                      onClick={() => handleOpenCStudent(index)}
                      style={{ width: "100%" }}
                    >
                      <CardContent>
                        <img
                          width="50px"
                          alt="Profile Picture"
                          src={connection.imageUrl}
                        />
                        <Typography variant="body2">
                          {connection.name}
                        </Typography>
                        <Typography variant="body2">{connection.classYear}</Typography>
                      </CardContent>
                    </ButtonBase>
                  </Card>
                </GridListTile>
              );
            })}
          </GridList>
        </div>
      )}
    </div>
  );
}

export default Connections;
