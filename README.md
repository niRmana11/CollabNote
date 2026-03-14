# CollabNote Notes Application


A full-stack collaborative note-taking web application that allows users to create, manage, and share notes with other users. The system supports real-time collaboration features such as shared notes, collaborator management, rich text editor and full-text search for efficient note retrieval.

This project demonstrates modern full-stack development practices, including secure authentication, role-based authorization, RESTful API design, and a responsive frontend interface.

---

## Features

### User Authentication

- User registration and login
- JWT-based authentication
- Protected API routes
- Secure user session handling

### Notes Management

- Create new notes
- Edit existing notes
- Soft delete notes
- View all personal notes

### Collaboration

- Add collaborators to notes via email
- Remove collaborators
- View notes shared by other users
- Access shared notes in a dedicated section

### Authorization

Role-based access control ensures secure collaboration:

| Action              | Owner | Collaborator |
| ------------------- | ----- | ------------ |
| View Note           | Yes   | Yes          |
| Edit Note           | Yes   | Yes          |
| Delete Note         | Yes   | No           |
| Add Collaborator    | Yes   | No           |
| Remove Collaborator | Yes   | No           |

## Full-Text Search

Users can search notes using MongoDB full-text search across:

* Note title
* Note content

This enables fast and efficient searching within large note collections.

## User Interface

* Dashboard displaying user notes
* Sidebar navigation
* Shared notes section
* Search functionality
* Clean and responsive layout

---

# Technology Stack

## Frontend

* React
* React Router
* Tailwind CSS
* Axios

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Authentication

* JSON Web Tokens (JWT)

---

# Project Structure

```
CollabNote/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── noteController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Note.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── noteRoutes.js
│   ├── services/
│   │   ├── authService.js
│   │   └── noteService.js
│   └── server.js
│
└── frontend/
    └── src/
        ├── api/
        │   ├── axiosClient.js
        │   └── notesApi.js
        ├── components/
        │   ├── CreateNote.jsx
        │   ├── NavBar.jsx
        │   ├── NotesList.jsx
        │   └── Sidebar.jsx
        ├── context/
        │   └── AuthContext.jsx
        ├── layouts/
        │   └── DashboardLayout.jsx
        ├── pages/
        │   ├── Collaborators.jsx
        │   ├── CreateNote.jsx
        │   ├── Dashboard.jsx
        │   ├── EditNote.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── SharedNotes.jsx
        ├── routes/
        │   └── ProtectedRoute.jsx
        ├── App.jsx
        ├── index.css
        └── main.jsx
```

---

# Database Design

## User Model

```
User
 ├── name
 ├── email
 ├── password
 └── timestamps
```

## Note Model

```
Note
 ├── title
 ├── content
 ├── owner (User reference)
 ├── collaborators (array of User references)
 ├── isDeleted
 └── timestamps
```

MongoDB full-text index:

```
noteSchema.index({ title: "text", content: "text" })
```

---

# API Endpoints

## Authentication

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/register | Register new user |
| POST   | /api/auth/login    | Login user        |

---

## Notes

| Method | Endpoint          | Description                |
| ------ | ----------------- | -------------------------- |
| GET    | /api/notes        | Get user notes             |
| GET    | /api/notes/shared | Get notes shared with user |
| GET    | /api/notes/:id    | Get single note            |
| POST   | /api/notes        | Create new note            |
| PUT    | /api/notes/:id    | Update note                |
| DELETE | /api/notes/:id    | Delete note                |

---

## Collaboration

| Method | Endpoint                             | Description         |
| ------ | ------------------------------------ | ------------------- |
| POST   | /api/notes/:id/collaborators         | Add collaborator    |
| DELETE | /api/notes/:id/collaborators/:userId | Remove collaborator |

---

# Security Implementation

## Authentication

* JWT tokens are generated during login.
* Tokens are validated using middleware before accessing protected routes.

## Authorization

Access to notes is restricted based on user roles:

* Owners have full control.
* Collaborators can only edit shared notes.

Backend checks ensure that unauthorized actions are blocked.

---

# Full-Text Search Implementation

MongoDB text indexes enable efficient search across note titles and contents.

Search query example:

```
GET /api/notes?search=meeting
```

MongoDB uses the `$text` operator:

```
{ $text: { $search: search } }
```

This allows fast keyword-based searching within notes.

---

# Installation

## Clone Repository

```
git clone https://github.com/yourusername/collaborative-notes-app.git
cd collaborative-notes-app
```

---

## Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```
npm run dev
```

---

## Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

Backend API:

```
http://localhost:5000
```

---














