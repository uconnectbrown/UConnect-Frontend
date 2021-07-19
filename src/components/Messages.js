import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useHistory } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

function Messages(props) {
  dayjs.extend(relativeTime);
  const history = useHistory();
  const handleMessage = (roomId, name, image, id, code) => {
    history.push({
      pathname: "/messageView",
      state: { studentInfo: [name, image, id, code] },
    });
  };
  return (
    <div>
      {props.messages.map((message) => (
        <div>
          <Card>
            <CardContent>
              <ButtonBase
                size="large"
                color="primary"
                onClick={() =>
                  handleMessage(
                    message.roomId,
                    message.name,
                    message.image,
                    message.recipientId,
                    message.course
                  )
                }
              >
                <img src={message.image} width={50}></img>
                {message.name} {message.course} ||
                <span>{dayjs(message.mostRecent).fromNow()}</span>
              </ButtonBase>
            </CardContent>
          </Card>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Messages;
