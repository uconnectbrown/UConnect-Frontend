import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useHistory } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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
      <Card>
        <CardContent>
          <ButtonBase size="large" color="primary" onClick={() => handleFeed()}>
            Course Feed for {code}
          </ButtonBase>
        </CardContent>
      </Card>
    </div>
  );
}

export default CourseFeed;
