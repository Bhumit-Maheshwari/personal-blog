import {
useEffect,
useState
} from 'react'

import api
from '../../api/api'

function TopAuthors() {

const [authors,
setAuthors] =
useState([])

useEffect(() => {

const fetchAuthors =
async () => {

const response =
await api.get(
'/authors'
)

setAuthors(
response.data
)
}

fetchAuthors()

}, [])

return (

<section>

<h2>

Top Authors

</h2>

<div className="author-grid">

{

authors.map(author => (

<div
key={author._id}
className="author-card"
>

<h3>

{author.name}

</h3>

<p>

{author.bio}

</p>

</div>

))

}

</div>

</section>

)
}

export default TopAuthors