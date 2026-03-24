import { useState } from "react";
import '../styles/modal.css'

function AddTaskModal({ onClose, onAdd, suggestions }) {
  const [input, setInput] = useState("");

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Nova tarefa</h2>

        <input
          placeholder="Digite a tarefa..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAdd(input)}
        />

        <button onClick={() => onAdd(input)}>Adicionar</button>

        <h3>Sugestões</h3>
        <div className="suggestions">
          {suggestions.slice(0, 5).map(s => (
            <div
              key={s.id}
              className="suggestion"
              onClick={() => onAdd(s.title)}
            >
              {s.title}
            </div>
          ))}
        </div>

        <button className="close" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default AddTaskModal;