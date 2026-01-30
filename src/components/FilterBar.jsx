// FilterBar: shows active count and filter buttons. Uses `aria-pressed` for accessibility.
export default function FilterBar({ filter, setFilter, activeCount }) {
  return (
    <div className="filter-bar">
      <div className="counter">{activeCount} active</div>
      <div className="filters" role="tablist" aria-label="Filter todos">
        <button aria-pressed={filter === 'all'} className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button aria-pressed={filter === 'active'} className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
        <button aria-pressed={filter === 'completed'} className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
      </div>
    </div>
  )
}
