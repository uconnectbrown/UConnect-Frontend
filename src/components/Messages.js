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
import { auth } from "../firebase";

function Messages(props) {
  dayjs.extend(relativeTime);
  const history = useHistory();
  const handleMessage = (
    recipientName,
    recipientNames,
    recipientImage,
    recipientImages,
    recipientId,
    recipientIds,
    courseCode,
    roomId
  ) => {
    if (recipientId) {
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
    } else {
      const allIds = [...recipientIds];
      allIds.push(auth.currentUser.email.split("@")[0]);

      history.push({
        pathname: "/groupMessageView",
        state: {
          recipientInfo: [
            recipientNames,
            recipientImages,
            recipientIds,
            courseCode,
            allIds,
          ],
        },
      });
    }
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
                }}
              >
                <CardContent>
                  <ButtonBase
                    size="large"
                    color="primary"
                    onClick={() =>
                      handleMessage(
                        message.recipientName,
                        message.recipientNames,
                        message.recipientImage,
                        message.recipientImages,
                        message.recipientId,
                        message.recipientIds,
                        message.course,
                        message.roomId
                      )
                    }
                  >
                    <img
                      src={message.recipientImage || message.recipientImages[0]}
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                        borderRadius: "10%",
                        borderStyle: "solid",
                        borderColor: `red`,
                        borderWidth: "1px",
                      }}
                    />
                    <div>
                      <Typography
                        variant="h6"
                        style={{ marginLeft: "10px" }}
                        align="left"
                      >
                        {message.recipientName || message.recipientNames}
                      </Typography>
                      <Typography variant="body" style={{ marginLeft: "10px" }}>
                        Most recent message... ||{" "}
                        <Typography variant="caption">
                          {dayjs(message.mostRecent).fromNow()}
                        </Typography>
                      </Typography>
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
