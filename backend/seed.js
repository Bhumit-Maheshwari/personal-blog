const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const connectDB = require('./config/db')

const Article = require('./models/Article')
const Author = require('./models/Author')
const User = require('./models/User')
const Comment = require('./models/Comment')

dotenv.config()

const seed = async () => {
  try {
    await connectDB()
    console.log('🌱 Starting seed...')

    // Clear all collections
    await Article.deleteMany()
    await Author.deleteMany()
    await User.deleteMany()
    await Comment.deleteMany()
    console.log('✅ Cleared all collections')

    // ─── Create Admin User ───
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const adminUser = await User.create({
      name: 'Admin',
      email: 'admin@devblog.com',
      password: hashedPassword,
      role: 'admin'
    })
    console.log('✅ Admin user created (admin@devblog.com / admin123)')

    // ─── Create Authors ───
    const authors = await Author.insertMany([
      {
        name: 'Bhumit Maheshwari',
        bio: 'Full Stack Developer passionate about React, Node.js, and building scalable web applications. Currently interning and sharing knowledge through writing.',
        avatarUrl: '/images/authors/bhumit.jpg'
      },
      {
        name: 'Priya Sharma',
        bio: 'Frontend Engineer specializing in modern CSS, responsive design, and creating beautiful user interfaces that delight users.',
        avatarUrl: '/images/authors/priya.jpg'
      },
      {
        name: 'Arjun Patel',
        bio: 'Backend Architect with expertise in Node.js, MongoDB, and designing robust API systems. Loves optimizing database performance.',
        avatarUrl: '/images/authors/arjun.jpg'
      },
      {
        name: 'Neha Gupta',
        bio: 'DevOps Engineer focused on CI/CD pipelines, containerization, and bridging the gap between development and operations teams.',
        avatarUrl: '/images/authors/neha.jpg'
      }
    ])
    console.log('✅ 4 Authors created')

    // ─── Create Articles ───
    const articlesData = [
      {
        slug: 'mastering-react-hooks',
        title: 'Mastering React Hooks: A Complete Guide',
        excerpt: 'Learn everything about React Hooks — from useState and useEffect to advanced patterns with useReducer, useMemo, and custom hooks.',
        imageUrl: '/images/articles/mastering-react-hooks.jpg',
        tags: ['React', 'JavaScript'],
        status: 'Published',
        authorId: authors[0]._id,
        publishedAt: new Date('2025-01-15'),
        body: `# Mastering React Hooks

React Hooks revolutionized the way we write React components. Introduced in React 16.8, they allow you to use state and other React features without writing class components.

## Why Hooks?

Before Hooks, stateful logic was trapped inside class components. This led to complex patterns like higher-order components and render props. Hooks solve this by letting you extract stateful logic into reusable functions.

## useState — Managing State

The most fundamental hook. It returns a state value and a function to update it.

\`\`\`javascript
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
\`\`\`

**Key Points:**
- The argument to useState is the initial state value
- setCount triggers a re-render with the new value
- State updates may be batched for performance

## useEffect — Side Effects

useEffect lets you perform side effects in function components. It runs after every render by default.

\`\`\`javascript
import { useEffect, useState } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    // Fetch user data when userId changes
    fetch(\\\`/api/users/\\\${userId}\\\`)
      .then(res => res.json())
      .then(data => setUser(data))
    
    // Cleanup function (optional)
    return () => {
      console.log('Cleanup on unmount or before next effect')
    }
  }, [userId]) // Dependency array
  
  return user ? <h1>{user.name}</h1> : <p>Loading...</p>
}
\`\`\`

**Dependency Array Rules:**
- \`[]\` — Run only once on mount
- \`[dep1, dep2]\` — Run when dependencies change
- No array — Run after every render (usually not what you want)

## useContext — Sharing State Globally

useContext eliminates prop drilling by providing access to context values directly.

\`\`\`javascript
import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  )
}
\`\`\`

## useReducer — Complex State Logic

When state logic is complex or the next state depends on the previous one, useReducer is more appropriate than useState.

\`\`\`javascript
import { useReducer } from 'react'

const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return initialState
    default:
      throw new Error('Unknown action')
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  )
}
\`\`\`

## useMemo & useCallback — Performance Optimization

These hooks help avoid unnecessary recalculations and re-renders.

\`\`\`javascript
import { useMemo, useCallback } from 'react'

function ExpensiveComponent({ items, onItemClick }) {
  // useMemo: memoize expensive computation
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.name.localeCompare(b.name))
  }, [items])
  
  // useCallback: memoize function reference
  const handleClick = useCallback((id) => {
    onItemClick(id)
  }, [onItemClick])
  
  return sortedItems.map(item => (
    <div key={item.id} onClick={() => handleClick(item.id)}>
      {item.name}
    </div>
  ))
}
\`\`\`

## Custom Hooks — Reusable Logic

The real power of hooks is building your own. Custom hooks let you extract component logic into reusable functions.

\`\`\`javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })
  
  const setValue = (value) => {
    setStoredValue(value)
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  
  return [storedValue, setValue]
}

// Usage
function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  return <button onClick={() => setTheme('dark')}>Set Dark</button>
}
\`\`\`

## Rules of Hooks

1. **Only call hooks at the top level** — never inside loops, conditions, or nested functions
2. **Only call hooks from React functions** — either function components or custom hooks

## Conclusion

React Hooks simplify component logic, make code more reusable, and eliminate the need for class components. Start with useState and useEffect, then gradually explore useContext, useReducer, and custom hooks as your applications grow in complexity.`
      },
      {
        slug: 'javascript-es6-features',
        title: 'JavaScript ES6+ Features Every Developer Should Know',
        excerpt: 'A comprehensive guide to modern JavaScript features including destructuring, arrow functions, promises, async/await, and more.',
        imageUrl: '/images/articles/javascript-es6-features.jpg',
        tags: ['JavaScript'],
        status: 'Published',
        authorId: authors[1]._id,
        publishedAt: new Date('2025-02-10'),
        body: `# JavaScript ES6+ Features Every Developer Should Know

ES6 (ECMAScript 2015) was a massive update to JavaScript that introduced features developers had been requesting for years. Let's explore the most important ones.

## Arrow Functions

Arrow functions provide a concise syntax and lexically bind the \`this\` keyword.

\`\`\`javascript
// Traditional function
function add(a, b) {
  return a + b
}

// Arrow function
const add = (a, b) => a + b

// With a single parameter, parentheses are optional
const double = x => x * 2

// Multi-line arrow function
const greet = (name) => {
  const message = \\\`Hello, \\\${name}!\\\`
  return message
}
\`\`\`

## Destructuring Assignment

Extract values from arrays and objects into distinct variables.

\`\`\`javascript
// Object destructuring
const user = { name: 'Bhumit', age: 22, role: 'developer' }
const { name, age, role } = user

// With renaming
const { name: userName } = user

// Array destructuring
const colors = ['red', 'green', 'blue']
const [primary, secondary] = colors

// Skipping elements
const [first, , third] = colors

// Default values
const { country = 'India' } = user
\`\`\`

## Template Literals

Multi-line strings and string interpolation with backticks.

\`\`\`javascript
const name = 'Jigyasa'
const greeting = \\\`Welcome to \\\${name} Tech Platform!
This is a multi-line string.
Current year: \\\${new Date().getFullYear()}\\\`
\`\`\`

## Spread and Rest Operators

The \`...\` operator works for both spreading and collecting elements.

\`\`\`javascript
// Spread: expanding arrays
const arr1 = [1, 2, 3]
const arr2 = [...arr1, 4, 5] // [1, 2, 3, 4, 5]

// Spread: cloning objects
const original = { a: 1, b: 2 }
const clone = { ...original, c: 3 }

// Rest: collecting arguments
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0)
}
sum(1, 2, 3, 4) // 10
\`\`\`

## Promises

Promises represent the eventual completion or failure of an asynchronous operation.

\`\`\`javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: 'Article' }
      resolve(data)
      // or reject(new Error('Failed'))
    }, 1000)
  })
}

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error))
\`\`\`

## Async/Await

A cleaner syntax for working with promises.

\`\`\`javascript
async function loadArticles() {
  try {
    const response = await fetch('/api/articles')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to load:', error)
  }
}
\`\`\`

## Modules (import/export)

JavaScript now has a native module system.

\`\`\`javascript
// math.js — Named exports
export const add = (a, b) => a + b
export const subtract = (a, b) => a - b

// Default export
export default class Calculator { }

// Importing
import Calculator, { add, subtract } from './math.js'
\`\`\`

## Optional Chaining (?.)

Safely access nested object properties without worrying about null/undefined.

\`\`\`javascript
const user = { profile: { address: { city: 'Mumbai' } } }
const city = user?.profile?.address?.city // 'Mumbai'
const zip = user?.profile?.address?.zip // undefined (no error!)
\`\`\`

## Nullish Coalescing (??)

Returns the right-hand operand when the left is null or undefined (not for all falsy values like \`||\`).

\`\`\`javascript
const count = 0
console.log(count || 10)  // 10 (0 is falsy)
console.log(count ?? 10)  // 0  (0 is not null/undefined)
\`\`\`

## Conclusion

ES6+ features make JavaScript more expressive, concise, and powerful. Master these fundamentals and you will write cleaner, more maintainable code in every project.`
      },
      {
        slug: 'css-grid-layouts',
        title: 'Building Responsive Layouts with CSS Grid',
        excerpt: 'Master CSS Grid with practical examples. Learn grid template areas, fr units, auto-fill, auto-fit, and responsive patterns.',
        imageUrl: '/images/articles/css-grid-layouts.jpg',
        tags: ['CSS'],
        status: 'Published',
        authorId: authors[1]._id,
        publishedAt: new Date('2025-03-05'),
        body: `# Building Responsive Layouts with CSS Grid

CSS Grid is the most powerful layout system in CSS. It provides a two-dimensional grid-based layout system that handles both columns and rows.

## Getting Started

Create a grid container by setting \`display: grid\` on the parent element.

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
\`\`\`

This creates a three-column layout with equal widths and 20px gaps between items.

## The fr Unit

The \`fr\` unit represents a fraction of the available space in the grid container.

\`\`\`css
.container {
  grid-template-columns: 1fr 2fr 1fr;
  /* First column: 25%, Second: 50%, Third: 25% */
}
\`\`\`

## Grid Template Areas

Named grid areas make complex layouts readable and maintainable.

\`\`\`css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.aside   { grid-area: aside; }
.footer  { grid-area: footer; }
\`\`\`

## auto-fill vs auto-fit

These functions create responsive grids without media queries.

\`\`\`css
/* auto-fill: creates as many tracks as possible */
.grid-fill {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

/* auto-fit: similar but collapses empty tracks */
.grid-fit {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
\`\`\`

The practical difference: \`auto-fit\` stretches items to fill the row when there are fewer items than columns, while \`auto-fill\` keeps the empty column spaces.

## Alignment

Grid provides powerful alignment controls for both the grid container and individual items.

\`\`\`css
.container {
  /* Align all items */
  justify-items: center;  /* horizontal */
  align-items: center;    /* vertical */
  
  /* Align the grid itself */
  justify-content: center;
  align-content: center;
}

/* Individual item alignment */
.special-item {
  justify-self: end;
  align-self: start;
}
\`\`\`

## Responsive Blog Layout Example

Here is a real-world responsive blog layout using CSS Grid:

\`\`\`css
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 20px;
}

.blog-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.blog-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog-card .content {
  padding: 20px;
}
\`\`\`

## Grid vs Flexbox

- **Grid** is for two-dimensional layouts (rows AND columns)
- **Flexbox** is for one-dimensional layouts (row OR column)

Use Grid for page layouts and card grids. Use Flexbox for navigation bars, centering, and single-axis alignment.

## Conclusion

CSS Grid makes complex layouts simple and maintainable. Combined with Flexbox for component-level layouts, you have all the tools needed for any modern web design.`
      },
      {
        slug: 'nodejs-express-api',
        title: 'Node.js and Express REST API Best Practices',
        excerpt: 'Learn how to build production-ready REST APIs with Node.js and Express, covering middleware, error handling, validation, and security.',
        imageUrl: '/images/articles/nodejs-express-api.jpg',
        tags: ['Node', 'JavaScript'],
        status: 'Published',
        authorId: authors[2]._id,
        publishedAt: new Date('2025-03-20'),
        body: `# Node.js and Express REST API Best Practices

Building robust APIs requires more than just defining routes. This guide covers the patterns and practices that make production APIs reliable and maintainable.

## Project Structure

A well-organized project structure is critical for maintainability.

\`\`\`
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── articleController.js
│   └── authController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── Article.js
│   └── User.js
├── routes/
│   ├── articleRoutes.js
│   └── authRoutes.js
├── server.js
└── package.json
\`\`\`

## Middleware Pattern

Express middleware functions process requests in a pipeline.

\`\`\`javascript
// Logger middleware
const logger = (req, res, next) => {
  console.log(\\\`\\\${req.method} \\\${req.path} - \\\${new Date().toISOString()}\\\`)
  next() // Pass to next middleware
}

app.use(logger)
\`\`\`

## Error Handling

Always use a centralized error handler.

\`\`\`javascript
// Global error handler (must have 4 parameters)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// In controllers, wrap async functions
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

const getArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find()
  res.json(articles)
})
\`\`\`

## Authentication with JWT

Protect routes with JSON Web Token middleware.

\`\`\`javascript
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

// Apply to protected routes
router.post('/articles', auth, createArticle)
router.delete('/articles/:id', auth, deleteArticle)
\`\`\`

## Input Validation

Never trust user input. Validate everything.

\`\`\`javascript
const createArticle = async (req, res) => {
  const { title, body, slug } = req.body
  
  if (!title || !body || !slug) {
    return res.status(400).json({
      message: 'Title, body, and slug are required'
    })
  }
  
  if (title.length > 200) {
    return res.status(400).json({
      message: 'Title must be under 200 characters'
    })
  }
  
  const article = await Article.create({ title, body, slug })
  res.status(201).json(article)
}
\`\`\`

## Security Best Practices

- Use **helmet** for security headers
- Use **cors** to control cross-origin access
- Use **bcrypt** for password hashing (never store plain text!)
- Use **rate limiting** to prevent abuse
- Never expose stack traces in production
- Validate and sanitize all inputs

## Conclusion

A well-structured Express API with proper error handling, authentication, and validation will serve as a solid foundation for any web application. Follow these patterns consistently and your APIs will be robust, secure, and maintainable.`
      },
      {
        slug: 'mongodb-schema-design',
        title: 'MongoDB Schema Design Patterns',
        excerpt: 'Understand embedding vs referencing, one-to-many relationships, denormalization strategies, and indexing in MongoDB.',
        imageUrl: '/images/articles/mongodb-schema-design.jpg',
        tags: ['MongoDB', 'Node'],
        status: 'Published',
        authorId: authors[2]._id,
        publishedAt: new Date('2025-04-10'),
        body: `# MongoDB Schema Design Patterns

Unlike relational databases, MongoDB gives you flexibility in how you model your data. This guide covers the key patterns for designing effective schemas.

## Embedding vs Referencing

The fundamental decision in MongoDB schema design.

### Embedding (Denormalized)

Store related data together in a single document.

\`\`\`javascript
// Blog post with embedded comments
{
  _id: ObjectId("..."),
  title: "My Blog Post",
  body: "Content here...",
  comments: [
    { name: "Alice", message: "Great post!", date: ISODate("...") },
    { name: "Bob", message: "Very helpful", date: ISODate("...") }
  ]
}
\`\`\`

**Best for:** Data that is always accessed together, one-to-few relationships.

### Referencing (Normalized)

Store related data in separate collections and link with IDs.

\`\`\`javascript
// Article document
{ _id: ObjectId("article1"), title: "My Post", authorId: ObjectId("author1") }

// Author document
{ _id: ObjectId("author1"), name: "Bhumit", bio: "Full Stack Developer" }
\`\`\`

**Best for:** Many-to-many relationships, large subdocuments, data that changes frequently.

## One-to-Many Patterns

### One-to-Few: Embed

\`\`\`javascript
// User with addresses (rarely more than 3-4)
{
  name: "Bhumit",
  addresses: [
    { street: "123 Main St", city: "Mumbai" },
    { street: "456 Oak Ave", city: "Pune" }
  ]
}
\`\`\`

### One-to-Many: Reference with parent

\`\`\`javascript
// Author
{ _id: "author1", name: "Bhumit" }

// Articles reference the author
{ title: "Article 1", authorId: "author1" }
{ title: "Article 2", authorId: "author1" }
\`\`\`

### One-to-Squillions: Reference with child

When the "many" side can grow unboundedly (like log entries), store the reference on the child.

## Indexing

Indexes dramatically improve query performance.

\`\`\`javascript
// Single field index
articleSchema.index({ slug: 1 })

// Compound index
articleSchema.index({ status: 1, publishedAt: -1 })

// Text index for search
articleSchema.index({ title: 'text', body: 'text' })

// Unique index
articleSchema.index({ email: 1 }, { unique: true })
\`\`\`

## The Subset Pattern

When documents contain large arrays but you usually only need recent items, store a subset in the main document and the full history in a separate collection.

## Conclusion

There is no one-size-fits-all approach to MongoDB schema design. Consider your access patterns, relationship cardinality, and data growth when choosing between embedding and referencing. The right schema makes your queries fast and your code simple.`
      },
      {
        slug: 'react-router-guide',
        title: 'React Router v6 Complete Guide',
        excerpt: 'Master React Router v6 with nested routes, dynamic parameters, loaders, protected routes, and programmatic navigation.',
        imageUrl: '/images/articles/react-router-guide.jpg',
        tags: ['React', 'JavaScript'],
        status: 'Published',
        authorId: authors[0]._id,
        publishedAt: new Date('2025-05-01'),
        body: `# React Router v6 Complete Guide

React Router is the standard routing library for React applications. Version 6 introduced significant improvements over v5.

## Basic Setup

\`\`\`javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
\`\`\`

## Dynamic Routes

Use URL parameters to create dynamic pages.

\`\`\`javascript
<Route path="/article/:slug" element={<Article />} />

// In the Article component
import { useParams } from 'react-router-dom'

function Article() {
  const { slug } = useParams()
  // Fetch article by slug
  return <h1>Article: {slug}</h1>
}
\`\`\`

## Nested Routes

Organize related routes with nesting.

\`\`\`javascript
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<Dashboard />} />
  <Route path="articles" element={<ArticleList />} />
  <Route path="articles/new" element={<NewArticle />} />
  <Route path="settings" element={<Settings />} />
</Route>

// AdminLayout uses Outlet to render child routes
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className="admin">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
\`\`\`

## Navigation

\`\`\`javascript
import { Link, NavLink, useNavigate } from 'react-router-dom'

// Link: basic navigation
<Link to="/about">About</Link>

// NavLink: active state awareness
<NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
  About
</NavLink>

// Programmatic navigation
function LoginForm() {
  const navigate = useNavigate()
  
  const handleLogin = async () => {
    await login()
    navigate('/dashboard')
  }
}
\`\`\`

## Protected Routes

Guard routes that require authentication.

\`\`\`javascript
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

// Usage
<Route path="/admin" element={
  <ProtectedRoute>
    <AdminDashboard />
  </ProtectedRoute>
} />
\`\`\`

## Conclusion

React Router v6 provides a clean, component-based routing system. Use nested routes for layout composition, dynamic parameters for detail pages, and protected routes for authentication. These patterns will serve you well in any React application.`
      },
      {
        slug: 'css-flexbox-deep-dive',
        title: 'CSS Flexbox Deep Dive',
        excerpt: 'Master CSS Flexbox with in-depth explanations of the main axis, cross axis, flex properties, alignment, and real-world layout patterns.',
        imageUrl: '/images/articles/css-flexbox-deep-dive.jpg',
        tags: ['CSS'],
        status: 'Published',
        authorId: authors[1]._id,
        publishedAt: new Date('2025-05-20'),
        body: `# CSS Flexbox Deep Dive

Flexbox is a one-dimensional layout model designed for distributing space and aligning items within a container, even when their sizes are unknown or dynamic.

## The Two Axes

Every flex container has two axes:
- **Main axis** — defined by \`flex-direction\` (default: horizontal/row)
- **Cross axis** — perpendicular to the main axis

\`\`\`css
.container {
  display: flex;
  flex-direction: row;    /* Main axis: horizontal */
  /* flex-direction: column; Main axis: vertical */
}
\`\`\`

## Container Properties

\`\`\`css
.flex-container {
  display: flex;
  
  /* Direction */
  flex-direction: row | row-reverse | column | column-reverse;
  
  /* Wrapping */
  flex-wrap: nowrap | wrap | wrap-reverse;
  
  /* Main axis alignment */
  justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly;
  
  /* Cross axis alignment */
  align-items: flex-start | center | flex-end | stretch | baseline;
  
  /* Multi-line cross axis alignment */
  align-content: flex-start | center | flex-end | space-between | space-around | stretch;
  
  /* Gap between items */
  gap: 16px;
}
\`\`\`

## Item Properties

\`\`\`css
.flex-item {
  /* Growth factor */
  flex-grow: 0;   /* Don't grow (default) */
  flex-grow: 1;   /* Grow to fill available space */
  
  /* Shrink factor */
  flex-shrink: 1; /* Shrink if needed (default) */
  flex-shrink: 0; /* Don't shrink */
  
  /* Base size */
  flex-basis: auto | 200px | 30%;
  
  /* Shorthand */
  flex: 1;        /* flex: 1 1 0% */
  flex: 0 0 300px; /* Don't grow, don't shrink, 300px wide */
  
  /* Individual alignment */
  align-self: auto | flex-start | center | flex-end | stretch;
  
  /* Order */
  order: 0; /* Default, lower numbers appear first */
}
\`\`\`

## Common Patterns

### Centering (The Holy Grail)

\`\`\`css
.center-everything {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
\`\`\`

### Navigation Bar

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
}
\`\`\`

### Card Layout with Equal Heights

\`\`\`css
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px; /* Grow, shrink, min 300px */
  display: flex;
  flex-direction: column;
}

.card-content {
  flex: 1; /* Push footer to bottom */
}
\`\`\`

### Sticky Footer

\`\`\`css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1; /* Takes remaining space, pushing footer down */
}
\`\`\`

## Conclusion

Flexbox is essential for modern CSS layouts. Master the relationship between container and item properties, understand the two axes, and you can build any one-dimensional layout with confidence.`
      },
      {
        slug: 'jwt-authentication-guide',
        title: 'Authentication with JWT in Full Stack Apps',
        excerpt: 'Implement secure JWT authentication across frontend and backend. Covers token structure, login flow, protected routes, and security best practices.',
        imageUrl: '/images/articles/jwt-authentication-guide.jpg',
        tags: ['Node', 'React', 'JavaScript'],
        status: 'Published',
        authorId: authors[3]._id,
        publishedAt: new Date('2025-06-10'),
        body: `# Authentication with JWT in Full Stack Apps

JSON Web Tokens (JWT) are the industry standard for stateless authentication in modern web applications. This guide covers implementing JWT auth in a React + Node.js stack.

## What is JWT?

A JWT is a compact, URL-safe token consisting of three parts separated by dots:

\`\`\`
header.payload.signature
\`\`\`

- **Header**: Token type and hashing algorithm
- **Payload**: Claims (user data like id, role, expiration)
- **Signature**: Verification that the token hasn't been tampered with

## Backend: Login Endpoint

\`\`\`javascript
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const login = async (req, res) => {
  const { email, password } = req.body
  
  // Find user
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
  
  // Verify password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
  
  // Generate token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )
  
  res.json({ token, user: { id: user._id, name: user.name } })
}
\`\`\`

## Backend: Auth Middleware

\`\`\`javascript
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' })
  }
  
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token expired or invalid' })
  }
}
\`\`\`

## Frontend: Login Flow

\`\`\`javascript
const handleLogin = async (email, password) => {
  try {
    const response = await axios.post('/api/auth/login', {
      email, password
    })
    
    // Store token
    localStorage.setItem('token', response.data.token)
    
    // Redirect to dashboard
    navigate('/dashboard')
  } catch (error) {
    setError('Invalid credentials')
  }
}
\`\`\`

## Frontend: Axios Interceptor

Automatically attach the token to every API request.

\`\`\`javascript
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = \\\`Bearer \\\${token}\\\`
  }
  return config
})

export default api
\`\`\`

## Security Best Practices

1. **Use HTTPS** in production — tokens are visible in network requests
2. **Set short expiration** — 15 minutes to 1 day maximum
3. **Never store sensitive data** in the JWT payload
4. **Use strong secrets** — at least 256-bit random strings
5. **Hash passwords with bcrypt** — never store plain text
6. **Implement logout** by removing the token from storage

## Conclusion

JWT authentication provides a stateless, scalable auth solution for full stack applications. By combining bcrypt for password hashing, JWT for token generation, and Axios interceptors for automatic token attachment, you get a secure and seamless authentication experience.`
      }
    ]

    const articles = await Article.insertMany(articlesData)
    console.log('✅ 8 Articles created with full content')

    // ─── Create Comments ───
    const commentsData = []
    const commentNames = ['Rahul Kumar', 'Sarah Chen', 'Alex Johnson', 'Meera Reddy', 'Dev Singh', 'Ankita Joshi']
    const commentMessages = [
      'This article was incredibly helpful! I learned so much from the code examples.',
      'Great explanation! I have been struggling with this concept and this cleared it up perfectly.',
      'Well written and easy to follow. Would love to see a follow-up article on advanced topics.',
      'Exactly what I needed for my project. The practical examples make all the difference.',
      'Bookmarked this for future reference. One of the best articles I have read on this topic.',
      'Thank you for breaking this down so clearly. The step-by-step approach really works.'
    ]

    articles.forEach((article, index) => {
      for (let j = 0; j < 3; j++) {
        commentsData.push({
          articleId: article._id,
          name: commentNames[(index + j) % commentNames.length],
          message: commentMessages[(index + j) % commentMessages.length]
        })
      }
    })

    await Comment.insertMany(commentsData)
    console.log('✅ 24 Comments created')

    console.log('\n🎉 Seed complete!')
    console.log('   Admin login: admin@devblog.com / admin123')
    console.log('   Authors: 4')
    console.log('   Articles: 8')
    console.log('   Comments: 24\n')

    process.exit()

  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

seed()