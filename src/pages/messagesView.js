// Setup
import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { db, auth } from "../firebase";

// Components
import NavBar from "../components/NavBar";
import Messages from "../components/Messages";
import CourseFeed from "../components/CourseFeed";

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
import CircularProgress from "@material-ui/core/CircularProgress";

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
    courseCodes: [],
    messages1: [],
    messages2: [],
    messages3: [],
    messages4: [],
    messages5: [],
    cf1: {},
    ownName: "",
    ownImage: "",
    ownId: "",
    tabIndex: 0,
    loading: true,
  };

  componentDidMount() {
    db.doc(`/profiles/${auth.currentUser.email.split("@")[0]}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return this.props.history.push({
            pathname: "/profileBuild",
            state: { validRoute: true },
          });
        }
      });
    axios
      .get(`/senderInfo/${auth.currentUser.email}`)
      .then((res) => {
        this.setState({
          courseCodes: res.data.courses.map((course) =>
            course.courseCode.replace(/\s/g, "")
          ),
          ownName: res.data.firstName + " " + res.data.lastName,
          ownId: res.data.emailId,
          ownImage: res.data.imageUrl,
        });
      })
      .then(() => {
        let promises = [];
        let indexArray = [];
        let currentIndex = 0;
        for (let i = 0; i < 5; i++) {
          if (this.state.courseCodes[i]) {
            promises.push(
              axios.get(
                `/messages/${auth.currentUser.email}/${this.state.courseCodes[i]}`
              )
            );
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
          .then(() => {
            this.setState({ loading: false });
          })
          .catch((err) => console.log(err));
      });
  }

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
    let numCourses = this.state.courseCodes.filter(Boolean).length;

    return (
      <div>
        {this.state.loading && (
          <div align="center">
            <NavBar />
            <br />
            <CircularProgress size={100} />
            <br />
            <br />
            <Typography variant="h4">Fetching messages...</Typography>
          </div>
        )}

        {!this.state.loading && (
          <div>
            <NavBar />
            <AppBar position="static" color="secondary">
              <Tabs
                value={this.state.tabIndex}
                onChange={this.handleChange}
                aria-label="simple tabs example"
                variant="fullWidth"
              >
                {this.state.courseCodes[0] && (
                  <Tab label={this.state.courseCodes[0]} {...a11yProps(0)} />
                )}
                {this.state.courseCodes[1] && (
                  <Tab label={this.state.courseCodes[1]} {...a11yProps(1)} />
                )}
                {this.state.courseCodes[2] && (
                  <Tab label={this.state.courseCodes[2]} {...a11yProps(2)} />
                )}
                {this.state.courseCodes[3] && (
                  <Tab label={this.state.courseCodes[3]} {...a11yProps(3)} />
                )}
                {this.state.courseCodes[4] && (
                  <Tab label={this.state.courseCodes[4]} {...a11yProps(4)} />
                )}
                <Tab label="All Messages" {...a11yProps(numCourses)} />
              </Tabs>
            </AppBar>
            {this.state.courseCodes[0] && (
              <TabPanel value={this.state.tabIndex} index={0}>
                <CourseFeed code={this.state.courseCodes[0]}></CourseFeed>
                <br />
                <Messages messages={messages[0]} />
              </TabPanel>
            )}
            {this.state.courseCodes[1] && (
              <TabPanel value={this.state.tabIndex} index={1}>
                <CourseFeed code={this.state.courseCodes[1]}></CourseFeed>
                <br />
                <Messages messages={messages[1]} />
              </TabPanel>
            )}
            {this.state.courseCodes[2] && (
              <TabPanel value={this.state.tabIndex} index={2}>
                <CourseFeed code={this.state.courseCodes[2]}></CourseFeed>
                <br />
                <Messages messages={messages[2]} />
              </TabPanel>
            )}
            {this.state.courseCodes[3] && (
              <TabPanel value={this.state.tabIndex} index={3}>
                <CourseFeed code={this.state.courseCodes[3]}></CourseFeed>
                <br />
                <Messages messages={messages[3]} />
              </TabPanel>
            )}
            {this.state.courseCodes[4] && (
              <TabPanel value={this.state.tabIndex} index={4}>
                <CourseFeed code={this.state.courseCodes[4]}></CourseFeed>
                <br />
                <Messages messages={messages[4]} />
              </TabPanel>
            )}
            <TabPanel value={this.state.tabIndex} index={numCourses}>
              <Messages messages={messages[0]} />
              <Messages messages={messages[1]} />
              <Messages messages={messages[2]} />
              <Messages messages={messages[3]} />
              <Messages messages={messages[4]} />
            </TabPanel>
          </div>
        )}
      </div>
    );
  }
}

export default messagesView;
