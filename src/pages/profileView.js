import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

// Components
import Profile from "../components/Profile";

// MUI Stuff
import Button from "@material-ui/core/Button";

class profileView extends Component {
  state = {
    affinitySports: [],
    bio: "",
    class: "",
    courses: [],
    createdAt: "",
    email: "",
    favorites: {},
    firstName: "",
    greekLife: "",
    groups: [],
    imageUrl: "",
    interests: [],
    lastName: "",
    majors: [],
    preferredPronouns: "",
    userId: "",
    varsitySports: [],
  };

  componentDidMount() {
    const emailId = this.props.location.state.email.split("@")[0];
    axios
      .get(`/user/${emailId}`)
      .then((res) => {
        this.setState({
          affinitySports: res.data.user.affinitySports,
          bio: res.data.user.bio,
          class: res.data.user.class,
          courses: res.data.user.courses,
          createdAt: res.data.user.createdAt,
          email: res.data.user.email,
          favorites: res.data.user.favorites,
          firstName: res.data.user.firstName,
          greekLife: res.data.user.greekLife,
          groups: res.data.user.groups,
          imageUrl: res.data.user.imageUrl,
          interests: res.data.user.interests,
          lastName: res.data.user.lastName,
          majors: res.data.user.majors,
          preferredPronouns: res.data.user.preferredPronouns,
          userId: res.data.user.userId,
          varsitySports: res.data.user.varsitySports,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        <h5>affinity sports: {this.state.affinitySports}</h5>
        <h5>bio: {this.state.bio}</h5>
        <h5>class: {this.state.class}</h5>
        <h5>
          course Codes: {this.state.courses.map((course) => course.courseCode)}
        </h5>
        <h5>
          course Names: {this.state.courses.map((course) => course.courseName)}
        </h5>
        <h5>createdAt: {this.state.createdAt}</h5>
        <h5>email: {this.state.email}</h5>
        <h5>favorite artist: {this.state.favorites.artist}</h5>
        <h5>favorite book: {this.state.favorites.book}</h5>
        <h5>favorite movie: {this.state.favorites.movie}</h5>
        <h5>favorite tvShow: {this.state.favorites.tvShow}</h5>
        <h5>first name: {this.state.firstName}</h5>
        <h5>greek life: {this.state.greekLife}</h5>
        <h5>groups: {this.state.groups}</h5>
        <h5>image url: {this.state.imageUrl}</h5>
        <h5>interests: {this.state.interests}</h5>
        <h5>last name: {this.state.lastName}</h5>
        <h5>majors: {this.state.majors}</h5>
        <h5>preferred pronouns: {this.state.preferredPronouns}</h5>
        <h5>user ID: {this.state.userId}</h5>
        <h5>varsity sports: {this.state.varsitySports}</h5>
      </div>
    );
  }
}

export default profileView;
