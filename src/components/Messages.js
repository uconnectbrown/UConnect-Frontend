import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useHistory } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI Stuff
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { auth } from "../firebase";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function Messages(props) {
  dayjs.extend(relativeTime);
  const history = useHistory();
  const numMessages = props.messages.length;
  const [dialogs, setDialogs] = useState(props.messages.map((index) => false));
  const handleMessage = (
    recipientName,
    recipientNames,
    recipientImage,
    recipientImages,
    recipientId,
    recipientIds,
    courseCode
  ) => {
    if (recipientId) {
      history.push({
        pathname: "/messageView",
        state: {
          recipientId: recipientId,
          recipientName: recipientName,
          code: courseCode,
          recipientImage: recipientImage,
          previousPage: "messagesView",
        },
      });
    } else {
      const allIds = [...recipientIds];
      allIds.push(auth.currentUser.email.split("@")[0]);

      history.push({
        pathname: "/groupMessageView",
        state: {
          recipientNames: recipientNames,
          recipientImages: recipientImages,
          recipientIds: recipientIds,
          code: courseCode,
          allIds: allIds,
          previousPage: "messagesView",
        },
      });
    }
  };
  return (
    <div>
      <GridList cols={3} spacing={20} cellHeight="auto">
        {props.messages.map((message, index) => (
          <div>
            <GridListTile item sm>
              <Card
                raised
                style={{
                  borderStyle: "solid",
                  borderWidth: "2px",
                  borderColor: `red`,
                  height: "200px",
                }}
                align="center"
              >
                <IconButton style={{ marginRight: "100%" }}>
                  <MoreHorizIcon />
                </IconButton>
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
            <Dialog
              overlayStyle={{ backgroundColor: "transparent" }}
              open={dialogs[index]}
            >
              <DialogTitle
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              >
                Edit Course Color
              </DialogTitle>
              <DialogContent></DialogContent>
              <DialogActions>
                <Button color="secondary">Cancel</Button>
                <Button color="secondary">Save Changes</Button>
              </DialogActions>
            </Dialog>
          </div>
        ))}
      </GridList>
    </div>
  );
}

export default Messages;
