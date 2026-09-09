# Social Network

A full-stack social networking application built with **Django REST Framework** and **React**. The application provides JWT-based authentication, user profiles, image-enabled posts, and interactive like/dislike functionality through a RESTful backend and responsive frontend.

## Features

### Authentication & User Management

- User registration with username, email, password, full name, and date of birth
- Optional profile picture upload
- JWT-based authentication using access and refresh tokens
- Protected routes for authenticated users
- Authenticated users can view and update their profiles
- Secure API endpoints using Django REST Framework permissions

### Posts

- Create posts with an optional image and description
- View posts in reverse chronological order
- Delete your own posts
- Post images are organized by username
- Each post stores its author and creation timestamp

### Interactions

- Like and unlike posts
- Dislike and remove dislikes from posts
- Users cannot simultaneously like and dislike the same post
- Real-time like and dislike counts are returned by the API

## Tech Stack

### Frontend

- React
- JavaScript
- CSS
- REST API integration

### Backend

- Python
- Django
- Django REST Framework
- Simple JWT

### Database

- Django ORM
- Relational database support through Django

### DevOps

- Docker
- Docker Compose
- Environment-based configuration

## Project Structure

```text
social-network/
│
├── backend/
│   ├── accounts/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   │
│   ├── posts/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   │
│   ├── social_network/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   │
│   ├── docker-compose.yml
│   ├── manage.py
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── auth/
    │   │   ├── common/
    │   │   ├── posts/
    │   │   └── profile/
    │   ├── api/
    │   ├── styles/
    │   ├── App.js
    │   └── index.js
    │
    └── package.json
```

## API Overview

The backend exposes REST API endpoints for authentication, profile management, and post interactions.

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/accounts/signup/` | Register a new user |
| POST | `/api/accounts/login/` | Authenticate and obtain JWT tokens |

### Profile

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/accounts/profile/` | Retrieve authenticated user's profile |
| PATCH | `/api/accounts/profile/` | Update authenticated user's profile |

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts/` | Retrieve posts |
| POST | `/api/posts/` | Create a new post |
| DELETE | `/api/posts/<id>/` | Delete an owned post |
| POST | `/api/posts/<id>/like/` | Toggle like |
| POST | `/api/posts/<id>/dislike/` | Toggle dislike |

> **Note:** API paths may vary depending on the project's URL configuration.

## Authentication Flow

The application uses **JSON Web Tokens (JWT)** for authentication.

```text
User
 │
 ├── Sign Up ──→ Django REST API
 │                    │
 │                    └── Create User
 │
 └── Login ────→ Django REST API
                      │
                      └── JWT Access + Refresh Tokens
                                  │
                                  ↓
                         Authenticated API Requests
```

Protected endpoints require a valid JWT access token.

## Data Model

The application uses two primary models:

### User

The custom user model extends Django's `AbstractUser` and includes:

- Username
- Email
- Full name
- Date of birth
- Profile picture

### Post

Each post contains:

- Author
- Optional image
- Description
- Creation timestamp
- Likes
- Dislikes

Likes and dislikes are implemented using many-to-many relationships with users.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Python 3.x
- Node.js and npm
- Git
- Docker (optional)

### Clone the Repository

```bash
git clone https://github.com/srivastava-prakhar/Social-Network.git
cd Social-Network
```

## Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run database migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

The backend will be available at:

```text
http://127.0.0.1:8000/
```

## Frontend Setup

Open a new terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend will be available at:

```text
http://localhost:3000/
```

## Docker Setup

The backend includes Docker Compose configuration for containerized development.

From the backend directory:

```bash
docker compose up --build
```

## Environment Variables

Environment-specific configuration is stored using `.env` files.

Do **not** commit sensitive credentials, passwords, secret keys, or other private configuration values to GitHub.

A `.env.example` file can be added to document the required variables without exposing actual secrets.

## Future Improvements

Potential improvements include:

- User-to-user following/friend relationships
- Comments and threaded discussions
- Notifications
- Post editing
- Search functionality
- Pagination for large feeds
- Improved media handling
- Automated testing
- Production deployment configuration

## License

This project is intended for educational and development purposes.