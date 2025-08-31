"use client";
import React, { useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const FILTERS = {
  all: () => true,
  active: (t) => !t.completed,
  completed: (t) => t.completed,
};

export default function TodoApp() {
  const [todos, setTodos, ready] = useLocalStorage("todos", []);
  const [filter, setFilter] = useState("all");

  const addTodo = (text) =>
    setTodos((prev) => [...prev, { id: createId(), text, completed: false }]);

  const toggleTodo = (id) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const deleteTodo = (id) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  const editTodo = (id, newText) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );

  const clearCompleted = () =>
    setTodos((prev) => prev.filter((t) => !t.completed));

  const filtered = useMemo(() => todos.filter(FILTERS[filter]), [todos, filter]);
  const remaining = todos.filter((t) => !t.completed).length;

  if (!ready) return <p className="loading">Loading…</p>;

  return (
    <div className="container">
      <TodoInput onAdd={addTodo} />
      <div className="toolbar">
        <div className="filters">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="meta">
          <span>{remaining} left</span>
          <br></br>
          <button onClick={clearCompleted}>Clear completed</button>
        </div>
      </div>
      <TodoList
        todos={filtered}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  );
}
