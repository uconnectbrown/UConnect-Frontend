import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/BrownCrest.png'
import axios from 'axios';
import { Link } from 'react-router-dom';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
          margin: '20px auto 20px auto',
         width: '200px'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    cutomError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
}

class profileBuild extends Component {
    constructor(){
        super();
        this.state = {
            firstName: '',
            lastName: '',
            class: '',
            concentrations: [],
            preferredPronouns: '',
            interests: [],
            groups: [],
            varsitySports: [],
            affinitySports: [],
            greekLife: '',
            favorites: {},
            bio: '',
            courses: [],
            loading: false,
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            class: this.state.class,
            concentrations: this.state.concentrations,
            preferredPronouns: this.state.preferredPronouns,
            interests: this.state.interests,
            groups: this.state.groups,
            varsitySports: this.state.varsitySports,
            affinitySports: this.state.affinitySports,
            greekLife: this.state.greekLife,
            favorites: this.state.favorites,
            bio: this.state.bio,
            courses: this.state.courses
        }
        // not sure what our profile data populating function is called
        axios.post('/...', newUserData)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                this.setState({
                    loading: false
                });
                // push to course landing page in future
                this.props.history.push('/profileView')
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            })
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    
    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Build Profile
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <h2>Basic Info</h2>
                        <TextField 
                            id="firstName"
                            name="firstName"
                            type="text"
                            label="First Name"
                            className={classes.textField}
                            helperText={errors.firstName}
                            error={errors.firstName ? true : false}
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            fullWidth/>
                        <TextField
                            id="lastName"
                            name="lastName"
                            type="text"
                            label="Last Name"
                            className={classes.textField}
                            helperText={errors.lastName}
                            error={errors.lastName ? true : false}
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            fullWidth/>
                        <section className={classes.textField}>
                            <label for="class">Class of </label>
                            <select name="class" id="class">
                                <option value="2021.5">2021.5</option>
                                <option value="2022">2022</option>
                                <option value="2022.5">2022.5</option>
                                <option value="2023">2023</option>
                                <option value="2023.5">2023.5</option>
                                <option value="2024">2024</option>
                                <option value="2024.5">2024.5</option>
                                <option value="2025">2025</option>
                            </select>
                        </section>
                        <section class={classes.textField}>
                            <label>
                            What is your intended concentration? Feel free to put Undecided if you don't know at this point.
                            </label>  
                            <input list="majors" name="majors" /> 
                            <datalist id="majors">
                                    <option value="Africana Studies" />
                                    <option value="American Studies" />
                                    <option value="Anthropology" />
                                    <option value="Applied Mathematics" />
                                    <option value="Applied Mathematics-Biology" />
                                    <option value="Applied Mathematics-Computer Science" />   
                                    <option value="Applied Mathematics-Economics" />
                                    <option value="Archaeology and the Ancient World" />
                                    <option value="Architecture" />
                                    <option value="Astronomy" />
                                    <option value="Behavioral Decision Sciences" />
                                    <option value="Biochemistry and Molecular Biology" />
                                    <option value="Biology" />
                                    <option value="Biomedical Engineering" />
                                    <option value="Biophysics" />
                                    <option value="Business, Entrepreneurship, and Organizations" />
                                    <option value="Chemical Physics" />
                                    <option value="Chemistry" />
                                    <option value="Classics" />
                                    <option value="Cognitive Neuroscience" />
                                    <option value="Cognitive Science" />
                                    <option value="Comparative Literature" />
                                    <option value="Computational Biology" />
                                    <option value="Computer Science" />
                                    <option value="Computer Science-Economics" />
                                    <option value="Contemplative Studies" />
                                    <option value="Development Studies" />
                                    <option value="Early Modern World" />
                                    <option value="East Asian Studies" />
                                    <option value="Economics" />
                                    <option value="Education Studies" />
                                    <option value="Egyptology and Assyriology" />
                                    <option value="Engineering" />
                                    <option value="Engineering and Physics" />
                                    <option value="English" />
                                    <option value="Environmental Studies" />
                                    <option value="Ethnic Studies" />
                                    <option value="French and Francophone Studies" />
                                    <option value="Gender and Sexuality Studies" />
                                    <option value="Geological Sciences" />
                                    <option value="Geology-Biology" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                            </datalist>
                        </section>
                        <section className={classes.textField}>
                            <label for="preferredPronouns">What are your preferred pronouns? </label>
                            <select name="preferredPronouns" id="preferredPronouns">
                                <option value="he/him">he/him</option>
                                <option value="she/her">she/her</option>
                                <option value="they/them">they/them</option>
                                <option value="ze/hir">ze/hir</option>
                                <option value="other">other</option>
                            </select>
                        </section>
                        <h2>Interests</h2>
                        <body1>Please list between 3 and 5 areas of interest you have.</body1>
                        <TextField
                            id="interests"
                            name="interests"
                            type="text"
                            label="First Interest"
                            className={classes.textField}
                            helperText={errors.interests}
                            error={errors.interests ? true : false}
                            value={this.state.interests}
                            onChange={this.handleChange}
                            fullWidth/>
                        <TextField
                            id="interests"
                            name="interests"
                            type="text"
                            label="Second Interest"
                            className={classes.textField}
                            helperText={errors.interests}
                            error={errors.interests ? true : false}
                            value={this.state.interests}
                            onChange={this.handleChange}
                            fullWidth/>
                        <TextField
                            id="interests"
                            name="interests"
                            type="text"
                            label="Third Interest"
                            className={classes.textField}
                            helperText={errors.interests}
                            error={errors.interests ? true : false}
                            value={this.state.interests}
                            onChange={this.handleChange}
                            fullWidth/>
                        <TextField
                            id="interests"
                            name="interests"
                            type="text"
                            label="Fourth Interest"
                            className={classes.textField}
                            helperText={errors.interests}
                            error={errors.interests ? true : false}
                            value={this.state.interests}
                            onChange={this.handleChange}
                            fullWidth/>
                        <TextField
                            id="interests"
                            name="interests"
                            type="text"
                            label="Fifth Interest"
                            className={classes.textField}
                            helperText={errors.interests}
                            error={errors.interests ? true : false}
                            value={this.state.interests}
                            onChange={this.handleChange}
                            fullWidth/>
                        <h2>Groups</h2>
                        <body1>Please list up to 3 clubs, affinity groups, or student organizations you are involved with.</body1>
                        <TextField
                            id="groups"
                            name="groups"
                            type="text"
                            label="First Group"
                            className={classes.textField}
                            helperText={errors.groups}
                            error={errors.groups ? true : false}
                            value={this.state.groups}
                            onChange={this.handleChange}
                            fullWidth/>
                        <TextField
                            id="groups"
                            name="groups"
                            type="text"
                            label="Second Group"
                            className={classes.textField}
                            helperText={errors.groups}
                            error={errors.groups ? true : false}
                            value={this.state.groups}
                            onChange={this.handleChange}
                            fullWidth/>
                        <TextField
                            id="groups"
                            name="groups"
                            type="text"
                            label="Third Group"
                            className={classes.textField}
                            helperText={errors.groups}
                            error={errors.groups ? true : false}
                            value={this.state.groups}
                            onChange={this.handleChange}
                            fullWidth/>
                        <h2>Athletics</h2>
                        <body1>If you are a member of any varsity sports teams, please indicate which ones below.</body1>
                        <section class={classes.textField}>
                            <label>
                            First Varsity Sport:
                            </label>  
                            <input list="varsitySports" name="varsitySports" /> 
                            <datalist id="varsitySports">
                                    <option value="Africana Studies" />
                                    <option value="American Studies" />
                                    <option value="Anthropology" />
                                    <option value="Applied Mathematics" />
                                    <option value="Applied Mathematics-Biology" />
                                    <option value="Applied Mathematics-Computer Science" />   
                                    <option value="Applied Mathematics-Economics" />
                                    <option value="Archaeology and the Ancient World" />
                                    <option value="Architecture" />
                                    <option value="Astronomy" />
                                    <option value="Behavioral Decision Sciences" />
                                    <option value="Biochemistry and Molecular Biology" />
                                    <option value="Biology" />
                                    <option value="Biomedical Engineering" />
                                    <option value="Biophysics" />
                                    <option value="Business, Entrepreneurship, and Organizations" />
                                    <option value="Chemical Physics" />
                                    <option value="Chemistry" />
                                    <option value="Classics" />
                                    <option value="Cognitive Neuroscience" />
                                    <option value="Cognitive Science" />
                                    <option value="Comparative Literature" />
                                    <option value="Computational Biology" />
                                    <option value="Computer Science" />
                                    <option value="Computer Science-Economics" />
                                    <option value="Contemplative Studies" />
                                    <option value="Development Studies" />
                                    <option value="Early Modern World" />
                                    <option value="East Asian Studies" />
                                    <option value="Economics" />
                                    <option value="Education Studies" />
                                    <option value="Egyptology and Assyriology" />
                                    <option value="Engineering" />
                                    <option value="Engineering and Physics" />
                                    <option value="English" />
                                    <option value="Environmental Studies" />
                                    <option value="Ethnic Studies" />
                                    <option value="French and Francophone Studies" />
                                    <option value="Gender and Sexuality Studies" />
                                    <option value="Geological Sciences" />
                                    <option value="Geology-Biology" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                            </datalist>
                        </section>
                        <section class={classes.textField}>
                            <label>
                            Second Varsity Sport:
                            </label>  
                            <input list="varsitySports" name="varsitySports" /> 
                            <datalist id="varsitySports">
                                    <option value="Africana Studies" />
                                    <option value="American Studies" />
                                    <option value="Anthropology" />
                                    <option value="Applied Mathematics" />
                                    <option value="Applied Mathematics-Biology" />
                                    <option value="Applied Mathematics-Computer Science" />   
                                    <option value="Applied Mathematics-Economics" />
                                    <option value="Archaeology and the Ancient World" />
                                    <option value="Architecture" />
                                    <option value="Astronomy" />
                                    <option value="Behavioral Decision Sciences" />
                                    <option value="Biochemistry and Molecular Biology" />
                                    <option value="Biology" />
                                    <option value="Biomedical Engineering" />
                                    <option value="Biophysics" />
                                    <option value="Business, Entrepreneurship, and Organizations" />
                                    <option value="Chemical Physics" />
                                    <option value="Chemistry" />
                                    <option value="Classics" />
                                    <option value="Cognitive Neuroscience" />
                                    <option value="Cognitive Science" />
                                    <option value="Comparative Literature" />
                                    <option value="Computational Biology" />
                                    <option value="Computer Science" />
                                    <option value="Computer Science-Economics" />
                                    <option value="Contemplative Studies" />
                                    <option value="Development Studies" />
                                    <option value="Early Modern World" />
                                    <option value="East Asian Studies" />
                                    <option value="Economics" />
                                    <option value="Education Studies" />
                                    <option value="Egyptology and Assyriology" />
                                    <option value="Engineering" />
                                    <option value="Engineering and Physics" />
                                    <option value="English" />
                                    <option value="Environmental Studies" />
                                    <option value="Ethnic Studies" />
                                    <option value="French and Francophone Studies" />
                                    <option value="Gender and Sexuality Studies" />
                                    <option value="Geological Sciences" />
                                    <option value="Geology-Biology" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                            </datalist>
                        </section>
                        <section class={classes.textField}>
                            <label>
                            Third Varsity Sport:
                            </label>  
                            <input list="varsitySports" name="varsitySports" /> 
                            <datalist id="varsitySports">
                                    <option value="Africana Studies" />
                                    <option value="American Studies" />
                                    <option value="Anthropology" />
                                    <option value="Applied Mathematics" />
                                    <option value="Applied Mathematics-Biology" />
                                    <option value="Applied Mathematics-Computer Science" />   
                                    <option value="Applied Mathematics-Economics" />
                                    <option value="Archaeology and the Ancient World" />
                                    <option value="Architecture" />
                                    <option value="Astronomy" />
                                    <option value="Behavioral Decision Sciences" />
                                    <option value="Biochemistry and Molecular Biology" />
                                    <option value="Biology" />
                                    <option value="Biomedical Engineering" />
                                    <option value="Biophysics" />
                                    <option value="Business, Entrepreneurship, and Organizations" />
                                    <option value="Chemical Physics" />
                                    <option value="Chemistry" />
                                    <option value="Classics" />
                                    <option value="Cognitive Neuroscience" />
                                    <option value="Cognitive Science" />
                                    <option value="Comparative Literature" />
                                    <option value="Computational Biology" />
                                    <option value="Computer Science" />
                                    <option value="Computer Science-Economics" />
                                    <option value="Contemplative Studies" />
                                    <option value="Development Studies" />
                                    <option value="Early Modern World" />
                                    <option value="East Asian Studies" />
                                    <option value="Economics" />
                                    <option value="Education Studies" />
                                    <option value="Egyptology and Assyriology" />
                                    <option value="Engineering" />
                                    <option value="Engineering and Physics" />
                                    <option value="English" />
                                    <option value="Environmental Studies" />
                                    <option value="Ethnic Studies" />
                                    <option value="French and Francophone Studies" />
                                    <option value="Gender and Sexuality Studies" />
                                    <option value="Geological Sciences" />
                                    <option value="Geology-Biology" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                                    <option value="Astronomy" />
                            </datalist>
                        </section>
                        <body1>If you are not on a varsity sports team but still enjoy playing and competing in sports, please indicate which ones below.</body1>
                        <TextField
                            id="affinitySports"
                            name="affinitySports"
                            type="text"
                            label="First Sport"
                            className={classes.textField}
                            helperText={errors.affinitySports}
                            error={errors.affinitySports ? true : false}
                            value={this.state.affinitySports}
                            onChange={this.handleChange}
                            fullWidth/>
                        <TextField
                            id="affinitySports"
                            name="affinitySports"
                            type="text"
                            label="Second Sport"
                            className={classes.textField}
                            helperText={errors.affinitySports}
                            error={errors.affinitySports ? true : false}
                            value={this.state.affinitySports}
                            onChange={this.handleChange}
                            fullWidth/>
                        <TextField
                            id="affinitySports"
                            name="affinitySports"
                            type="text"
                            label="Third Sport"
                            className={classes.textField}
                            helperText={errors.affinitySports}
                            error={errors.affinitySports ? true : false}
                            value={this.state.affinitySports}
                            onChange={this.handleChange}
                            fullWidth/>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" 
                            variant="contained" 
                            color="primary" 
                            className={classes.Button}
                            disabled={loading}>
                            Sign Up
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                        <br />
                        <small>already have an account? login <Link to="/login">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

profileBuild.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(profileBuild);
