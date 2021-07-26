// Setup
import React from "react";
import { Route, Redirect } from "react-router-dom";

// Body
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default AuthRoute;
