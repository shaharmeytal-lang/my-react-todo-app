import { useState } from 'react'

// AddTodo: controlled input form that notifies parent via `onAdd`.
// Keeps local input state to avoid lifting every keystroke.
export default function AddTodo({ onAdd }) {
  const [text, setText] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text)
    setText('')
  }

  return (
    <form className="add-todo" onSubmit={submit}>
      <input
        aria-label="Add todo"
        placeholder="Add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}
