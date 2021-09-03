import React from "react";

import { Button } from "react-bootstrap";

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
            <Button onClick={props.undoRequest}>Requested</Button>
          </div>
        );
        break;
      case "con":
        component = <div>Connected!</div>;
        break;
      default:
        component = <Button onClick={props.sendRequest}>Request</Button>;
    }

    return component;
  };

  return renderConnectButton();
}

export default ConnectButton;
