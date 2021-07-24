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
  const handleMessage = (
    recipientName,
    recipientImage,
    recipientId,
    courseCode,
    roomId
  ) => {
    history.push({
      pathname: "/messageView",
      state: {
        recipientInfo: [
          recipientName,
          recipientImage,
          recipientId,
          courseCode,
          roomId,
        ],
      },
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
                    message.recipientName,
                    message.recipientImage,
                    message.recipientId,
                    message.course,
                    message.roomId
                  )
                }
              >
                <img src={message.recipientImage} width={50}></img>
                {message.recipientName} {message.course} ||
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
