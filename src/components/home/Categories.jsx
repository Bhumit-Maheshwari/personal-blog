import './Categories.css'

const categories = [
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'JavaScript', icon: '⚡' },
  { name: 'AI', icon: '🤖' },
  { name: 'Career', icon: '🚀' }
]

function Categories() {
  return (
    <section className="categories" aria-label="Browse categories">
      <div className="container">
        <h2 className="section-heading">Browse Categories</h2>

        <div className="category-grid">
          {categories.map(category => (
            <button
              key={category.name}
              className="category-card"
              aria-label={`Browse ${category.name} articles`}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories