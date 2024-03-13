import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

const ToDoForm = ({ todos, setTodos }) => {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please provide a valid value for todo");
      return;
    }

    try {
      const res = await axios.post("/api/todos/", { name: name });
      setName("");
      const { data } = res;
      setTodos([...todos, data]);
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-4">
        <FormControl
          placeholder="New Todo"
          onChange={handleChange}
          value={name}
        />
        <Button type="submit">Add</Button>
      </InputGroup>
    </Form>
  );
};

export default ToDoForm;
