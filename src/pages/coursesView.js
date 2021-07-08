// Setup
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Components
import NavBar from "../components/NavBar";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ButtonBase from "@material-ui/core/ButtonBase";
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

export class coursesView extends Component {
  state = {
    courses: [{}, {}, {}, {}, {}],
    students0: [],
    students1: [],
    students2: [],
    students3: [],
    students4: [],
  };

  componentDidMount() {
    const emailId = localStorage.emailId;
    axios
      .get(`/user/${emailId}`)
      .then((res) => {
        this.setState({
          courses: res.data.user.courses,
        });
        // trying to pull the students from each class to populate the avatars appropriately
        Promise.all([
          axios.get(`/course/${this.state.courses[0].courseCode}`),
          axios.get(`/course/${this.state.courses[1].courseCode}`),
          axios.get(`/course/${this.state.courses[2].courseCode}`),
          axios.get(`/course/${this.state.courses[3].courseCode}`),
          axios.get(`/course/${this.state.courses[4].courseCode}`),
        ])
        .then(([res0, res1, res2, res3, res4]) => {
          this.setState({ students0: [...this.state.students0, ...res0.data] });
          this.setState({ students1: [...this.state.students1, ...res1.data] });
          this.setState({ students2: [...this.state.students2, ...res2.data] });
          this.setState({ students3: [...this.state.students3, ...res3.data] });
          this.setState({ students4: [...this.state.students4, ...res4.data] });
          console.log(this.state.students4)
        })
        .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    // axios
    //   .get(`/course/${this.state.courses[0].courseCode}`)
    //   .then((res) => {
    //     this.setState({ students0: [...this.state.students0, ...res.data] });
    //   })
    //   .catch((err) => console.log(err));
    // axios
    //   .get(`/course/${this.state.courses[1].courseCode}`)
    //   .then((res) => {
    //     this.setState({ students1: [...this.state.students1, ...res.data] });
    //   })
    //   .catch((err) => console.log(err));
    // axios
    //   .get(`/course/${this.state.courses[2].courseCode}`)
    //   .then((res) => {
    //     this.setState({ students2: [...this.state.students2, ...res.data] });
    //   })
    //   .catch((err) => console.log(err));
    // axios
    //   .get(`/course/${this.state.courses[3].courseCode}`)
    //   .then((res) => {
    //     this.setState({ students3: [...this.state.students3, ...res.data] });
    //   })
    //   .catch((err) => console.log(err));
    // axios
    //   .get(`/course/${this.state.courses[4].courseCode}`)
    //   .then((res) => {
    //     this.setState({ students4: [...this.state.students4, ...res.data] });
    //   })
    //   .catch((err) => console.log(err));
  }

  handleClick = (code, name) => {
    const courseCode = code.replace(/\s/g, "");
    localStorage.setItem("courseCode", courseCode);
    localStorage.setItem("code", code);
    localStorage.setItem("name", name);
    this.props.history.push({
      pathname: "/courseView",
    });
  };

  render() {
    let code0 = this.state.courses[0].courseCode;
    let code1 = this.state.courses[1].courseCode;
    let code2 = this.state.courses[2].courseCode;
    let code3 = this.state.courses[3].courseCode;
    let code4 = this.state.courses[4].courseCode;
    let name0 = this.state.courses[0].courseName;
    let name1 = this.state.courses[1].courseName;
    let name2 = this.state.courses[2].courseName;
    let name3 = this.state.courses[3].courseName;
    let name4 = this.state.courses[4].courseName;
    return (
      <div align="center">
        <NavBar />
        <Typography variant="h2">Fall 2021</Typography>
        <br />
        <Grid container spacing={5}>
          <Grid item sm>
            <Card
              raised
              style={{
                borderStyle: "solid",
                borderWidth: "3px",
                borderColor: "red",
                height: 200,
              }}
            >
              <ButtonBase onClick={() => this.handleClick(code0, name0)}>
                <CardContent align="center">
                  <Typography variant="h4">{code0}</Typography>
                  <Typography variant="h5">{name0}</Typography>
                  <hr />
                  <br />
                  {/* Proof of concept styling idea */}
                  <AvatarGroup max={6}>
                    {this.state.students0.map((student) => (
                      <Avatar src={student.imageUrl} />
                    ))}
                  </AvatarGroup>
                </CardContent>
              </ButtonBase>
            </Card>
            <br />
            <br />
            <Card
              raised
              style={{
                borderStyle: "solid",
                borderWidth: "3px",
                borderColor: "red",
                height: 200,
              }}
            >
              <ButtonBase onClick={() => this.handleClick(code2, name2)}>
                <CardContent align="center">
                  <Typography variant="h4">{code2}</Typography>
                  <Typography variant="h5">{name2}</Typography>
                  <hr />
                  <br />
                  <AvatarGroup max={6}>
                    {this.state.students0.map((student) => (
                      <Avatar src={student.imageUrl} />
                    ))}
                  </AvatarGroup>
                </CardContent>
              </ButtonBase>
            </Card>
            {(this.state.courses[4].courseCode ||
              this.state.courses[4].courseName) && (
              <div>
                <br />
                <br />
                <Card
                  raised
                  style={{
                    borderStyle: "solid",
                    borderWidth: "3px",
                    borderColor: "red",
                    height: 200,
                  }}
                >
                  <ButtonBase onClick={() => this.handleClick(code4, name4)}>
                    <CardContent align="center">
                      <Typography variant="h4">{code4}</Typography>
                      <Typography variant="h5">{name4}</Typography>
                      <hr />
                      <br />
                      <AvatarGroup max={6}>
                        {this.state.students0.map((student) => (
                          <Avatar src={student.imageUrl} />
                        ))}
                      </AvatarGroup>
                    </CardContent>
                  </ButtonBase>
                </Card>
              </div>
            )}
          </Grid>
          <Grid item sm>
            <Card
              raised
              style={{
                borderStyle: "solid",
                borderWidth: "3px",
                borderColor: "red",
                height: 200,
              }}
            >
              <ButtonBase onClick={() => this.handleClick(code1, name1)}>
                <CardContent align="center">
                  <Typography variant="h4">{code1}</Typography>
                  <Typography variant="h5">{name1}</Typography>
                  <hr />
                  <br />
                  <AvatarGroup max={6}>
                    {this.state.students0.map((student) => (
                      <Avatar src={student.imageUrl} />
                    ))}
                  </AvatarGroup>
                </CardContent>
              </ButtonBase>
            </Card>
            {(this.state.courses[3].courseCode ||
              this.state.courses[3].courseName) && (
              <div>
                <br />
                <br />
                <Card
                  raised
                  style={{
                    borderStyle: "solid",
                    borderWidth: "3px",
                    borderColor: "red",
                    height: 200,
                  }}
                >
                  <ButtonBase onClick={() => this.handleClick(code3, name3)}>
                    <CardContent align="center">
                      <Typography variant="h4">{code3}</Typography>
                      <Typography variant="h5">{name3}</Typography>
                      <hr />
                      <br />
                      <AvatarGroup max={6}>
                        {this.state.students0.map((student) => (
                          <Avatar src={student.imageUrl} />
                        ))}
                      </AvatarGroup>
                    </CardContent>
                  </ButtonBase>
                </Card>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default coursesView;
