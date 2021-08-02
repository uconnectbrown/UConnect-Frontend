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
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

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
          previousPage: "messagesView",
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
          ],
          allIds: allIds,
          previousPage: "messagesView",
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
                  height: "125px",
                }}
                align="center"
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
                    <div>
                      <Typography
                        variant="h6"
                        style={{ marginLeft: "10px" }}
                        align="center"
                      >
                        {message.recipientName &&
                          message.recipientName.split(" ")[0]}
                        {message.recipientNames &&
                          `${message.recipientNames[0].split(" ")[0]}, ${
                            message.recipientNames[1].split(" ")[0]
                          }`}

                        {message.recipientNames &&
                          message.recipientNames.length === 3 &&
                          `, ${message.recipientNames[2].split(" ")[0]}`}
                      </Typography>
                      <AvatarGroup
                        max={3}
                        style={{
                          justifyContent: "center",
                        }}
                      >
                        {message.recipientImage && (
                          <Avatar
                            alt="recipient"
                            src={message.recipientImage}
                          />
                        )}
                        {message.recipientImages && (
                          <Avatar
                            alt="recipient0"
                            src={message.recipientImages[0]}
                          />
                        )}
                        {message.recipientImages && (
                          <Avatar
                            alt="recipient1"
                            src={message.recipientImages[1]}
                          />
                        )}
                        {message.recipientImages &&
                          message.recipientImages.length === 3 && (
                            <Avatar
                              alt="recipient2"
                              src={message.recipientImages[2]}
                            />
                          )}
                      </AvatarGroup>

                      <Typography variant="caption">
                        {dayjs(message.mostRecent).fromNow()}
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
