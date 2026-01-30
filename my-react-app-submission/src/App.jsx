import { useEffect, useState } from 'react'
import './styles/todo.css'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import FilterBar from './components/FilterBar'

const STORAGE_KEY = 'my-react-todo.todos'

// Root application component - holds the main `todos` state,
// handles persistence (localStorage) and passes callbacks to children.
function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all') // all | active | completed

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setTodos(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load todos from localStorage', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch (e) {
      console.error('Failed to save todos to localStorage', e)
    }
  }, [todos])

  const addTodo = (text) => {
    if (!text || !text.trim()) return
    const newTodo = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 9),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    }
    setTodos((t) => [newTodo, ...t])
  }

  const toggleTodo = (id) => {
    setTodos((t) => t.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const editTodo = (id, newText) => {
    setTodos((t) => t.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)))
  }

  const deleteTodo = (id) => {
    setTodos((t) => t.filter((todo) => todo.id !== id))
  }

  const activeCount = todos.filter((t) => !t.completed).length

  const filtered = todos.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  return (
    <div className="app-root">
      <h1>Todo App</h1>
      <div className="todo-card">
        <AddTodo onAdd={addTodo} />
        <FilterBar filter={filter} setFilter={setFilter} activeCount={activeCount} />
        <TodoList todos={filtered} onToggle={toggleTodo} onEdit={editTodo} onDelete={deleteTodo} />
      </div>
    </div>
  )
}

export default App
