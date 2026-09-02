# Ember

A scalable Reddit-inspired social discussion platform built with a modern React frontend and Node.js backend.

**Live Demo:** https://ember-beta-two.vercel.app/

## Overview

Ember is a Reddit-inspired social platform designed with a strong focus on **clean, modular, and scalable architecture**.

The project is structured so that features can be added and developed independently as the application grows. Instead of building the application as a tightly coupled codebase, Ember separates the frontend and backend responsibilities into dedicated layers, making the system easier to maintain, extend, and scale.

The goal of the architecture is to provide a solid foundation for a large application while keeping individual features organized and manageable.

## Features

* Reddit-inspired community and discussion experience
* User authentication with Google OAuth
* Community-based content organization
* Posts and discussions
* Real-time communication
* Responsive user interface
* Client-side routing
* Server-side API architecture
* Image and media handling
* Form validation and state management
* Scalable and modular project structure

## Architecture

Ember is divided into two primary applications:

```text
ember/
├── client/    # Frontend
└── server/    # Backend
```

### Client

The frontend is built with React and Vite.

The client is responsible for:

* User interface
* Routing
* Client-side state management
* API communication
* Form handling
* Real-time client communication
* Animations and UI interactions

### Server

The backend is built with Node.js and Express.

The server is responsible for:

* REST API
* Authentication and authorization
* Database operations
* Business logic
* Real-time communication
* Media management
* Request handling

The separation between client and server makes it possible to evolve each part independently.

## Technology Stack

### Frontend

* **React 19** — UI development
* **Vite** — Development and build tooling
* **React Router** — Client-side routing
* **TanStack Query** — Server-state management and data fetching
* **Zustand** — Client-side state management
* **Axios** — HTTP requests
* **React Hook Form** — Form management
* **Tailwind CSS** — Styling
* **Framer Motion** — Animations
* **Socket.IO Client** — Real-time communication
* **Lucide React** — Icons
* **React Hot Toast** — Notifications
* **Google OAuth** — Authentication

### Backend

* **Node.js** — Server runtime
* **Express 5** — Backend framework
* **MongoDB / Mongoose** — Database and data modeling
* **Socket.IO** — Real-time communication
* **JWT** — Authentication
* **Google Auth Library** — Google authentication
* **Cloudinary** — Image/media management
* **CORS** — Cross-origin request handling
* **dotenv** — Environment configuration
* **Slugify** — URL-friendly identifiers

## Project Structure

```text
ember/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md
```

The project keeps the frontend and backend separated so that each application has its own dependencies, configuration, and development workflow.

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB

You will also need the required environment variables for services such as Google OAuth, JWT authentication, and Cloudinary.

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd ember
```

### Install Client Dependencies

```bash
cd client
npm install
```

### Install Server Dependencies

Open another terminal or return to the project root:

```bash
cd ../server
npm install
```

---

## Environment Variables

Create the appropriate `.env` files for the client and server based on the environment variables required by the application.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Do not commit real credentials or secrets to the repository.

---

## Running the Application

Ember consists of two separate applications that need to run during development.

### Start the Backend

From the `server` directory:

```bash
npm run dev
```

The backend uses Node's watch mode during development.

For production-style execution:

```bash
npm start
```

### Start the Frontend

From the `client` directory:

```bash
npm run dev
```

Vite will start the frontend development server.

Open the URL displayed by Vite in your browser.

---

## Client Scripts

From the `client` directory:

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Preview Production Build

```bash
npm run preview
```

## Server Scripts

From the `server` directory:

### Development

```bash
npm run dev
```

### Start Server

```bash
npm start
```

## Scalability & Architecture

One of the main goals of Ember is to establish an architecture that remains maintainable as the application grows.

The project separates responsibilities between the frontend and backend and uses dedicated technologies for different concerns:

```text
                    Ember
                      |
          ┌───────────┴───────────┐
          │                       │
       Client                   Server
          │                       │
       React                  Express
          │                       │
   React Router              Business Logic
   TanStack Query            Authentication
   Zustand                   Database
   Axios                     Socket.IO
   Tailwind                  Cloudinary
          │                       │
          └───────────┬───────────┘
                      │
                   Database
```

This separation makes it easier to:

* Add new features
* Modify existing functionality
* Maintain individual modules
* Scale different parts of the application independently
* Keep frontend and backend concerns separate
* Collaborate with multiple developers
* Reduce unnecessary coupling between components

As the application grows, new functionality can be introduced without requiring the entire codebase to be redesigned.

## Real-Time Communication

Ember uses **Socket.IO** on both the client and server to support real-time functionality.

```text
Client
  │
  │ Socket.IO
  ▼
Server
  │
  ▼
Real-time events
```

This provides the foundation for features that require updates without continuously refreshing the page.

## Authentication

The application supports authentication using:

* Google OAuth
* JSON Web Tokens (JWT)

Google authentication is handled using Google's authentication libraries, while JWT is used for maintaining authenticated sessions between the client and server.

## Media Management

Ember uses **Cloudinary** for media management, allowing uploaded images and other supported media to be handled separately from the application's core server infrastructure.

## Code Quality

The frontend includes ESLint and Prettier to help maintain consistent and clean code.

Run:

```bash
npm run lint
```

before submitting changes to help identify potential issues.

## Contributing

Contributions are welcome.

### 1. Fork the repository

Create your own fork of the repository.

### 2. Clone your fork

```bash
git clone <your-fork-url>
cd ember
```

### 3. Create a branch

```bash
git checkout -b feature/your-feature
```

### 4. Make your changes

Implement your feature or fix.

### 5. Commit your changes

```bash
git add .
git commit -m "Add your change"
```

### 6. Push your branch

```bash
git push origin feature/your-feature
```

### 7. Create a Pull Request

Open a Pull Request against the main Ember repository and describe the changes you made.

## License

This project is currently licensed under the ISC License.

## Live Demo

https://ember-beta-two.vercel.app/
