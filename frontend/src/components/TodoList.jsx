import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdDelete,
  MdEdit,
} from "react-icons/md";

const ToDoList = ({ todos = [], setTodos }) => {
  const [show, setShow] = useState(false);
  const [record, setRecord] = useState(null);

  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}/`);
      const newTodos = todos.filter((t) => t.id !== id);
      setTodos(newTodos);
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  };

  const handleUpdate = async (id, value) => {
    try {
      const res = await axios.patch(`/api/todos/${id}/`, value);
      const { data } = res;
      const newTodos = todos.map((t) => (t.id === id ? data : t));
      setTodos(newTodos);
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  };

  const renderListGroupItem = (t) => {
    return (
      <ListGroup.Item
        key={t.id}
        className="d-flex justify-content-between align-items-center"
      >
        <div className="d-flex justify-content-center">
          <span
            style={{
              marginRight: "12px",
              cursor: "pointer",
            }}
            onClick={() => {
              handleUpdate(t.id, {
                completed: !t.completed,
              });
            }}
          >
            {t.completed === true ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          </span>
          <span>{t.name}</span>
        </div>
        <div>
          <MdEdit
            style={{
              cursor: "pointer",
              marginRight: "12px",
            }}
            onClick={() => {
              setRecord(t);
              setShow(true);
            }}
          />
          <MdDelete
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              handleDelete(t.id);
            }}
          />
        </div>
      </ListGroup.Item>
    );
  };

  const handleChange = (e) => {
    setRecord({
      ...record,
      name: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    await handleUpdate(record.id, { name: record.name });
    handleClose();
  };

  const completedToDos = todos.filter((t) => t.completed === true);
  const incompleteToDos = todos.filter((t) => t.completed === false);

  return (
    <div>
      <div className="mb-2 mt-4">
        Incomplete To-Dos ({incompleteToDos.length})
      </div>
      <ListGroup>{incompleteToDos.map(renderListGroupItem)}</ListGroup>
      <div className="mb-2 mt-4">Completed To-Dos ({completedToDos.length})</div>
      <ListGroup>{completedToDos.map(renderListGroupItem)}</ListGroup>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit To-Do</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            value={record ? record.name : ""}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ToDoList;
