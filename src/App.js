import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    id: uuidv4(),
    title: "",
    status: "progress",
  });
  const [filterOptions, setFilterOption] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onTodoChange = (e) => {
    setTodo({ ...todo, title: e.target.value });
  };
  const onSubmit = (e) => {
    if (isEdit) {
      const updatedTodos = todos?.map((item) => {
        if (item.id === todo.id) {
          item.status = todo.status;
          item.title = todo.title;
        }
        return item;
      });
      setTodos(updatedTodos);
    } else {
      setTodos([...todos, todo]);
    }
    setIsEdit(false);
    setTodo({
      id: uuidv4(),
      title: "",
      status: "progress",
    });
    setIsModalVisible(false);
  };

  const handleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todoItem) => todoItem.id !== id);
    setTodos(updatedTodos);
  };

  const onStatusChange = (status, id) => {
    console.log("statussss", status, id);

    const updatedTodos = todos?.map((item) => {
      if (item.id === id) {
        item.status = "complete";
      }
      return item;
    });
    setTodos(updatedTodos);
  };

  const handleEdit = (todoItem) => {
    setIsEdit(true);
    setTodo({ ...todoItem });
    setIsModalVisible(true);
  };

  const onFilterChange = (option) => {
    const updatedTodos = todos.filter(
      (item) => item.status === option || option === "all"
    );
    setFilterOption(updatedTodos);
  };
  console.log("todosss", todo);
  return (
    <div className="App">
      {isModalVisible && (
        <div className="modal">
          <input
            value={todo?.title}
            onChange={onTodoChange}
            className="input-field"
          />
          <button onClick={onSubmit} disabled={!todo || todo === ""}>
            Submit
          </button>
        </div>
      )}

      <div className="todo">
        <button onClick={handleModal}>Add Todo</button>
      </div>
      <div>
          <select
            name="sort"
            id="sort-select"
            className="filters"
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="complete">Complete</option>
            <option value="progress">Progress</option>
          </select>
        </div>
      <div>
        <table border="1" className="table">
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          {filterOptions && filterOptions?.length > 0
            ? filterOptions?.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>
                    <select
                      name="pets"
                      id="pet-select"
                      value={item.status}
                      onChange={(e) => onStatusChange(e.target.value, item.id)}
                    >
                      <option value="complete">Complete</option>
                      <option value="progress">Progress</option>
                    </select>
                  </td>
                  <td className="table-actions">
                    <button onClick={() => handleEdit(item)}>Edit</button>{" "}
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : todos?.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>
                    <select
                      name="pets"
                      id="pet-select"
                      value={item.status}
                      onChange={(e) => onStatusChange(e.target.value, item.id)}
                    >
                      <option value="complete">Complete</option>
                      <option value="progress">Progress</option>
                    </select>
                  </td>
                  <td className="table-actions">
                    <button onClick={() => handleEdit(item)}>Edit</button>{" "}
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
        </table>
      </div>
    </div>
  );
}

export default App;
