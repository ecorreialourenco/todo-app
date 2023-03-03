import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import TooltipButton from "./TooltipButton";
import { FaTrashAlt, FaRecycle, FaCheck } from "react-icons/fa";

const TaskItem = ({ item, onRemove, onComplete, onReset }) => (
  <Row className="task--item">
    <Col xs="7">
      <span className={`task ${item.completed ? "task--completed" : ""}`}>
        {item.value}
      </span>
    </Col>
    <Col xs="5" className="task--buttons">
      {item.completed ? (
        <Fragment>
          <TooltipButton
            variant="outline-danger"
            onClick={onRemove}
            tooltip="Remove"
          >
            <FaTrashAlt />
          </TooltipButton>
          <TooltipButton
            className="task--margin"
            variant="outline-warning"
            onClick={onReset}
            tooltip="Reset"
          >
            <FaRecycle />
          </TooltipButton>
        </Fragment>
      ) : (
        <TooltipButton
          variant="outline-success"
          onClick={onComplete}
          tooltip="Complete"
        >
          <FaCheck />
        </TooltipButton>
      )}
    </Col>
  </Row>
);

export default TaskItem;
