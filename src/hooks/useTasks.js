import { useEffect, useState } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // carregar dados
  useEffect(() => {
    const saved = localStorage.getItem("tasks");

    fetch("https://jsonplaceholder.typicode.com/todos?_limit=8")
      .then(res => res.json())
      .then(data => {
        setSuggestions(data);

        if (!saved) {
          setTasks(data.slice(0, 3));
        }
      })
      .finally(() => setLoading(false));

    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // persistência
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // adicionar (com validação)
  const addTask = (title) => {
    const clean = title.trim();
    if (!clean) return;

    // ❗ evitar duplicadas
    if (tasks.some(t => t.title.toLowerCase() === clean.toLowerCase())) {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: clean,
      completed: false
    };

    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id, newTitle) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, title: newTitle } : t
      )
    );
  };

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const removeTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return {
    tasks,
    suggestions,
    loading,
    addTask,
    updateTask,
    toggleTask,
    removeTask
  };
}