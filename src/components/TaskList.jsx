import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onRemove, onUpdate }) {
  if (!tasks.length) {
    return <p className="empty">Nenhuma tarefa encontrada</p>;
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default TaskList;