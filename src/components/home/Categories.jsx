const categories = [

'React',

'Node.js',

'MongoDB',

'JavaScript',

'AI',

'Career'

]

function Categories() {

  return (

    <section className="categories">

      <h2>

        Browse Categories

      </h2>

      <div className="category-grid">

      {

      categories.map(

      category => (

      <div
        key={category}
        className="category-card"
      >

        {category}

      </div>

      ))

      }

      </div>

    </section>

  )
}

export default Categories