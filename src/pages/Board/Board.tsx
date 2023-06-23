import React, { useEffect, useState } from "react";
import "./Board.css";
import { db, ref, onValue } from "../../functions/Fire";
import {
  TodoType,
  titleObj,
  ColumnType,
  BoardProps,
} from "../../functions/types";
import Card from "../../components/_Board/Card/Card";

const Board: React.FC<BoardProps> = ({ user, setUser }) => {
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

  const [cardTitle, setCardTitle] = useState<titleObj>({});

  const [todos, setTodos] = useState<TodoType[]>([]);

  const columnMap = Object.keys(cardTitle) as Array<ColumnType>;

  const draggedTodoItem = React.useRef<any>(null);

  return (
    <div className="board-container">
      <h2>Task Management Board</h2>
      <Card
        columnMap={columnMap}
        user={user}
        setUser={setUser}
        draggedTodoItem={draggedTodoItem}
        todos={todos}
        setTodos={setTodos}
        cardTitle={cardTitle}
        setCardTitle={setCardTitle}
      />
    </div>
  );
};

export default Board;
