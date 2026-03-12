# CollabNote

CollabNote is a collaborative note-taking web application built with the MERN stack.

## Tech Stack

- MongoDB
- Express.js
- React
- Node.js
- Tailwind CSS

## Backend Features

- JWT Authentication (Register / Login)
- Notes CRUD API
- Full-text search using MongoDB text index
- Collaborator management for shared notes
- Soft delete for notes

## API Endpoints

### Auth

POST /api/auth/register  
POST /api/auth/login

### Notes

GET /api/notes  
GET /api/notes/:id  
POST /api/notes  
PUT /api/notes/:id  
DELETE /api/notes/:id

### Collaborators

POST /api/notes/:id/collaborators  
DELETE /api/notes/:id/collaborators
