import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useHistory } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function CourseFeed(props) {
  dayjs.extend(relativeTime);
  const history = useHistory();
  const code = props.code;
  const handleFeed = () => {
    history.push({
      pathname: "/feedView",
      state: { courseCode: code },
    });
  };
  return (
    <div>
      <Grid container>
        <Grid item sm></Grid>
        <Grid item sm>
          <Card
            raised
            style={{
              borderStyle: "solid",
              borderWidth: "3px",
              borderColor: "blue",
            }}
          >
            <CardContent align="center">
              <ButtonBase
                size="large"
                color="primary"
                onClick={() => handleFeed()}
              >
                <Typography variant="h5">Course Feed for {code}</Typography>
              </ButtonBase>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    </div>
  );
}

export default CourseFeed;
