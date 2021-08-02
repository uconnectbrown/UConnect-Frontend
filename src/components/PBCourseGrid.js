import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

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
      />
      <br />
      <TextField
        id="name"
        name="name"
        autoComplete="off"
        type="text"
        label="Name"
        helperText="Principles of Economics"
        className={props.classes}
        value={props.value.name}
        onChange={props.handleChange}
        fullWidth
        required={props.required}
        size={"small"}
      />
      <br />
      <br />
      <TextField
        id="color"
        name="color"
        autoComplete="off"
        select
        label="Color"
        className={props.classes}
        value={props.value.color}
        onChange={props.handleChange}
        variant="outlined"
        size={"small"}
        helperText="Please select a course color"
      >
        {palette.map((color) => (
          <MenuItem key={color} value={color}>
            <Typography
              variant="h6"
              style={{
                backgroundColor: color,
                color: color,
                width: "100%",
              }}
            >
              Color
            </Typography>
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  );
}

export default PBCourseGrid;
