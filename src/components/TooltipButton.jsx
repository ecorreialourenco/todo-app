import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const TooltipButton = ({
  tooltip,
  onClick,
  variant,
  children,
  disabled,
  ...other
}) => (
  <OverlayTrigger placement="bottom" overlay={<Tooltip>{tooltip}</Tooltip>}>
    <div>
      <Button
        variant={variant}
        onClick={onClick}
        disabled={disabled}
        size="sm"
        {...other}
      >
        {children}
      </Button>
    </div>
  </OverlayTrigger>
);

export default TooltipButton;
