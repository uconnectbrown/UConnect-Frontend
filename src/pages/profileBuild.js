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
            concentrations: [],
            preferredPronouns: this.state.preferredPronouns,
            interests: [],
            groups: [],
            varsitySports: [],
            affinitySports: [],
            greekLife: this.state.greekLife,
            favorites: {},
            bio: this.state.bio,
            courses: []
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
                    <img src={AppIcon} alt="Brown Crest" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                         <TextField 
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth/>
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth/>
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            className={classes.textField}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            value={this.state.password}
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
