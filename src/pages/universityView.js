// Setup
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase";

// Components
import NavBar from "../components/NavBar";

// MUI Stuff
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBack";
import ButtonBase from "@material-ui/core/ButtonBase";

class universityView extends Component {
  state = {
    // Axios
    students: [],
    // Other
    loading: true,
  };

  componentDidMount() {
    axios
      .get(`/all/${auth.currentUser.email}`)
      .then((res) => {
        this.setState({
          students: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  handleClickStudent = (index) => {
    this.props.history.push({
      pathname: "/studentView",
      state: {
        // Prop for studentView
        recipientId: this.state.students[index].email.split("@")[0],
      },
    });
  };

  render() {
    const numStudents = this.state.students.length;
    let indexArray = [];
    for (let i = 0; i < numStudents; i++) {
      indexArray.push(i);
    }
    let students = this.state.students;

    return (
      <div>
        <NavBar />
        <IconButton variant="contained" component={Link} to="/coursesView">
          <BackIcon style={{ marginRight: "3px" }} />
          Back
        </IconButton>

        <GridList cols={5} spacing={20} cellHeight="auto">
          {indexArray.map((index) => (
            <GridListTile item component="Card" sm>
              <Card
                style={{
                  borderStyle: "solid",
                  borderWidth: "4px",

                  borderRadius: "5%",
                  height: "97%",
                }}
                align="center"
              >
                <ButtonBase
                  size="large"
                  color="primary"
                  onClick={() => this.handleClickStudent(index)}
                  style={{ width: "100%" }}
                >
                  <CardContent>
                    <div>
                      <img
                        alt="student"
                        src={students[index].imageUrl}
                        style={{
                          marginBottom: "10px",
                          width: 120,
                          height: 120,
                          objectFit: "cover",
                          borderRadius: "10%",
                          borderStyle: "solid",
                          borderWidth: "3px",
                        }}
                      />

                      <Typography
                        variant="h5"
                        style={{ marginBottom: "5px", lineHeight: "120%" }}
                      >
                        {students[index].firstName} {students[index].lastName}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        style={{ marginBottom: "5px", lineHeight: "120%" }}
                      >
                        Class of {students[index].classYear}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        style={{ lineHeight: "120%" }}
                      >
                        {students[index].majors[0]}
                        {students[index].majors[1] &&
                          `, ${students[index].majors[1]}`}
                        {students[index].majors[2] &&
                          `, ${students[index].majors[2]}`}
                      </Typography>
                    </div>
                  </CardContent>
                </ButtonBase>
              </Card>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default universityView;
