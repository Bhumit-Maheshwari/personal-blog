# Day 20 Analytics Planning

## Purpose

The Jigyasa platform will implement article analytics in a future milestone.

The goal is to track:

* Total article views
* Most viewed articles
* Daily views
* Monthly views
* Popular content

---

## Database Tool

Microsoft SQL Server Management Studio (SSMS)

---

## Proposed Table

article_views

Columns:

1. id
2. article_id
3. viewed_at
4. ip_address
5. device_type

---

## SQL Table Design

CREATE TABLE article_views (

id INT IDENTITY(1,1) PRIMARY KEY,

article_id NVARCHAR(100) NOT NULL,

viewed_at DATETIME DEFAULT GETDATE(),

ip_address NVARCHAR(50),

device_type NVARCHAR(50)

);

---

## Data Flow

User Opens Article

↓

React Frontend

↓

Express Backend

↓

SQL Server

↓

Analytics Dashboard

---

## Decision

Local SQL Server was selected because:

* Already installed
* Easy to manage
* Suitable for internship project
* Easier for demonstration and testing
