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
  draggedTodoItem: any;
  todos: TodoType[];
  setTodos: any;
}

interface AddCard {
  user: string;
  cardTitle: { [key: string]: string };
  setCardTitle: any;
}

interface DelCard {
  column: string | number;
  user: string;
  todos: TodoType[];
  cardTitle: { [key: string]: string };
  setCardTitle: any;
  setTodos: any;
}

interface EditTitle {
  column: string | number;
  newTitle: string;
  user: string;
  cardTitle: { [key: string]: string };
  setCardTitle: any;
}

interface AddTask {
  column: ColumnType;
  user: string;
  todos: TodoType[];
  setTodos: any;
}

interface DelTask {
  todoId: string | number;
  user: string;
  todos: TodoType[];
  setTodos: any;
}

interface EditTask {
  todoId: string | number;
  newTitle: string;
  user: string;
  todos: TodoType[];
  setTodos: any;
}

interface Login {
  email: string;
  password: string;
  navigate: any;
  setUser: (uid: string) => void;
}

interface Logout {
  setUser: (uid: string) => void;
  navigate: any;
}

interface LoginProps {
  setUser: (uid: string) => void;
}

interface BoardProps {
  user: string;
  setUser: (uid: string) => void;
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
};
