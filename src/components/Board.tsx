import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineClose } from "react-icons/ai";
import "./Board.css";
import {
  set,
  dbRef,
  db,
  get,
  child,
  ref,
  signOut,
  auth,
  // dataRef,
  onValue,
} from "../Fire";
import { useNavigate } from "react-router-dom";

function Board({
  user,
  setUser,
}: {
  user: string;
  setUser: (uid: string) => void;
}) {
  const navigate = useNavigate();

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

  type titleObj = { [key: string]: string };
  const [cardTitle, setCardTitle] = useState<titleObj>({});

  type TodoType = {
    id: number | string;
    title: string;
    column: ColumnType;
    sortIndex: number;
  };

  type Column = typeof cardTitle;
  type ColumnType = keyof Column;

  const [todos, setTodos] = useState<TodoType[]>([]);

  const columnMap = Object.keys(cardTitle) as Array<ColumnType>;

  const draggedTodoItem = React.useRef<any>(null);

  const logout = (): void => {
    signOut(auth)
      .then(() => {
        setUser("");
      })
      .catch((error) => {
        console.error(error);
      });
    navigate("/login");
  };

  const handleColumnDrop = (column: ColumnType) => {
    const index = todos.findIndex(
      (todo) => todo.id === draggedTodoItem.current
    );
    const tempTodos = [...todos];
    tempTodos[index].column = column;

    set(ref(db, user + "/Tasks"), tempTodos)
      .then(() => {
        setTodos(tempTodos);
      })
      .catch((error) => {
        console.error(error);
      });

    // let data = dataRef.ref(user + "/Tasks");
    // console.log(data);
  };

  const handleAddCard = () => {
    const updatedCardTitle = {
      ...cardTitle,
      ["title" + uuidv4()]: "Title",
    };
    set(ref(db, user + "/CardTitle"), updatedCardTitle)
      .then(() => {
        setCardTitle(updatedCardTitle);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteCard = (cardKey: string | number) => {
    const updatedCardTitle = { ...cardTitle };
    delete updatedCardTitle[cardKey];

    const updatedTasks = todos.filter((todo) => todo.column !== cardKey);

    set(ref(db, user + "/CardTitle"), updatedCardTitle)
      .then(() => {
        setCardTitle(updatedCardTitle);
        set(ref(db, user + "/Tasks"), updatedTasks)
          .then(() => {
            setTodos(updatedTasks);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditTitle = (titleKey: string | number, newTitle: string) => {
    const newCardTitle = { ...cardTitle };
    newCardTitle[titleKey] = newTitle;
    set(ref(db, user + "/CardTitle"), newCardTitle)
      .then(() => {
        setCardTitle(newCardTitle);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddTask = (column: ColumnType) => {
    const newTodo: TodoType = {
      id: uuidv4(),
      title: "Task",
      column: column,
      sortIndex: todos.length + 1,
    };
    const updatedTasks = [...todos, newTodo];
    set(ref(db, user + "/Tasks"), updatedTasks)
      .then(() => {
        setTodos(updatedTasks);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteTodo = (todoId: string | number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    set(ref(db, user + "/Tasks"), updatedTodos)
      .then(() => {
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditTodo = (todoId: string | number, newTitle: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, title: newTitle };
      }
      return todo;
    });
    set(ref(db, user + "/Tasks"), updatedTodos)
      .then(() => {
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error(error);
      });
    // setTodos(updatedTodos);
  };

  return (
    <div className="board-container">
      <h2>Task Management Board</h2>
      <div className="board-textWrapper">
        {columnMap.map((column) => (
          <div className="board-column" key={column}>
            <div
              className="board-columnItems"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleColumnDrop(column)}
            >
              <span className="title-span">
                <input
                  className="board-title"
                  type="text"
                  value={cardTitle[column]}
                  onChange={(e) => {
                    handleEditTitle(column, e.target.value);
                  }}
                  onBlur={(e) => {
                    handleEditTitle(column, e.target.value);
                  }}
                />
                <p
                  className="board-delButton"
                  onClick={() => handleDeleteCard(column)}
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
                      onChange={(e) => handleEditTodo(todo.id, e.target.value)}
                      onBlur={(e) => {
                        handleEditTodo(todo.id, e.target.value);
                      }}
                    />
                    <p
                      className="board-delButton"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <AiOutlineClose />
                    </p>
                  </div>
                ))}
              <button
                className="board-addButton"
                onClick={() => {
                  handleAddTask(column);
                }}
              >
                + Add Task
              </button>
            </div>
          </div>
        ))}
        <button className="board-addCard" onClick={handleAddCard}>
          + Add Card
        </button>
      </div>
      <button className="logout-btn" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}

export default Board;
