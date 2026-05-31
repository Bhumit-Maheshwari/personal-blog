# MySQL Analytics Table Plan

## Purpose

The `article_views` table will store analytics data whenever a user opens an article page.

This table will help:

* Count article views
* Show trending articles
* Build admin analytics dashboard
* Track user engagement

---

# Planned MySQL Table

## Table Name

```sql
article_views
```

---

# Columns

| Column Name  | Type                           | Description    |
| ------------ | ------------------------------ | -------------- |
| id           | INT AUTO_INCREMENT PRIMARY KEY | Unique row ID  |
| article_slug | VARCHAR(255)                   | Article slug   |
| viewed_at    | TIMESTAMP                      | View timestamp |
| ip_address   | VARCHAR(100)                   | Visitor IP     |
| device       | VARCHAR(100)                   | Device/browser |
| referrer     | VARCHAR(255)                   | Source URL     |

---

# Example SQL

```sql
CREATE TABLE article_views (

  id INT AUTO_INCREMENT PRIMARY KEY,

  article_slug VARCHAR(255),

  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  ip_address VARCHAR(100),

  device VARCHAR(100),

  referrer VARCHAR(255)
);
```

---

# Future Usage

This analytics table will be connected with:

* React frontend
* Express backend APIs
* Admin dashboard charts

The backend will insert a new row whenever an article page is opened.
