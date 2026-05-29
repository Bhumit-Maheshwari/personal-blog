# React Frontend → Live API Plan

## Current Frontend

The React frontend currently uses local mock JSON files:

- articles.js
- comments.js

---

## Future API Integration

The frontend will switch to live backend APIs using Axios.

---

## Planned API Endpoints

### Articles

GET /api/articles
GET /api/articles/:slug

### Authors

GET /api/authors

### Comments

POST /api/articles/:id/comments

---

## Planned Frontend Changes

- Replace mock JSON imports
- Use Axios API requests
- Add loading states
- Add error handling
- Store API data in React state

---

## Example Axios Request

```js
const response =
  await axios.get(
    'http://localhost:5000/api/articles'
  )
```