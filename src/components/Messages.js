import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useHistory } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

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
      <GridList cols={3} spacing={20} cellHeight="auto">
      {props.messages.map((message) => (
        <div>
          <GridListTile item sm>
          <Card
            raised
            style={{
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: `red`,
              height: "97%",
            }}>
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
                <img 
                  src={message.recipientImage} 
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    borderRadius: "10%",
                    borderStyle: "solid",
                    borderColor: `red`,
                    borderWidth: "1px",
                  }} />
                <div>
                <Typography variant="h6" style={{marginLeft: "10px"}} align="left">{message.recipientName}</Typography>
                <Typography variant="body" style={{marginLeft: "10px"}}>Most recent message... || <Typography variant="caption">{dayjs(message.mostRecent).fromNow()}</Typography></Typography>
                </div>
              </ButtonBase>
            </CardContent>
          </Card>
          </GridListTile>
        </div>
      ))}
      </GridList>
    </div>
  );
}

export default Messages;
