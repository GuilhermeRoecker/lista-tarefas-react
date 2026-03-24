import { useState } from "react";
import TaskList from "./components/TaskList";
import AddTaskModal from "./components/AddTaskModal";
import { useTasks } from "./hooks/useTasks";

function App() {
  const {
    tasks,
    suggestions,
    loading,
    addTask,
    updateTask,
    toggleTask,
    removeTask
  } = useTasks();

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const filteredTasks = tasks
    .filter(t => {
      if (filter === "active") return !t.completed;
      if (filter === "done") return t.completed;
      return true;
    })
    .filter(t =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>

      <div className="topbar">
        <input
          placeholder="Buscar tarefa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Todas</option>
          <option value="active">Pendentes</option>
          <option value="done">Concluídas</option>
        </select>

        <button onClick={() => setOpenModal(true)}>
          + Nova tarefa
        </button>
      </div>

      <p className="counter">{tasks.length} tarefas</p>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onRemove={removeTask}
          onUpdate={updateTask}
        />
      )}

      {openModal && (
        <AddTaskModal
          onClose={() => setOpenModal(false)}
          onAdd={addTask}
          suggestions={suggestions}
        />
      )}
    </div>
  );
}

export default App;