import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

function TooltipButton(props) {
  const { tooltip, onClick, variant, children, ...other } = props;

  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip>{tooltip}</Tooltip>}>
      <Button variant={variant} onClick={onClick} {...other} size="sm">
        {children}
      </Button>
    </OverlayTrigger>
  );
}

export default TooltipButton;
