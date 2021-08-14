// Setup
import React, { useEffect, useState } from "react";
import axios from "axios";
import { db, auth } from "../firebase";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import Book from "@material-ui/icons/MenuBook";
import Movie from "@material-ui/icons/Movie";
import Tv from "@material-ui/icons/Tv";
import Music from "@material-ui/icons/MusicNote";
import Pets from "@material-ui/icons/Pets";
import Sports from "@material-ui/icons/SportsBasketball";
import DialogContent from "@material-ui/core/DialogContent";

// Body
function Student(props) {
  const [student, setStudent] = useState(null);
  const [indexArray, setIndexArray] = useState([]);
  useEffect(() => {
    getStudent();
  }, []);

  const getStudent = () => {
    axios
      .get(`/user/${props.emailId}`)
      .then((res) => {
        setStudent(res.data.user);
        let arr = [];
        for (let j = 0; j < 5; j++) {
          if (res.data.user.courses[j].code) {
            arr.push(j);
          }
        }
        setIndexArray(arr);
      })
      .catch((err) => console.log(err));
  };

  const sendRequest = () => {
    let senderInfo = {};
    db.doc(`/profiles/${auth.currentUser.email.split("@")[0]}`)
      .get()
      .then((doc) => {
        senderInfo.name = doc.data().firstName + " " + doc.data().lastName;
        senderInfo.imageUrl = doc.data().imageUrl;
        senderInfo.classYear = doc.data().classYear;
        return senderInfo;
      })
      .then((info) => {
        console.log(info);
        axios.post(`/request/${auth.currentUser.email}/${student.email}`, info);
      })
      .then(() => {
        return;
      })
      .catch((err) => console.log(err));
  };

  return (
    <DialogContent>
      {student && (
        <div>
          <Card raised>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={props.handleClose}
            >
              <CloseIcon />
              <span style={{ marginRight: "5px" }} />
            </IconButton>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={sendRequest}
            >
              <SendIcon />
              <span style={{ marginRight: "5px" }} />
            </IconButton>
            <CardContent align="center">
              <Grid container spacing={1}>
                <Grid item sm></Grid>
                <Grid item sm>
                  <img
                    alt="Profile"
                    src={student.imageUrl}
                    style={{
                      width: 400,
                      height: 400,
                      objectFit: "cover",
                      borderRadius: "10%",
                      borderStyle: "solid",
                      borderColor: "red",
                      borderWidth: "2px",
                    }}
                  />
                  <br />
                </Grid>
                <Grid item sm></Grid>
              </Grid>

              <br />
              <Card raised style={{ display: "inline-block" }}>
                <CardContent>
                  <span>
                    <Typography variant="h3" align="center">
                      {student.firstName} {student.lastName}{" "}
                    </Typography>
                  </span>
                  <Typography variant="h5">
                    {student.preferredPronouns &&
                      `(${student.preferredPronouns})`}
                  </Typography>
                  <br />
                  <Typography variant="h5">
                    Class of {student.classYear}
                  </Typography>
                  <Typography variant="h5">
                    Concentration(s): {student.major1}
                    {student.major2 && `, ${student.major2}`}
                    {student.major3 && `, ${student.major3}`}
                  </Typography>
                </CardContent>
              </Card>
              <br />
              <br />
              {student.bio && (
                <Card raised style={{ display: "inline-block" }}>
                  <CardContent>
                    <span>
                      <Typography variant="h4" align="center">
                        Bio
                      </Typography>
                    </span>
                    {student.bio}{" "}
                  </CardContent>
                </Card>
              )}
              <br />
              <Grid container spacing={2}>
                <Grid item sm>
                  <Card
                    raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",
                      borderColor: "red",
                      height: "100%",
                      marginBottom: "-5px",
                    }}
                  >
                    <CardContent>
                      <div>
                        <span>
                          <Typography variant="h5">Groups</Typography>
                        </span>
                        <br />
                        {student.group1 && (
                          <Typography>• {student.group1}</Typography>
                        )}
                        {student.group2 && (
                          <Typography>• {student.group2}</Typography>
                        )}
                        {student.group3 && (
                          <Typography>• {student.group3}</Typography>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm>
                  <Card
                    raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",
                      borderColor: "red",
                      height: "100%",
                      marginBottom: "-5px",
                    }}
                  >
                    <CardContent>
                      <div>
                        <span>
                          <Typography variant="h5">Varsity Sports</Typography>
                        </span>
                        <br />
                        {student.varsitySport1 && (
                          <Typography>• {student.varsitySport1}</Typography>
                        )}
                        {student.varsitySport2 && (
                          <Typography>• {student.varsitySport2}</Typography>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm>
                  <Card
                    raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",
                      borderColor: "red",
                      height: "100%",
                      marginBottom: "-5px",
                    }}
                  >
                    <CardContent>
                      <div>
                        <span>
                          <Typography variant="h5">
                            Greek Organization
                          </Typography>
                        </span>
                        <br />
                        {student.greekLife && (
                          <Typography>• {student.greekLife}</Typography>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <br />
          <Card raised>
            <CardContent align="center">
              <Typography variant="h3">Interests </Typography>
              <hr />
              <br />
              <Grid container spacing={2}>
                <Grid item sm>
                  <Card
                    raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",

                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5">Career and Academic</Typography>
                      <br />
                      {student.interests1.map((interest) => {
                        return <Typography>• {interest}</Typography>;
                      })}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm>
                  <Card
                    raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",

                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5">
                        Physical Activity and Wellness
                      </Typography>
                      <br />
                      {student.interests2.map((interest) => {
                        return <Typography>• {interest}</Typography>;
                      })}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm>
                  <Card
                    raised
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",
                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5">General Hobbies</Typography>
                      <br />
                      {student.interests3.map((interest) => {
                        return <Typography>• {interest}</Typography>;
                      })}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <br />
              <br />
              <Card raised style={{ marginBottom: "-5px" }}>
                <CardContent>
                  <Typography variant="h4">Additional Info</Typography>
                  <hr />
                  <br />
                  <Grid container>
                    <Grid item sm>
                      <div>
                        <Music />
                        <span>
                          <Typography variant="h6">Instruments</Typography>
                        </span>
                        <br />
                        {student.instrument1 && (
                          <Typography>• {student.instrument1}</Typography>
                        )}
                        {student.instrument2 && (
                          <Typography>• {student.instrument2}</Typography>
                        )}
                        {student.instrument3 && (
                          <Typography>• {student.instrument3}</Typography>
                        )}
                      </div>
                    </Grid>
                    <Grid item sm>
                      <div>
                        <Sports />
                        <span>
                          <Typography variant="h6">Pick-Up Sports</Typography>
                        </span>
                        <br />
                        {student.pickUpSport1 && (
                          <Typography>• {student.pickUpSport1}</Typography>
                        )}
                        {student.pickUpSport2 && (
                          <Typography>• {student.pickUpSport2}</Typography>
                        )}
                        {student.pickUpSport3 && (
                          <Typography>• {student.pickUpSport3}</Typography>
                        )}
                      </div>
                    </Grid>
                    <Grid item sm>
                      <div>
                        <Pets />
                        <span>
                          <Typography variant="h6">Pets</Typography>
                        </span>
                        <br />
                        {student.pet1 && (
                          <Typography>• {student.pet1}</Typography>
                        )}
                        {student.pet2 && (
                          <Typography>• {student.pet2}</Typography>
                        )}
                        {student.pet3 && (
                          <Typography>• {student.pet3}</Typography>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
          <br />
          <Card raised>
            <CardContent align="center">
              <Typography variant="h3">Favorites </Typography>
              <hr />
              <br />
              <Grid container spacing={2}>
                <Grid item sm>
                  <div>
                    <Book />
                    <Typography variant="body1">
                      Book: {student.favoriteBook}
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm>
                  <div>
                    <Movie />
                    <Typography variant="body1">
                      Movie: {student.favoriteMovie}
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm>
                  <div>
                    <Tv />
                    <Typography variant="body1">
                      Show: {student.favoriteShow}
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm>
                  <div>
                    <Music />
                    <Typography variant="body1">
                      Artist: {student.favoriteArtist}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <br />
          <Card raised>
            <CardContent align="center">
              <Typography variant="h3">Courses</Typography>
              <hr />
              <br />
              <Grid container spacing={2}>
                {indexArray.map((index) => (
                  <Grid item sm>
                    <Card
                      style={{
                        borderStyle: "solid",
                        borderWidth: "3px",
                        borderColor: `${student.courses[index].color}`,
                        height: "100%",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h5"
                          style={{
                            color: `${student.courses[index].color}`,
                          }}
                        >
                          {student.courses[index].code}
                        </Typography>
                        <Typography variant="body1">
                          {student.courses[index].name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
          <br />
        </div>
      )}
    </DialogContent>
  );
}

export default Student;
