// Setup
import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

// Resources
import { codes } from "../resources/courses";

function PBCourseGrid(props) {
  let palette = [
    "#16a085",
    "#27ae60",
    "#2980b9",
    "#8e44ad",
    "#2c3e50",
    "#f1c40f",
    "#e67e22",
    "#e74c3c",
    "#ecf0f1",
    "#95a5a6",
  ];
  return (
    <Grid item sm>
      <h3>{props.course}</h3>

      <TextField
        id="code"
        name="code"
        autoComplete="off"
        type="text"
        label="Code"
        helperText="e.g. ECON 0110"
        className={props.classes}
        value={props.value.code}
        onChange={props.handleChange}
        size={"small"}
        required={props.required}
        variant="outlined"
        InputProps={{
          endAdornment: codes,
          inputProps: {
            list: "codes",
          },
        }}
      />
    </Grid>
  );
}

export default PBCourseGrid;
