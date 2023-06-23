import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import {
  handleColumnDrop,
  handleAddCard,
  handleDeleteCard,
  handleEditTitle,
  handleAddTask,
  handleLogout,
} from "../../../functions/Firebase Utilities";
import { BoardCardProps } from "../../../functions/types";
import Task from "../Tasks/Tasks";

const Card: React.FC<BoardCardProps> = ({
  columnMap,
  user,
  setUser,
  draggedTodoItem,
  todos,
  setTodos,
  cardTitle,
  setCardTitle,
}) => {
  const navigate = useNavigate();
  return (
    <div className="cards-container">
      <div className="board-textWrapper">
        {columnMap.map((column) => (
          <div className="board-column" key={column}>
            <div
              className="board-columnItems"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) =>
                handleColumnDrop({
                  column,
                  user,
                  draggedTodoItem,
                  todos,
                  setTodos,
                })
              }
            >
              <span className="title-span">
                <input
                  className="board-title"
                  type="text"
                  value={cardTitle[column]}
                  onChange={(e) => {
                    handleEditTitle({
                      column,
                      newTitle: e.target.value,
                      user,
                      cardTitle,
                      setCardTitle,
                    });
                  }}
                  onBlur={(e) => {
                    handleEditTitle({
                      column,
                      newTitle: e.target.value,
                      user,
                      cardTitle,
                      setCardTitle,
                    });
                  }}
                />
                <p
                  className="board-delButton"
                  onClick={() =>
                    handleDeleteCard({
                      column,
                      user,
                      todos,
                      cardTitle,
                      setCardTitle,
                      setTodos,
                    })
                  }
                >
                  <AiOutlineClose />
                </p>
              </span>
              {todos
                .filter((todo) => todo.column === column)
                .map((todo) => (
                  <Task
                    key={todo.id}
                    todo={todo}
                    draggedTodoItem={draggedTodoItem}
                    user={user}
                    todos={todos}
                    setTodos={setTodos}
                  />
                ))}
              <button
                className="board-addButton"
                onClick={() => {
                  handleAddTask({ column, user, todos, setTodos });
                }}
              >
                + Add Task
              </button>
            </div>
          </div>
        ))}
        <button
          className="board-addCard"
          onClick={() => handleAddCard({ user, cardTitle, setCardTitle })}
        >
          + Add Card
        </button>
      </div>
      <button
        className="logout-btn"
        onClick={() => handleLogout({ setUser, navigate })}
      >
        Logout
      </button>
    </div>
  );
};

export default Card;
