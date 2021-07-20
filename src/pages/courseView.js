// think about place for the back button
// color code cards based on chosen theme
// make cards a little more sleek in design
// add filter bar and consider how to work search

// Setup
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Components
import NavBar from "../components/NavBar";

// MUI Stuff
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import CircularProgress from "@material-ui/core/CircularProgress";

// Import Data
import majorList from "../resources/majors";
import varsitySports from "../resources/varsitySports";
import greekLife from "../resources/greekLife";

class courseView extends Component {
  state = {
    courseInfo: this.props.location.state.courseInfo,
    students: [],
    open: false,
    email: "",
    searchTerm: "",
    searchCriteria: "",
    sortBy: "firstName",
    loading: true,
  };

  componentDidMount() {
    const code = this.state.courseInfo[0];
    const codeNS = code.replace(/\s/g, "");

    axios
      .get(`/students/${codeNS}`)
      .then((res) => {
        this.setState({ students: [...this.state.students, ...res.data] });
        console.log(this.state.students);
      })
      .then(() => {
        this.setState({loading: false})
      })
      .catch((err) => console.log(err));
  }

  handleClickOpen = (index) => {
    this.setState({ open: true });
    this.props.history.push({
      pathname: "/studentView",
      state: {
        studentInfo: [
          this.state.courseInfo,
          this.state.students[index].email.split("@")[0],
        ],
      },
    });
  };

  handleClose = () => {
    this.setState({ open: false });
    localStorage.removeItem("studentId");
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCriteria = (event) => {
    this.setState({ searchCriteria: event.target.value });
  };

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSort = (event) => {
    this.setState({ sortBy: event.target.value });
  };

  render() {
    const code = this.state.courseInfo[0];
    const name = this.state.courseInfo[1];
    const color = this.state.courseInfo[2];
    const numStudents = this.state.students.length;
    let indexArray = [];
    for (let i = 0; i < numStudents; i++) {
      indexArray.push(i);
    }
    let students = this.state.students;
    if (this.state.sortBy === "firstName" || this.state.sortBy === "lastName") {
      students.sort((a, b) =>
        a[`${this.state.sortBy}`] > b[`${this.state.sortBy}`]
          ? 1
          : b[`${this.state.sortBy}`] > a[`${this.state.sortBy}`]
          ? -1
          : 0
      );
    } else if (this.state.sortBy === "classYear") {
      students.sort((a, b) =>
        a[`${this.state.sortBy}`] < b[`${this.state.sortBy}`]
          ? 1
          : b[`${this.state.sortBy}`] < a[`${this.state.sortBy}`]
          ? -1
          : 0
      );
    }

    return (
      <div>
        <NavBar />
        <Typography variant="h3" align="center">
          {code}: {name}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/coursesView"
        >
          Back
        </Button>
        <Typography align="center">
          <TextField
            id="searchCriteria"
            name="searchCriteria"
            select
            label="Filter by..."
            value={this.state.searchCriteria}
            onChange={this.handleCriteria}
            variant="outlined"
            helperText="Please select a search criteria"
            size={"small"}
          >
            <MenuItem key="name" value="name">
              Name
            </MenuItem>
            <MenuItem key="classYear" value="classYear">
              Graduating Class
            </MenuItem>
            <MenuItem key="majors" value="majors">
              Concentration
            </MenuItem>
            <MenuItem key="interests" value="interests">
              General Interests
            </MenuItem>
            <MenuItem key="groups" value="groups">
              Groups
            </MenuItem>
            <MenuItem key="varsitySports" value="varsitySports">
              Varsity Sport
            </MenuItem>
            <MenuItem key="affinitySports" value="affinitySports">
              Athletic Interests
            </MenuItem>
            <MenuItem key="greekLife" value="greekLife">
              Greek Organization
            </MenuItem>
          </TextField>

          {this.state.searchCriteria === "name" && (
            <TextField
              id="name"
              name="name"
              type="text"
              label="Search..."
              value={this.state.searchTerm}
              onChange={this.handleSearch}
              variant="outlined"
              helperText="Please search a name"
              size={"small"}
            />
          )}
          {this.state.searchCriteria === "classYear" && (
            <TextField
              id="classYear"
              name="classYear"
              select
              label="Search..."
              value={this.state.searchTerm}
              onChange={this.handleSearch}
              variant="outlined"
              helperText="Please select a graduating class"
              size={"small"}
            >
              <MenuItem key="2021.5" value="2021.5">
                2021.5
              </MenuItem>
              <MenuItem key="2022" value="2022">
                2022
              </MenuItem>
              <MenuItem key="2022.5" value="2022.5">
                2022.5
              </MenuItem>
              <MenuItem key="2023" value="2023">
                2023
              </MenuItem>
              <MenuItem key="2023.5" value="2023.5">
                2023.5
              </MenuItem>
              <MenuItem key="2024" value="2024">
                2024
              </MenuItem>
              <MenuItem key="2024.5" value="2024.5">
                2024.5
              </MenuItem>
              <MenuItem key="2025" value="2025">
                2025
              </MenuItem>
            </TextField>
          )}
          {this.state.searchCriteria === "majors" && (
            <TextField
              variant="outlined"
              name="majors"
              size={"small"}
              label="Search..."
              helperText="Please search a concentration"
              onChange={this.handleSearch}
              InputProps={{
                endAdornment: majorList,
                inputProps: {
                  list: "majors",
                },
              }}
            />
          )}
          {this.state.searchCriteria === "interests" && (
            <TextField
              id="interests"
              name="interests"
              type="text"
              label="Search..."
              value={this.state.searchTerm}
              onChange={this.handleSearch}
              helperText="Please search a general interest"
              variant="outlined"
              size={"small"}
            />
          )}
          {this.state.searchCriteria === "groups" && (
            <TextField
              id="groups"
              name="groups"
              type="text"
              label="Search..."
              value={this.state.searchTerm}
              onChange={this.handleSearch}
              helperText="Please search a group"
              variant="outlined"
              size={"small"}
            />
          )}
          {this.state.searchCriteria === "varsitySports" && (
            <TextField
              variant="outlined"
              name="varsitySports"
              size={"small"}
              label="Search..."
              helperText="Please search a varsity sport"
              onChange={this.handleSearch}
              InputProps={{
                endAdornment: varsitySports,
                inputProps: {
                  list: "varsitySports",
                },
              }}
            />
          )}
          {this.state.searchCriteria === "affinitySports" && (
            <TextField
              id="affinitySports"
              name="affinitySports"
              type="text"
              label="Search..."
              value={this.state.searchTerm}
              onChange={this.handleSearch}
              helperText="Please search an athletic interest"
              variant="outlined"
              size={"small"}
            />
          )}
          {this.state.searchCriteria === "greekLife" && (
            <TextField
              variant="outlined"
              name="greekLife"
              size={"small"}
              label="Search..."
              helperText="Please search a greek organization"
              onChange={this.handleSearch}
              InputProps={{
                endAdornment: greekLife,
                inputProps: {
                  list: "greekLife",
                },
              }}
            />
          )}

          {this.state.searchCriteria === "" &&
            this.state.sortBy !== "classYear" && (
              <span
                style={{
                  marginRight: "400px",
                }}
              />
            )}
          {this.state.searchCriteria === "name" &&
            this.state.sortBy !== "classYear" && (
              <span
                style={{
                  marginRight: "206px",
                }}
              />
            )}
          {this.state.searchCriteria === "classYear" &&
            this.state.sortBy !== "classYear" && (
              <span
                style={{
                  marginRight: "187px",
                }}
              />
            )}
          {this.state.searchCriteria === "majors" &&
            this.state.sortBy !== "classYear" && (
              <span
                style={{
                  marginRight: "199px",
                }}
              />
            )}
          {this.state.searchCriteria === "interests" &&
            this.state.sortBy !== "classYear" && (
              <span
                style={{
                  marginRight: "187px",
                }}
              />
            )}
          {/* new additional criteria */}
          {this.state.searchCriteria === "groups" &&
            this.state.sortBy !== "classYear" && (
              <span
                style={{
                  marginRight: "206px",
                }}
              />
            )}
          {this.state.searchCriteria === "varsitySports" &&
            this.state.sortBy !== "classYear" && (
              <span
                style={{
                  marginRight: "206px",
                }}
              />
            )}
          {this.state.searchCriteria === "affinitySports" &&
            this.state.sortBy !== "classYear" && (
              <span
                style={{
                  marginRight: "182px",
                }}
              />
            )}
          {this.state.searchCriteria === "greekLife" &&
            this.state.sortBy !== "classYear" && (
              <span
                style={{
                  marginRight: "170px",
                }}
              />
            )}

          {this.state.searchCriteria === "" &&
            this.state.sortBy === "classYear" && (
              <span
                style={{
                  marginRight: "381px",
                }}
              />
            )}
          {this.state.searchCriteria === "name" &&
            this.state.sortBy === "classYear" && (
              <span
                style={{
                  marginRight: "187px",
                }}
              />
            )}
          {this.state.searchCriteria === "classYear" &&
            this.state.sortBy === "classYear" && (
              <span
                style={{
                  marginRight: "168px",
                }}
              />
            )}
          {this.state.searchCriteria === "majors" &&
            this.state.sortBy === "classYear" && (
              <span
                style={{
                  marginRight: "180px",
                }}
              />
            )}
          {this.state.searchCriteria === "interests" &&
            this.state.sortBy === "classYear" && (
              <span
                style={{
                  marginRight: "168px",
                }}
              />
            )}
          {this.state.searchCriteria === "groups" &&
            this.state.sortBy === "classYear" && (
              <span
                style={{
                  marginRight: "187px",
                }}
              />
            )}
          {this.state.searchCriteria === "varsitySports" &&
            this.state.sortBy === "classYear" && (
              <span
                style={{
                  marginRight: "187px",
                }}
              />
            )}
          {this.state.searchCriteria === "affinitySports" &&
            this.state.sortBy === "classYear" && (
              <span
                style={{
                  marginRight: "163px",
                }}
              />
            )}
          {this.state.searchCriteria === "greekLife" &&
            this.state.sortBy === "classYear" && (
              <span
                style={{
                  marginRight: "151px",
                }}
              />
            )}

          <TextField
            id="sortBy"
            name="sortBy"
            select
            label="Sort by..."
            value={this.state.sortBy}
            onChange={this.handleSort}
            variant="outlined"
            helperText="Please select a sorting criteria"
            size={"small"}
          >
            <MenuItem key="firstName" value="firstName">
              First Name: Alphabetical (A-Z)
            </MenuItem>
            <MenuItem key="lastName" value="lastName">
              Last Name: Alphabetical (A-Z)
            </MenuItem>
            <MenuItem key="classYear" value="classYear">
              Graduating Class: (2025-2021.5)
            </MenuItem>
          </TextField>
        </Typography>
        <br />
        <br />
        {this.state.loading && (
          <div align="center">
            <CircularProgress size={100} />
            <br />
            <br />
            <Typography variant="h4">Fetching students' data...</Typography>
          </div>
        )}
        {!this.state.loading && (
        <GridList cols={3} spacing={20} cellHeight="auto">
          {indexArray
            .filter((index) => {
              if (this.state.searchCriteria === "") {
                return index;
              } else if (this.state.searchCriteria === "name") {
                if (
                  `${students[index]["firstName"]} ${students[index]["lastName"]}`
                    .toString()
                    .toLowerCase()
                    .includes(this.state.searchTerm.toString().toLowerCase())
                ) {
                  return index;
                }
              } else if (
                students[index][`${this.state.searchCriteria}`]
                  .toString()
                  .toLowerCase()
                  .includes(this.state.searchTerm.toString().toLowerCase())
              ) {
                return index;
              }
            })
            .map((index) => (
              <GridListTile item component="Card" sm>
                <Card
                  raised
                  style={{
                    borderStyle: "solid",
                    borderWidth: "4px",
                    borderColor: `${color}`,
                    borderRadius: "5%",
                    height: "97%",
                  }}
                  align="center"
                >
                  {/* switched the order of buttonBase and cardContent since it worked in coursesView */}
                  <ButtonBase
                      size="large"
                      color="primary"
                      onClick={() => this.handleClickOpen(index)}
                      style={{width:"100%"}}
                    >
                  <CardContent>
                    
                      <div>
                        {/* <Typography>{index}</Typography> */}
                        <img
                          alt="student"
                          src={students[index].imageUrl}
                          style={{
                            width: 150,
                            height: 150,
                            objectFit: "cover",
                            borderRadius: "10%",
                            borderStyle: "solid",
                            borderColor: `${color}`,
                            borderWidth: "2px",
                          }}
                        />

                        <br />
                        <br />
                        <Typography variant="h4">
                          {students[index].firstName} {students[index].lastName}
                        </Typography>
                        <Typography variant="h6">
                          Class of {students[index].classYear}
                        </Typography>
                        <Typography variant="h6">
                          {students[index].majors[0]}
                          {students[index].majors[1] &&
                            `, ${students[index].majors[1]}`}
                          {students[index].majors[2] &&
                            `, ${students[index].majors[2]}`}
                        </Typography>
                        <Typography variant="body1">Interests:</Typography>
                        <Typography variant="body1">
                          • {students[index].interests[0]}
                        </Typography>
                        <Typography variant="body1">
                          • {students[index].interests[1]}
                        </Typography>
                        <Typography variant="body1">
                          • {students[index].interests[2]}
                        </Typography>
                      </div>
                    
                  </CardContent>
                  </ButtonBase>
                </Card>
              </GridListTile>
            ))}
        </GridList>
        )}
      </div>
    );
  }
}

export default courseView;
