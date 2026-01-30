import TodoItem from './TodoItem'

// TodoList: presentational wrapper that renders a list of `TodoItem`.
// Receives callbacks from parent and forwards them down.
export default function TodoList({ todos, onToggle, onEdit, onDelete }) {
  if (!todos || todos.length === 0) return <p className="empty">No tasks</p>

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem todo={todo} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  )
}
