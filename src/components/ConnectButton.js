import React from "react";

import { Button } from "react-bootstrap";
import Tooltip from "@material-ui/core/Tooltip";

function ConnectButton(props) {
  const renderConnectButton = () => {
    let component;
    switch (props.status) {
      case "inc":
        component = (
          <Button onClick={props.acceptRequest}>Accept Request</Button>
        );
        break;
      case "out":
        component = (
          <div>
            <Tooltip title="Unrequest available after 48 hours">
              <span>
              <Button
              disabled={!props.validUndo}
              onClick={() => {
                if (props.closeOnUndo) {
                  props.undoRequest();
                  props.handleClose();
                }
                if (!props.closeOnUndo) {
                  props.undoRequest();
                }
              }}
            >
              Requested
            </Button>
              </span>
            </Tooltip>
            
          </div>
        );
        break;
      case "con":
        component = (
          <Button
            onClick={() => {
              props.sendMessage();
            }}
            variant="outline-primary"
          >
            Send a Message
          </Button>
        );
        break;
      default:
        component = (
          <Button disabled={props.requests <= 0} onClick={props.sendRequest}>
            Request
          </Button>
        );
    }

    return component;
  };

  return renderConnectButton();
}

export default ConnectButton;
