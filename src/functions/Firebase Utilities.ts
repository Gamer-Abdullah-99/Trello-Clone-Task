import React from "react";
import {
  set,
  ref,
  db,
  signOut,
  auth,
  signInWithEmailAndPassword,
} from "../Fire";
import { v4 as uuidv4 } from "uuid";
import {
  TodoType,
  // ColumnType,
  ColDrop,
  AddCard,
  DelCard,
  EditTitle,
  AddTask,
  DelTask,
  EditTask,
  Login,
  Logout,
} from "../types";

//User Functions

const handleLogin = ({ email, password, navigate, setUser }: Login) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setUser(user.uid);
      navigate("/task-board");

      // set(ref(db, user.uid + "/CardTitle"), {
      //   title1234: "Sunday",
      //   title2124: "Monday",
      //   title3623: "Tuesday",
      // });

      // set(ref(db, user.uid + "/Tasks"), [
      //   {
      //     id: 12412412412,
      //     title: "Clean room",
      //     column: "title3623",
      //     sortIndex: 1,
      //   },
      //   {
      //     id: 141414124144,
      //     title: "Do workout",
      //     column: "title2124",
      //     sortIndex: 2,
      //   },
      // ]);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

const handleLogout = ({ setUser, navigate }: Logout): void => {
  signOut(auth)
    .then(() => {
      setUser("");
    })
    .catch((error) => {
      console.error(error);
    });
  navigate("/login");
};

//Todo Drag & Drop Function

const handleColumnDrop = ({
  column,
  user,
  draggedTodoItem,
  todos,
  setTodos,
}: ColDrop) => {
  const index = todos.findIndex((todo) => todo.id === draggedTodoItem.current);
  const tempTodos = [...todos];
  tempTodos[index].column = column;

  set(ref(db, user + "/Tasks"), tempTodos)
    .then(() => {
      setTodos(tempTodos);
    })
    .catch((error) => {
      console.error(error);
    });
};

//Card Functions

const handleAddCard = ({ user, cardTitle, setCardTitle }: AddCard) => {
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

const handleDeleteCard = ({
  column,
  user,
  todos,
  cardTitle,
  setCardTitle,
  setTodos,
}: DelCard) => {
  const updatedCardTitle = { ...cardTitle };
  delete updatedCardTitle[column];
  const updatedTasks = todos.filter((todo) => todo.column !== column);

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

const handleEditTitle = ({
  column,
  newTitle,
  user,
  cardTitle,
  setCardTitle,
}: EditTitle) => {
  const newCardTitle = { ...cardTitle };
  newCardTitle[column] = newTitle;
  set(ref(db, user + "/CardTitle"), newCardTitle)
    .then(() => {
      setCardTitle(newCardTitle);
    })
    .catch((error) => {
      console.error(error);
    });
};

//Tasks Function

const handleAddTask = ({ column, user, todos, setTodos }: AddTask) => {
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

const handleDeleteTask = ({ todoId, user, todos, setTodos }: DelTask) => {
  const updatedTodos = todos.filter((todo) => todo.id !== todoId);
  set(ref(db, user + "/Tasks"), updatedTodos)
    .then(() => {
      setTodos(updatedTodos);
    })
    .catch((error) => {
      console.error(error);
    });
};

const handleEditTask = ({
  todoId,
  newTitle,
  user,
  todos,
  setTodos,
}: EditTask) => {
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
};

//User Functions

export { handleLogin, handleLogout };

//Todo Drag & Drop Function

export { handleColumnDrop };

//Card Function

export { handleAddCard, handleDeleteCard, handleEditTitle };

//Tasks Function

export { handleAddTask, handleDeleteTask, handleEditTask };
