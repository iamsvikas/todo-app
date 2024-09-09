import { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

function App() {
  const [todo, setTodo] = useState("");
  const [todoArr, setTodoArr] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirm, setConfirm] = useState(false);

  const handleTodo = (e) => {
    setTodo(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;
    if (editingId) {
      setTodoArr((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, title: todo } : item
        )
      );
      setEditingId(null);
    } else
      setTodoArr((prev) => [
        ...prev,
        { id: Date.now(), title: todo, status: "pending" },
      ]);
    setTodo("");
  };

  const handleDelete = (id) => {
    setConfirm(true);
    setDeletingId(id);
  };

  const deleteConfirm = () => {
    setTodoArr((prev) => prev.filter((item) => item.id !== deletingId));
    setConfirm(false);
    setDeletingId(null);
  };

  const cancelConfirm = () => {
    setConfirm(false);
    setDeletingId(null);
  };

  const handleEdit = (id) => {
    const selectedTodo = todoArr.find((item) => item.id === id);
    console.log(selectedTodo);
    if (selectedTodo) {
      setTodo(selectedTodo.title);
      setEditingId(id);
    }
  };

  const handleStatus = (id) => {
    setTodoArr((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "active" ? "pending" : "active" }
          : item
      )
    );
  };
  return (
    <>
      <Modal
        confirm={confirm}
        onDelete={deleteConfirm}
        onCancel={cancelConfirm}
      />
      <div className="appContainer">
        <h1 className="title">Simran's Todo App</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Plan your Day Here"
            value={todo}
            onChange={(e) => handleTodo(e)}
            className="inputTodo"
          />
          <button
            type="submit"
            className={editingId ? "edit todoButton" : "add todoButton"}
          >
            {`${editingId ? "Edit" : "Add"} Todo`}
          </button>
        </form>
        <ul className="listItems">
          {todoArr?.map((item) => (
            <div key={item.id} className="listItemContainer">
              <li
                className={`listItem ${
                  item.status === "active" ? "completed" : ""
                }`}
              >
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={item.status === "active"}
                  onChange={() => handleStatus(item.id)}
                />
                <p>{item.title}</p>
              </li>
              <div className="iconContainer">
                <FontAwesomeIcon
                  icon={faEdit}
                  color="blue"
                  onClick={() => handleEdit(item.id)}
                  className="icon"
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  color="red"
                  onClick={() => handleDelete(item.id)}
                  className="icon"
                />
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
