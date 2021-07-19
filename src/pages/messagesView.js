// Setup
import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import dayjs from "dayjs";

// Components
import NavBar from "../components/NavBar";
import Messages from "../components/Messages";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ButtonBase from "@material-ui/core/ButtonBase";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class messagesView extends Component {
  state = {
    courses: [{}, {}, {}, {}, {}],
    messages1: [],
    messages2: [],
    messages3: [],
    messages4: [],
    messages5: [],
    tabIndex: 0,
  };

  componentDidMount() {
    localStorage.removeItem("courseCode");
    localStorage.removeItem("courseName");
    localStorage.removeItem("codeSpace");
    localStorage.removeItem("studentId");
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentImage");
    const FBIdToken = localStorage.FBIdToken;
    axios.defaults.headers.common["Authorization"] = FBIdToken;
    let courseCodes = [];
    if (FBIdToken) {
    axios.get("/user/courses").then((res) => {
      courseCodes = (res.data.map((course) => course.courseCode.replace(/\s/g, "")));
    })
    .then(() => {
    let promises = [];
    let indexArray = [];
    let currentIndex = 0;
    for (let i = 0; i < 5; i++) {
      if (courseCodes[i]) {
        promises.push(axios.get(`/messages/${courseCodes[i]}`));
        indexArray.push(i);
      }
    }

    Promise.all(promises)
      .then((results) => {
        // console.log(results[0]);
        if (indexArray.includes(0)) {
          this.setState({
            messages1: results[currentIndex].data,
          });
          currentIndex++;
        }
        if (indexArray.includes(1)) {
          this.setState({
            messages2: results[currentIndex].data,
          });
          currentIndex++;
        }
        if (indexArray.includes(2)) {
          this.setState({
            messages3: results[currentIndex].data,
          });
          currentIndex++;
        }
        if (indexArray.includes(3)) {
          this.setState({
            messages4: results[currentIndex].data,
          });
          currentIndex++;
        }
        if (indexArray.includes(4)) {
          this.setState({
            messages5: results[currentIndex].data,
          });
          currentIndex++;
        }
      })
      .catch(err => console.log(err));
    }
  )
}}


  handleMessage = (roomId, name, image, id, code) => {
    localStorage.setItem("roomId", roomId);
    localStorage.setItem("studentName", name);
    localStorage.setItem("studentImage", image);
    localStorage.setItem("studentId", id);
    localStorage.setItem("courseCode", code);
    this.props.history.push("/messageView");
  };

  handleChange = (event, value) => {
    this.setState({ tabIndex: value });
  };

  render() {
    let messages = [
      this.state.messages1,
      this.state.messages2,
      this.state.messages3,
      this.state.messages4,
      this.state.messages5,
    ];
    let numMessages = 0;
    for (let i = 0; i < 5; i++) {
      if (Object.keys(messages[i]).length !== 0) {
        numMessages++;
      }
    }

    return (
      <div>
        <NavBar />
        <AppBar position="static" color="secondary">
          <Tabs
            value={this.state.tabIndex}
            onChange={this.handleChange}
            aria-label="simple tabs example"
          >
            {localStorage.course1 && (
              <Tab label={localStorage.course1} {...a11yProps(0)} />
            )}
            {localStorage.course2 && (
              <Tab label={localStorage.course2} {...a11yProps(1)} />
            )}
            {localStorage.course3 && (
              <Tab label={localStorage.course3} {...a11yProps(2)} />
            )}
            {localStorage.course4 && (
              <Tab label={localStorage.course4} {...a11yProps(3)} />
            )}
            {localStorage.course5 && (
              <Tab label={localStorage.course5} {...a11yProps(4)} />
            )}
            <Tab label="All Messages" {...a11yProps(numMessages)} />
          </Tabs>
        </AppBar>
        {localStorage.course1 && (
          <TabPanel value={this.state.tabIndex} index={0}>
            <Messages messages={messages[0]} />
          </TabPanel>
        )}
        {localStorage.course2 && (
          <TabPanel value={this.state.tabIndex} index={1}>
            <Messages messages={messages[1]} />
          </TabPanel>
        )}
        {localStorage.course3 && (
          <TabPanel value={this.state.tabIndex} index={2}>
            <Messages messages={messages[2]} />
          </TabPanel>
        )}
        {localStorage.course4 && (
          <TabPanel value={this.state.tabIndex} index={3}>
            <Messages messages={messages[3]} />
          </TabPanel>
        )}
        {localStorage.course5 && (
          <TabPanel value={this.state.tabIndex} index={4}>
            <Messages messages={messages[4]} />
          </TabPanel>
        )}
        <TabPanel value={this.state.tabIndex} index={numMessages}>
          <Messages messages={messages[0]} />
          <Messages messages={messages[1]} />
          <Messages messages={messages[2]} />
          <Messages messages={messages[3]} />
          <Messages messages={messages[4]} />
        </TabPanel>
      </div>
    );
  }
}

export default messagesView;
