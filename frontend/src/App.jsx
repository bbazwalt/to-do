import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import ToDoForm from "./components/ToDoForm";
import ToDoList from "./components/ToDoList";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("/api/todos/")
      .then((res) => {
        setTodos(res.data);
      })
      .catch(() => {
        alert("Something went wrong");
      });
  }, []);

  return (
    <div>
      <Navbar bg="light" style={{ marginBottom: "20px" }}>
        <Container>
          <Navbar.Brand href="#">To-Do</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <ToDoForm todos={todos} setTodos={setTodos} />
        <ToDoList todos={todos} setTodos={setTodos} />
      </Container>
    </div>
  );
};

export default App;
