const articles = [
  {
    _id: '1',
    slug: 'react-basics',
    title: 'React Basics: A Complete Beginner Guide',
    excerpt: 'Learn the fundamentals of React including components, JSX, props, and state management for building modern user interfaces.',
    tags: ['React', 'JavaScript'],
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    body: `# React Basics\n\nReact is a JavaScript library for building user interfaces. It was developed by Facebook and is now one of the most popular frontend frameworks.\n\n## Components\n\nComponents are the building blocks of React applications. They are reusable pieces of code that return React elements describing what should appear on the screen.\n\n## JSX\n\nJSX is a syntax extension that allows you to write HTML-like code within JavaScript. It makes React code more readable and expressive.\n\n## Props & State\n\nProps are inputs to components passed by parent components. State is data managed within a component that can change over time.`,
    status: 'Published',
    publishedAt: '2024-01-15T10:00:00Z'
  },
  {
    _id: '2',
    slug: 'javascript-es6',
    title: 'Modern JavaScript ES6+ Features Explained',
    excerpt: 'Explore arrow functions, destructuring, spread operators, template literals, and other essential ES6+ features every developer should know.',
    tags: ['JavaScript'],
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
    body: `# JavaScript ES6+\n\nES6 (ECMAScript 2015) introduced significant improvements to JavaScript. These modern features make code cleaner and more efficient.\n\n## Arrow Functions\n\nArrow functions provide a concise syntax for writing functions and lexically bind the 'this' value.\n\n## Destructuring\n\nDestructuring allows you to extract values from arrays and objects into distinct variables.\n\n## Template Literals\n\nTemplate literals enable embedded expressions and multi-line strings using backticks.`,
    status: 'Published',
    publishedAt: '2024-02-01T10:00:00Z'
  },
  {
    _id: '3',
    slug: 'css-flexbox',
    title: 'CSS Flexbox: Building Responsive Layouts',
    excerpt: 'Master CSS Flexbox with practical examples. Learn to create flexible, responsive layouts that adapt to any screen size.',
    tags: ['CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800',
    body: `# CSS Flexbox\n\nFlexbox is a one-dimensional layout model that helps you distribute space and align items within a container.\n\n## Flex Container\n\nSet display: flex on the parent element to create a flex container. Children become flex items.\n\n## Properties\n\nKey properties include justify-content, align-items, flex-direction, and flex-wrap.`,
    status: 'Published',
    publishedAt: '2024-02-15T10:00:00Z'
  },
  {
    _id: '4',
    slug: 'node-intro',
    title: 'Node.js Introduction: Server-Side JavaScript',
    excerpt: 'Get started with Node.js and learn how to build scalable backend applications using JavaScript on the server.',
    tags: ['Node', 'JavaScript'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    body: `# Node.js Introduction\n\nNode.js is a runtime environment that allows you to run JavaScript on the server side. Built on Chrome's V8 engine, it's designed for building scalable network applications.\n\n## Why Node.js?\n\nNode.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for data-intensive real-time applications.\n\n## Getting Started\n\nInstall Node.js from nodejs.org and create your first server with the built-in http module.`,
    status: 'Published',
    publishedAt: '2024-03-01T10:00:00Z'
  },
  {
    _id: '5',
    slug: 'react-router',
    title: 'React Router: Client-Side Navigation',
    excerpt: 'Implement seamless page navigation in your React applications using React Router v6 with nested routes and dynamic parameters.',
    tags: ['React', 'JavaScript'],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    body: `# React Router\n\nReact Router is the standard library for routing in React applications. It enables navigation between different views without page refreshes.\n\n## Setting Up Routes\n\nWrap your app in BrowserRouter and define routes using the Routes and Route components.\n\n## Dynamic Routes\n\nUse URL parameters with useParams hook to create dynamic pages like article detail views.`,
    status: 'Published',
    publishedAt: '2024-03-15T10:00:00Z'
  },
  {
    _id: '6',
    slug: 'async-js',
    title: 'Async JavaScript: Promises & Async/Await',
    excerpt: 'Understand asynchronous JavaScript patterns including callbacks, promises, and the modern async/await syntax for handling async operations.',
    tags: ['JavaScript'],
    imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
    body: `# Async JavaScript\n\nAsynchronous programming is essential for handling operations like API calls, file reads, and timers without blocking the main thread.\n\n## Promises\n\nPromises represent the eventual completion or failure of an async operation and allow chaining with .then() and .catch().\n\n## Async/Await\n\nAsync/await provides a cleaner syntax for working with promises, making async code look synchronous.`,
    status: 'Published',
    publishedAt: '2024-04-01T10:00:00Z'
  },
  {
    _id: '7',
    slug: 'css-grid',
    title: 'CSS Grid Layout: Two-Dimensional Layouts',
    excerpt: 'Learn CSS Grid to create complex two-dimensional layouts with rows and columns. The ultimate guide to modern CSS layouts.',
    tags: ['CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800',
    body: `# CSS Grid\n\nCSS Grid is a two-dimensional layout system that lets you create complex layouts with rows and columns simultaneously.\n\n## Grid Container\n\nDefine grid-template-columns and grid-template-rows to set up your grid structure.\n\n## Grid Items\n\nPlace items using grid-column and grid-row properties, or use named grid areas for semantic layouts.`,
    status: 'Published',
    publishedAt: '2024-04-15T10:00:00Z'
  },
  {
    _id: '8',
    slug: 'mongodb-intro',
    title: 'MongoDB Basics: NoSQL Database Guide',
    excerpt: 'Introduction to MongoDB, the popular NoSQL document database. Learn about collections, documents, CRUD operations, and queries.',
    tags: ['MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
    body: `# MongoDB Basics\n\nMongoDB is a NoSQL database that stores data in flexible, JSON-like documents called BSON (Binary JSON).\n\n## Collections & Documents\n\nData is organized into collections (similar to tables) containing documents (similar to rows).\n\n## CRUD Operations\n\nMongoDB supports Create, Read, Update, and Delete operations using methods like insertOne, find, updateOne, and deleteOne.`,
    status: 'Published',
    publishedAt: '2024-05-01T10:00:00Z'
  },
  {
    _id: '9',
    slug: 'express-routing',
    title: 'Express.js Routing: Building REST APIs',
    excerpt: 'Build robust REST APIs with Express.js routing. Learn about route handlers, middleware, request parameters, and error handling.',
    tags: ['Node', 'JavaScript'],
    imageUrl: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800',
    body: `# Express Routing\n\nExpress.js simplifies backend routing with its elegant API for defining routes and middleware.\n\n## Route Methods\n\nExpress supports HTTP methods like GET, POST, PUT, DELETE through app.get(), app.post(), etc.\n\n## Middleware\n\nMiddleware functions have access to the request, response, and next function for processing requests in a pipeline.`,
    status: 'Published',
    publishedAt: '2024-05-15T10:00:00Z'
  },
  {
    _id: '10',
    slug: 'responsive-design',
    title: 'Responsive Web Design: Mobile-First Approach',
    excerpt: 'Build websites that look great on any device. Learn media queries, fluid grids, flexible images, and mobile-first design principles.',
    tags: ['CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    body: `# Responsive Design\n\nResponsive web design ensures your website adapts to different screen sizes and devices.\n\n## Media Queries\n\nMedia queries allow you to apply CSS rules based on viewport width, height, and other device characteristics.\n\n## Mobile-First\n\nDesign for mobile first, then progressively enhance for larger screens using min-width media queries.`,
    status: 'Published',
    publishedAt: '2024-06-01T10:00:00Z'
  }
]

export default articles