import { useState } from "react";

function TaskItem({ task, onToggle, onRemove, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  const handleSave = () => {
    if (!value.trim()) return;
    onUpdate(task.id, value);
    setEditing(false);
  };

  return (
    <div className="task-item">
      {editing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <span
          onClick={() => onToggle(task.id)}
          onDoubleClick={() => setEditing(true)}
          className={task.completed ? "done" : ""}
        >
          {task.title}
        </span>
      )}

      <button onClick={() => onRemove(task.id)}>X</button>
    </div>
  );
}

export default TaskItem;