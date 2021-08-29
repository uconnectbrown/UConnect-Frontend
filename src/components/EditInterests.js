import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import SchoolIcon from "@material-ui/icons/School";
import SportsFootballIcon from "@material-ui/icons/SportsFootball";
import PaletteIcon from "@material-ui/icons/Palette";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Components
import ProgressBar from "./ProgressBar.js";

// Styles
import "./Interests.css";

// Resources
import {
  CandAinterests,
  PAandWinterests,
  GHinterests,
} from "../resources/interests";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SchoolIcon />,
    2: <SportsFootballIcon />,
    3: <PaletteIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const convertInterests = (indexArr, interests) => {
  let results = [];
  for (let i = 0; i < indexArr.length; i++) {
    if (indexArr[i]) {
      results.push({ interest: interests[i], index: i });
    }
  }
  return results;
};

const convertSelect = (indexArr, interests) => {
  let results = [];
  for (let i = 0; i < interests.length; i++) {
    if (indexArr.includes(i)) {
      results.push(true);
    } else {
      results.push(false);
    }
  }
  return results;
};

function GetStepContent(
  step,
  sendInterests1,
  sendInterests2,
  sendInterests3,
  index1,
  index2,
  index3
) {
  let interests1 = CandAinterests;
  let interests2 = PAandWinterests;
  let interests3 = GHinterests;
  const [select1, setSelect1] = useState(convertSelect(index1, interests1));
  const [select2, setSelect2] = useState(convertSelect(index2, interests2));
  const [select3, setSelect3] = useState(convertSelect(index3, interests3));
  const total =
    select1.filter(Boolean).length +
    select2.filter(Boolean).length +
    select3.filter(Boolean).length;
  useEffect(() => {
    sendInterests1(convertInterests(select1, interests1));
  }, [select1]);

  useEffect(() => {
    sendInterests2(convertInterests(select2, interests2));
  }, [select2]);

  useEffect(() => {
    sendInterests3(convertInterests(select3, interests3));
  }, [select3]);

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

  switch (step) {
    case 0:
      return (
        <div>
          <Typography variant="h5">Career and Academic</Typography>
          <Grid container spacing={2} className="options-container">
            {interests1.map((interest, index) => (
              <Grid item key={index}>
                <Button
                  onClick={() => {
                    let newSelected = [...select1];
                    newSelected[index] = !select1[index];
                    setSelect1(newSelected);
                  }}
                  variant={select1[index] ? "contained" : "outlined"}
                  disabled={total > 9 && !select1[index]}
                >
                  {interest}
                </Button>
              </Grid>
            ))}
          </Grid>
        </div>
      );
    case 1:
      return (
        <div>
          <Typography variant="h5">Physical Activity and Wellness</Typography>
          <Grid container spacing={2} className="options-container">
            {interests2.map((interest, index) => (
              <Grid item>
                <Button
                  onClick={() => {
                    let newSelected = [...select2];
                    newSelected[index] = !select2[index];
                    setSelect2(newSelected);
                  }}
                  variant={select2[index] ? "contained" : "outlined"}
                  disabled={total > 9 && !select2[index]}
                >
                  {interest}
                </Button>
              </Grid>
            ))}
          </Grid>
        </div>
      );
    case 2:
      return (
        <div>
          <Typography variant="h5">General Hobbies</Typography>
          <Grid container spacing={2} className="options-container">
            {interests3.map((interest, index) => (
              <Grid item>
                <Button
                  onClick={() => {
                    let newSelected = [...select3];
                    newSelected[index] = !select3[index];
                    setSelect3(newSelected);
                  }}
                  variant={select3[index] ? "contained" : "outlined"}
                  disabled={total > 9 && !select3[index]}
                >
                  {interest}
                </Button>
              </Grid>
            ))}
          </Grid>
        </div>
      );
    default:
      return "Unknown step";
  }
}

export default function CustomizedSteppers(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [interests1, setInterests1] = React.useState([]);
  const [interests2, setInterests2] = React.useState([]);
  const [interests3, setInterests3] = React.useState([]);
  const total = interests1.length + interests2.length + interests3.length;
  const [notDone, setNotDone] = React.useState(false);

  useEffect(() => {
    props.getInterests(interests1, interests2, interests3);
  }, [interests1, interests2, interests3]);

  const handleNext = () => {
    if (activeStep === 0) {
      if (interests1.length > 0) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setNotDone(false);
      } else {
        setNotDone(true);
      }
    }
    if (activeStep === 1) {
      if (interests2.length > 0) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setNotDone(false);
      } else {
        setNotDone(true);
      }
    }
    if (activeStep === 2) {
      if (interests3.length > 0) {
        setNotDone(false);
      } else {
        setNotDone(true);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setNotDone(false);
  };

  const sendInterests1 = (i1) => {
    setInterests1(i1);
  };

  const sendInterests2 = (i2) => {
    setInterests2(i2);
  };

  const sendInterests3 = (i3) => {
    setInterests3(i3);
  };

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        <Step key="CandA">
          <StepLabel StepIconComponent={ColorlibStepIcon}>
            {interests1.length === 0 ? (
              <Typography>Please select at least one</Typography>
            ) : (
              <div>
                {interests1.map((i) => {
                  return <div>• {i.interest}</div>;
                })}
              </div>
            )}
          </StepLabel>
        </Step>
        <Step key="PAandW">
          <StepLabel StepIconComponent={ColorlibStepIcon}>
            {interests2.length === 0 ? (
              <Typography>Please select at least one</Typography>
            ) : (
              <div>
                {interests2.map((i) => {
                  return <div>• {i.interest}</div>;
                })}
              </div>
            )}
          </StepLabel>
        </Step>
        <Step key="GH">
          <StepLabel StepIconComponent={ColorlibStepIcon}>
            {interests3.length === 0 ? (
              <Typography>Please select at least one</Typography>
            ) : (
              <div>
                {interests3.map((i) => {
                  return <div>• {i.interest}</div>;
                })}
              </div>
            )}
          </StepLabel>
        </Step>
      </Stepper>

      <div align="center">
        <Typography className={classes.instructions}>
          {GetStepContent(
            activeStep,
            sendInterests1,
            sendInterests2,
            sendInterests3,
            props.index1,
            props.index2,
            props.index3
          )}
        </Typography>

        <div style={{ marginBottom: "1.5rem" }}>
          <ProgressBar step={total} />
          {total}/10
        </div>

        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={classes.button}
        >
          Back
        </Button>
        {activeStep < 2 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNext}
            className={classes.button}
            disabled={
              activeStep === 2 &&
              interests1.length + interests2.length + interests3.length < 10
            }
          >
            Next
          </Button>
        )}

        {notDone && (
          <Typography variant="body1">
            Please select at least 1 category in this section
          </Typography>
        )}
      </div>
    </div>
  );
}