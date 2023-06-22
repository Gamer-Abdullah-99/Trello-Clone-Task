import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./Board.css";
import { db, ref, signOut, auth, onValue } from "../Fire";
import { useNavigate } from "react-router-dom";
import {
  handleColumnDrop,
  handleAddCard,
  handleDeleteCard,
  handleEditTitle,
  handleAddTask,
  handleDeleteTask,
  handleEditTask,
  handleLogout,
} from "../functions/Firebase Utilities";
import { TodoType, titleObj, ColumnType, BoardProps } from "../types";

function Board({ user, setUser }: BoardProps) {
  useEffect(() => {
    const DbRef = ref(db, user + "/");
    onValue(DbRef, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setCardTitle(data.CardTitle);
        setTodos(data.Tasks);
      } else {
        console.log("No data available");
      }
    });
  }, []);

  const navigate = useNavigate();

  const [cardTitle, setCardTitle] = useState<titleObj>({});

  const [todos, setTodos] = useState<TodoType[]>([]);

  const columnMap = Object.keys(cardTitle) as Array<ColumnType>;

  const draggedTodoItem = React.useRef<any>(null);

  return (
    <div className="board-container">
      <h2>Task Management Board</h2>
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
                  <div
                    key={todo.id}
                    className="board-taskList"
                    draggable
                    onDragStart={(e) => (draggedTodoItem.current = todo.id)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <input
                      className="board-editInput"
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
                      className="board-delButton"
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
}

export default Board;
