import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";

type titleObj = { [key: string]: string };

type TodoType = {
  id: number | string;
  title: string;
  column: ColumnType;
  sortIndex: number;
};

type Column = titleObj;
type ColumnType = keyof Column;

interface ColDrop {
  column: ColumnType;
  user: string;
  draggedTodoItem: MutableRefObject<any>;
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}

interface AddCard {
  user: string;
  cardTitle: titleObj;
  setCardTitle: Dispatch<SetStateAction<titleObj>>;
}

interface DelCard {
  column: string | number;
  user: string;
  todos: TodoType[];
  cardTitle: titleObj;
  setCardTitle: Dispatch<SetStateAction<titleObj>>;
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}

interface EditTitle {
  column: string | number;
  newTitle: string;
  user: string;
  cardTitle: titleObj;
  setCardTitle: Dispatch<SetStateAction<titleObj>>;
}

interface AddTask {
  column: ColumnType;
  user: string;
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}

interface DelTask {
  todoId: string | number;
  user: string;
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}

interface EditTask {
  todoId: string | number;
  newTitle: string;
  user: string;
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}

interface Login {
  email: string;
  password: string;
  navigate: NavigateFunction;
  setUser: (uid: string) => void;
}

interface Logout {
  setUser: (uid: string) => void;
  navigate: NavigateFunction;
}

interface LoginProps {
  setUser: (uid: string) => void;
}

interface BoardProps {
  user: string;
  setUser: (uid: string) => void;
}

interface LoginHeroProps {
  setUser: (uid: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

interface BoardCardProps {
  columnMap: (string | number)[];
  user: string;
  setUser: (uid: string) => void;
  draggedTodoItem: MutableRefObject<any>;
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
  cardTitle: titleObj;
  setCardTitle: Dispatch<SetStateAction<titleObj>>;
}

interface BoardTaskProps {
  todo: TodoType;
  draggedTodoItem: MutableRefObject<any>;
  user: string;
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}

export type {
  titleObj,
  TodoType,
  Column,
  ColumnType,
  ColDrop,
  AddCard,
  DelCard,
  EditTitle,
  AddTask,
  DelTask,
  EditTask,
  Login,
  Logout,
  LoginProps,
  BoardProps,
  LoginHeroProps,
  BoardCardProps,
  BoardTaskProps,
};
