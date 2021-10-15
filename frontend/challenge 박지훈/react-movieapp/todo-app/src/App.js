import React, { useReducer, useState, useRef, useCallback } from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  const onRemove = useCallback((id) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  // 고유값을 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(2501);

  const onToggle = useCallback((id) => {
    dispatch({ type: "TOGGLE", id });
  }, []);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ type: "INSERT", todo });

    nextId.current += 1; // nextId 1씩 더하기
  }, []);
  function createBulkTodos() {
    const array = [];
    for (let i = 1; i <= 2500; i++) {
      array.push({
        id: i,
        text: `할일 ${i}`,
        checked: false,
      });
    }
    return array;
  }
  function todoReducer(todos, action) {
    switch (action.type) {
      case "INSERT": //새로추가
        //{ type: 'INSERT', todo:{ id:1, next: 'todo', checked: false}}
        return todos.concat(action.todo);
      case "REMOVE": //제거
        // { type: 'REMOVE', id:1}
        return todos.filter((todo) => todo.id !== action.id);
      case "TOGGLE": //토글
        // { type: 'REMOVE', id:1}
        return todos.map((todo) =>
          todo.id === action.id ? { ...todo, checked: !todo.checked } : todo
        );
      default:
        return todos;
    }
  }

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
