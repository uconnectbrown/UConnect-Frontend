// Set Up
import React, { useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import { Input, Button } from "@material-ui/core";

// Body
function SendGroupMessage({
  scroll,
  recipientImages,
  recipientNames,
  recipientIds,
  courseCode,
  ownName,
  ownImage,
  roomId,
  ownId,
}) {
  const [msg, setMsg] = useState("");

  async function SendGroupMessage(e) {
    e.preventDefault();
    let promises = [];
    for (let i = 0; i < recipientNames.length; i++) {
      let recipientNamesNR = recipientNames.filter(
        (name) => name !== recipientNames[i]
      );
      let recipientImagesNR = recipientImages.filter(
        (image) => image !== recipientImages[i]
      );
      let recipientIdsNR = recipientIds.filter((id) => id !== recipientIds[i]);
      recipientNamesNR.push(ownName);
      recipientImagesNR.push(ownImage);
      recipientIdsNR.push(ownId);

      promises.push(
        db
          .collection("profiles")
          .doc(recipientIds[i])
          .collection(`${courseCode} messages`)
          .doc(roomId)
          .set({
            course: courseCode,
            recipientNames: recipientNamesNR,
            recipientImages: recipientImagesNR,
            roomId,
            recipientIds: recipientIdsNR,
            mostRecent: new Date().toISOString(),
          })
      );
    }

    promises.push(
      db
        .collection("courses")
        .doc(courseCode)
        .collection("allMessages")
        .doc(roomId)
        .collection("messages")
        .add({
          text: msg,
          ownImage,
          ownId,
          createdAt: new Date().toISOString(),
        }),

      db
        .collection("profiles")
        .doc(ownId)
        .collection(`${courseCode} messages`)
        .doc(roomId)
        .set({
          course: courseCode,
          recipientNames: recipientNames,
          recipientImages: recipientImages,
          roomId,
          recipientIds: recipientIds,
          mostRecent: new Date().toISOString(),
        })
    );

    await Promise.all([promises]);

    setMsg("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      <form onSubmit={SendGroupMessage}>
        <div className="sendMsg">
          <Input
            style={{
              width: "78%",
              fontSize: "15px",
              fontWeight: "550",
              marginLeft: "5px",
              marginBottom: "-3px",
            }}
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Message..."
          />
          <Button
            style={{
              width: "18%",
              fontSize: "15px",
              fontWeight: "550",
              margin: "4px 5% -13px 5%",
              maxWidth: "200px",
            }}
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendGroupMessage;
