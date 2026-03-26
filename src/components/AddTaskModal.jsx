import { useState, useEffect } from "react";
import "../styles/modal.css";

const STATUS_OPTIONS = [
  "aberto",
  "aguardando encaminhamento",
  "em análise",
  "aguardando informações",
  "concluído - aguardando atualização",
  "concluído - atualizado",
  "encerrado",
  "cancelado",
  "pendente",
  "finalizado",
];

function AddTaskModal({ onClose, onAdd, onUpdate, task }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("aberto");
  const [errors, setErrors] = useState({}); // ✅ faltava isso

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setDueDate(task.dueDate || "");
      setStatus(task.status || "aberto");
    }
  }, [task]);

  const handleSubmit = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Título é obrigatório";
    }

    if (!dueDate) {
      newErrors.dueDate = "Informe uma data";
    } else if (new Date(dueDate) <= new Date()) {
      newErrors.dueDate = "A data deve ser futura";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (task) {
      onUpdate(task.id, { title, description, dueDate, status });
    } else {
      onAdd({ title, description, dueDate, status });
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{task ? "Editar tarefa" : "Nova tarefa"}</h2>

        <div className="form-group">
          <label>Título</label>
          <input
            placeholder="Digite o título..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <span className="error">{errors.title}</span>
          )}
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <textarea
            placeholder="Descrição da tarefa..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Data prevista</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          {errors.dueDate && (
            <span className="error">{errors.dueDate}</span>
          )}
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-actions">
          <button onClick={handleSubmit}>
            {task ? "Salvar" : "Adicionar"}
          </button>

          <button className="secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;