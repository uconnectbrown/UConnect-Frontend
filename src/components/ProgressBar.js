import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";

const useStyles = makeStyles({
  root: {
  },
});

export default function ProgressMobileStepper(props) {
  const classes = useStyles();
  return (
    <div align="center">
      <MobileStepper
        variant="progress"
        steps={11}
        align="center"
        position="static"
        activeStep={props.step}
        className={classes.root}
      />
    </div>
  );
}
