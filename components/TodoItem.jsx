"use client";
import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const save = () => {
    const value = text.trim();
    if (!value) {
      setText(todo.text);
      setIsEditing(false);
      return;
    }
    onEdit(todo.id, value);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label="Toggle complete"
      />

      {isEditing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => e.key === "Enter" && save()}
          autoFocus
          aria-label="Edit task"
        />
      ) : (
        <span className="text" onDoubleClick={() => setIsEditing(true)}>
          {todo.text}
        </span>
      )}

      <div className="actions">
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} aria-label="Edit">
            Edit
          </button>
        )}
        <button onClick={() => onDelete(todo.id)} aria-label="Delete">
          ✕
        </button>
      </div>
    </li>
  );
}
