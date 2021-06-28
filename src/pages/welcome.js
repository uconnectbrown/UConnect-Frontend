import React, { Component } from 'react'
import { Link } from 'react-router-dom';

// MUI Stuff
import Button from '@material-ui/core/Button';

class welcome extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to UConnect!</h1>
                <Button color="red" component={Link} to="/login">Login</Button>
                <Button color="blue" component={Link} to="/signup">Signup</Button>
            </div>
        )
    }
}

export default welcome
