import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  handleDeleteTask,
  handleEditTask,
} from "../../../functions/Firebase Utilities";
import { BoardTaskProps } from "../../../functions/types";
import "./Tasks.css";

const Task: React.FC<BoardTaskProps> = ({
  todo,
  draggedTodoItem,
  user,
  todos,
  setTodos,
}) => {
  return (
    <div
      key={todo.id}
      className="board-taskList"
      draggable
      onDragStart={(e) => (draggedTodoItem.current = todo.id)}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        className="task-editInput"
        type="text"
        value={todo.title}
        onChange={(e) =>
          handleEditTask({
            todoId: todo.id,
            newTitle: e.target.value,
            user,
            todos,
            setTodos,
          })
        }
        onBlur={(e) => {
          handleEditTask({
            todoId: todo.id,
            newTitle: e.target.value,
            user,
            todos,
            setTodos,
          });
        }}
      />
      <p
        className="task-delButton"
        onClick={() =>
          handleDeleteTask({
            todoId: todo.id,
            user,
            todos,
            setTodos,
          })
        }
      >
        <AiOutlineClose />
      </p>
    </div>
  );
};

export default Task;
