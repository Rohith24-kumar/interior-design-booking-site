# 🏠 Nordic Designs — Interior Design Booking Site

> An award-winning interior design studio website with a full-stack Node.js + MongoDB backend for handling contact and quote form submissions.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-brightgreen)
![Express](https://img.shields.io/badge/Express-5.x-lightgrey)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Running with Docker](#-running-with-docker)
- [API Endpoints](#-api-endpoints)
- [Database Collections](#-database-collections)
- [Environment](#-environment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)

---

## 🌟 Overview

**Nordic Designs** is a multi-page interior design studio website inspired by Scandinavian aesthetics. It features a clean dark/light theme toggle, smooth scroll animations, a responsive layout, and a live backend that persists contact and quote requests into a MongoDB database.

The site is built with vanilla HTML, CSS, and JavaScript on the frontend, and powered by **Node.js + Express** on the backend. MongoDB runs in a **Docker container** for easy local development.

---

## ✨ Features

- 🌐 **5 fully responsive pages** — Home, About, Services, Portfolio, Contact
- 🌙 **Dark / Light theme toggle** with `localStorage` memory
- 📬 **Contact form** — saves submissions to MongoDB (`contacts` collection)
- 💬 **Quote request modal** — saves requests to MongoDB (`quotes` collection)
- 🐳 **Dockerized MongoDB + Mongo Express** for zero-config local database
- 🗄️ **Mongo Express UI** at port `8081` for easy data inspection
- 📱 **Mobile-friendly** hamburger navigation
- ✨ **Scroll-triggered animations** using IntersectionObserver
- 🏆 Team section, values grid, stats counter, FAQ accordion

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Fonts | Google Fonts (Inter, Cormorant Garamond) |
| Icons | Font Awesome 6 |
| Backend | Node.js, Express 5 |
| Database | MongoDB 7 (via Docker) |
| ODM | Mongoose 9 |
| DB Admin UI | Mongo Express (via Docker) |
| Dev Tool | Nodemon |

---

## 📁 Project Structure

```
nordic-designs/
│
├── 📄 index.html           # Home page
├── 📄 about.html           # About Us page
├── 📄 services.html        # Services page
├── 📄 portfolio.html       # Portfolio / Gallery page
├── 📄 contact.html         # Contact page with form
│
├── 🎨 style.css            # Global stylesheet (dark + light themes)
├── ⚙️  script.js            # Frontend JS (theme toggle, quote modal, nav)
│
├── 🖥️  server.js            # Express server — API routes + static file serving
├── 📦 package.json         # Node dependencies and scripts
├── 📦 package-lock.json    # Locked dependency versions
├── 🐳 docker-compose.yml   # MongoDB + Mongo Express Docker setup
│
└── 📖 README.md            # You are here
```

---

## ✅ Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for MongoDB)
- [Git](https://git-scm.com/)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Rohith24-kumar/interior-design-booking-site.git
cd interior-design-booking-site
```

### 2. Install Node dependencies

```bash
npm install
```

### 3. Start MongoDB and Mongo Express via Docker

```bash
docker-compose up -d
```

This starts:
- **MongoDB** on `localhost:27017`
- **Mongo Express** (database UI) on `localhost:8081`

> ⏳ Wait about 5–10 seconds for the containers to be fully ready before starting the server.

### 4. Start the server

```bash
# Production
npm start

# Development (auto-restarts on file changes)
npm run dev
```

### 5. Open in browser

```
http://localhost:5050
```

---

## 🐳 Running with Docker

The `docker-compose.yml` spins up both the database and the admin UI:

```yaml
services:
  mongodb:       # runs on port 27017
  mongo-express: # runs on port 8081
```

Useful Docker commands:

```bash
# Start containers in background
docker-compose up -d

# Stop containers
docker-compose down

# View container logs
docker-compose logs -f

# Stop and remove volumes (wipes database data)
docker-compose down -v
```

**Mongo Express login credentials:**

| Field | Value |
|---|---|
| Username | `admin` |
| Password | `admin123` |
| URL | `http://localhost:8081` |

---

## 📡 API Endpoints

### `POST /contact`
Saves a contact form submission from `contact.html`.

**Request body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1 234 567 8900",
  "subject": "consultation",
  "message": "I'd love to redesign my living room.",
  "budget": true,
  "timeline": false
}
```

**Success response (`201`):**
```json
{
  "message": "Thank you! We'll get back to you within 24 hours. 🎉"
}
```

---

### `POST /api/quote`
Saves a quote request from the modal form on `index.html`.

**Request body:**
```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "+1 987 654 3210",
  "service": "Residential Design",
  "budget": "$10,000 - $25,000",
  "description": "Modern kitchen renovation"
}
```

**Success response (`201`):**
```json
{
  "message": "Quote request received! We'll contact you shortly. 🎉"
}
```

---

**Common error response (`400` / `500`):**
```json
{
  "message": "Name, email, and message are required."
}
```

---

## 🗄️ Database Collections

All data is stored in the `nordic_designs` MongoDB database.

### `contacts` collection
Populated by the **Contact page form**.

| Field | Type | Required |
|---|---|---|
| `name` | String | ✅ |
| `email` | String | ✅ |
| `phone` | String | ❌ |
| `subject` | String | ❌ |
| `message` | String | ✅ |
| `budget` | Boolean | ❌ |
| `timeline` | Boolean | ❌ |
| `createdAt` | Date | auto |
| `updatedAt` | Date | auto |

### `quotes` collection
Populated by the **Request a Quote modal**.

| Field | Type | Required |
|---|---|---|
| `name` | String | ✅ |
| `email` | String | ✅ |
| `phone` | String | ❌ |
| `service` | String | ❌ |
| `budget` | String | ❌ |
| `description` | String | ❌ |
| `createdAt` | Date | auto |
| `updatedAt` | Date | auto |

You can inspect all saved data visually at **http://localhost:8081** using Mongo Express.

---

## 🌐 Environment

All configuration is hardcoded for local development. The defaults are:

| Variable | Value |
|---|---|
| App Port | `5050` |
| MongoDB URI | `mongodb://localhost:27017/nordic_designs` |
| Mongo Express Port | `8081` |

> If you need to change the MongoDB URI (e.g. for a remote Atlas database), update the `MONGO_URI` constant at the top of `server.js`.

---

## 📸 Screenshots

| Page | Description |
|---|---|
| **Home** | Hero section with quote modal |
| **About** | Team grid, values, stats counter |
| **Services** | Service cards with scroll animations |
| **Portfolio** | Project gallery |
| **Contact** | Contact form + FAQ accordion |

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add: your feature description"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">
  Designed with ❤️ in Stockholm &nbsp;|&nbsp; Built by <a href="https://github.com/Rohith24-kumar">Rohith Kumar</a>
</div>