function TaskItem({ task, onToggle, onRemove, onEdit }) {
  return (
    <div className="task-item">
      <div className="task-content">
        <span
          onClick={() => onToggle(task.id)}
          className={task.completed ? "done" : ""}
        >
          {task.title}
        </span>

        <small>{task.description}</small>

        <div className="task-meta">
          <span>{task.status}</span>
          <span>{task.dueDate}</span>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={() => onEdit(task)}>Editar</button>
        <button onClick={() => onRemove(task.id)}>Excluir</button>
      </div>
    </div>
  );
}

export default TaskItem;