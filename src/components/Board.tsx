import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineClose } from "react-icons/ai";

type TodoType = {
  id: string;
  title: string;
  column: ColumnType;
  sortIndex: number;
};

const columns = {
  incomplete: "Incomplete",
  progress: "In progress",
  completed: "Completed",
  onhold: "Cancelled",
};

type Column = typeof columns;
type ColumnType = keyof Column;

const sampleTodos: TodoType[] = [
  {
    id: uuidv4(),
    title: "Clean room",
    column: "incomplete",
    sortIndex: 1,
  },
  {
    id: uuidv4(),
    title: "Do workout",
    column: "incomplete",
    sortIndex: 2,
  },
];

function Board() {
  // const [todoTitle, setTodoTitle] = useState("");
  const [todos, setTodos] = useState<TodoType[]>(sampleTodos);
  const [editTodoId, setEditTodoId] = useState("");

  const columnMap = Object.keys(columns) as Array<ColumnType>;

  const draggedTodoItem = React.useRef<any>(null);

  const handleColumnDrop = (column: ColumnType) => {
    const index = todos.findIndex(
      (todo) => todo.id === draggedTodoItem.current
    );
    const tempTodos = [...todos];
    tempTodos[index].column = column;
    setTodos(tempTodos);
  };

  const handleAddTask = (column: ColumnType) => {
    const todoPayload: TodoType = {
      id: uuidv4(),
      title: "Task",
      column: column,
      sortIndex: todos.length + 1,
    };
    setTodos([...todos, todoPayload]);
  };

  const handleDeleteTodo = (todoId: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (todoId: string, newTitle: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, title: newTitle };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditTodoId("");
  };

  return (
    <div className="container">
      <h2>Task Management Board</h2>
      <div className="textWrapper">
        {columnMap.map((column) => (
          <div className="column" key={column}>
            <div
              className="columnItems"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleColumnDrop(column)}
            >
              <h5 className="title">{columns[column]}</h5>
              {todos
                .filter((todo) => todo.column === column)
                .map((todo) => (
                  <div
                    key={todo.id}
                    className="taskList"
                    draggable
                    onDragStart={(e) => (draggedTodoItem.current = todo.id)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <input
                      className="editInput"
                      type="text"
                      value={todo.title}
                      onChange={(e) => handleEditTodo(todo.id, e.target.value)}
                      onBlur={(e) => {
                        handleEditTodo(todo.id, e.target.value);
                      }}
                    />
                    <p
                      className="delButton"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <AiOutlineClose />
                    </p>
                  </div>
                ))}
              <button
                className="addButton"
                onClick={() => {
                  handleAddTask(column);
                }}
              >
                + Add Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
