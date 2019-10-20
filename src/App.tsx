import logo from "./logo.svg";
import "./App.css";
import Timer from './components/Timer'

import React, { Fragment, useState } from "react";
type FormElem = React.FormEvent<HTMLFormElement>;
interface ITodo {
  text: string;
  complete: boolean;
}

export default function App(): JSX.Element {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const completTodos = (index: number): void => {
    const newTodos = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };
  return (
    <Fragment>
      <h1>Todo list</h1>
      <Timer/>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type="submit">Add todo</button>
      </form>
      <section>
        {todos.map((todo: ITodo, index: number) => (
          <Fragment key={index}>
            <div
              style={{ textDecoration: todo.complete ? "line-through" : "" }}
            >
              {todo.text}
            </div>
            <button onClick={() => completTodos(index)}>
              {todo.complete ? "incomplete" : "complete"}
            </button>
            <button type="button" onClick={() => removeTodo(index)}>
              &times;
            </button>
          </Fragment>
        ))}
      </section>
    </Fragment>
  );
}
