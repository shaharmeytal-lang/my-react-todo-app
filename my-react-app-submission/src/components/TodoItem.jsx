import { useState } from 'react'

// TodoItem: encapsulates a single todo row. Supports toggle, inline edit and delete.
// Keeps `isEditing` local so parent remains the single source of truth for data.
export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(todo.text)

  const save = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onEdit(todo.id, trimmed)
    setIsEditing(false)
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label>
        <input aria-label={`Toggle ${todo.text}`} type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
      </label>
      {!isEditing ? (
        <>
          <span className="text" onDoubleClick={() => setIsEditing(true)}>{todo.text}</span>
          <div className="actions">
            <button type="button" aria-label={`Edit ${todo.text}`} onClick={() => setIsEditing(true)}>Edit</button>
            <button type="button" aria-label={`Delete ${todo.text}`} onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        </>
      ) : (
        <form className="edit-form" onSubmit={save}>
          <input value={text} onChange={(e) => setText(e.target.value)} aria-label={`Edit text for ${todo.text}`} />
          <button type="submit">Save</button>
          <button type="button" onClick={() => { setIsEditing(false); setText(todo.text); }}>Cancel</button>
        </form>
      )}
    </div>
  )
}
