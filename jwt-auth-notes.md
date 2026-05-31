# JWT Authentication Notes

## What is JWT?

JWT (JSON Web Token) is a secure token system used for authentication in web applications.

JWT allows users to stay logged in after authentication.

---

# JWT Structure

A JWT token has 3 parts:

```text
HEADER.PAYLOAD.SIGNATURE
```

Example:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

# JWT Authentication Flow

## Step 1

User logs in using:

* Email
* Password

---

## Step 2

Backend verifies credentials.

---

## Step 3

Backend generates JWT token.

---

## Step 4

Frontend stores token in:

* localStorage
  or
* cookies

---

## Step 5

Frontend sends token in API requests.

Example:

```http
Authorization: Bearer TOKEN
```

---

# Why JWT is Used

JWT helps:

* Secure admin routes
* Protect APIs
* Maintain user login session
* Avoid unauthorized access

---

# Planned Usage in Project

JWT authentication will later be used for:

* Admin login
* Protected article CRUD routes
* Secure dashboard access

---

# Example Packages

```bash
npm install jsonwebtoken bcryptjs
```

---

# Future Backend Flow

React Frontend
↓
Login Form
↓
Express Backend
↓
JWT Token
↓
Protected Admin APIs
