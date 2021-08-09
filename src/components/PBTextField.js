import React from "react";
import TextField from "@material-ui/core/TextField";

function PBTextField(props) {
  return (
    <div>
      <TextField
        id={props.name}
        autoComplete="off"
        name={props.name}
        type="text"
        label={props.label}
        className={props.className}
        value={props.value}
        onChange={props.handleChange}
        required
        variant="outlined"
        size={"small"}
        style={props.style}
      />
    </div>
  );
}

export default PBTextField;
