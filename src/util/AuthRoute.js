import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

export default AuthRoute;

// this might not be relevant since we probably aren't going to have a NavBar the same way
