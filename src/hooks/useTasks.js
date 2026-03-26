import { useEffect, useState } from "react";

const API = "/api/tasks";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    const newTask = await res.json();
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = async (id, updatedFields) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });

    const updated = await res.json();

    setTasks(prev =>
      prev.map(t => (t.id === id ? updated : t))
    );
  };

  const toggleTask = async (id) => {
    const res = await fetch(`${API}/${id}/toggle`, {
      method: "PATCH",
    });

    const updated = await res.json();

    setTasks(prev =>
      prev.map(t => (t.id === id ? updated : t))
    );
  };

  const removeTask = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    toggleTask,
    removeTask,
  };
}