import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import TaskItem from "./components/TaskItem";
import TooltipButton from "./components/TooltipButton";
import { FaPlus } from "react-icons/fa";

function App() {
  const savedTasks = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  const [tasks, setTasks] = useState(savedTasks);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const addTask = () => {
    let currentTasks = [...tasks];
    currentTasks.push({ value, completed: false });

    setTasks(currentTasks);
    localStorage.setItem("tasks", JSON.stringify(currentTasks));
    setValue("");
  };

  const completeTask = ({ index, complete }) => {
    let currentTasks = [...tasks];
    currentTasks[index].completed = complete;
    setTasks(currentTasks);
  };

  const removeTask = (index) => {
    let currentTasks = [...tasks];
    currentTasks.splice(index, 1);
    setTasks(currentTasks);
    localStorage.setItem("tasks", JSON.stringify(currentTasks));
  };

  return (
    <Container className="app">
      <Row>
        <Col>
          <Card>
            <Card.Header>TODO APP</Card.Header>

            <Card.Body>
              {tasks.map((task, index) => {
                return (
                  <TaskItem
                    key={index}
                    item={task}
                    onRemove={() => removeTask(index)}
                    onReset={() => completeTask({ index, complete: false })}
                    onComplete={() => completeTask({ index, complete: true })}
                  />
                );
              })}
            </Card.Body>
            <Card.Footer>
              <Row>
                <Col xs="9">
                  <input
                    className="form-control"
                    value={value}
                    placeholder="Write your task here!"
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
                <Col xs="3" className="task--buttons">
                  <TooltipButton
                    variant="outline-primary"
                    onClick={() => addTask()}
                    tooltip="Add"
                    disabled={!value}
                  >
                    <FaPlus />
                  </TooltipButton>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
