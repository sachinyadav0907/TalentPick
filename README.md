# TalentPick 💼

TalentPick is a full-stack MERN-based job portal designed to bridge the gap between job seekers and recruiters through a streamlined and user-friendly platform. The application provides secure authentication, profile management, job posting capabilities, and a responsive user experience, enabling users to efficiently discover opportunities and manage their professional presence.

---

## Screenshots

### Home Page

![Home Page](./Screenshots/home.png)

### Search Jobs

![Search Jobs](./Screenshots/search-jobs.png)

### User Profile

![Profile](./Screenshots/profile.png)

### Edit Profile

![Edit Profile](./Screenshots/edit-profile.png)

### My Jobs

![My Jobs](./Screenshots/my-jobs.png)

### Applicant Tracking

![Applicant Tracking](./Screenshots/applicants-tracking.png)

### Mobile View

![Mobile View](./Screenshots/mobile.png)

---
## Features

### 🔐 Authentication & Authorization

* Secure user registration and login
* JWT-based authentication
* Role-based access control (Candidate & Recruiter)
* Protected routes
* Password encryption using bcrypt

### 👤 User Profile Management

* Create and manage professional profiles
* Update personal and professional information
* Upload and update profile picture
* Upload and update resume
* Cloudinary integration for media storage
* Recruiters can view candidate profiles and resumes

### 💼 Job Management

#### Candidate Features

* Browse all available jobs
* Search jobs by title or keywords
* Filter jobs by location and category
* Apply for jobs
* Save jobs for later
* Track applied jobs

#### Recruiter Features

* Create job postings
* Update existing job listings
* Delete job postings
* View all posted jobs
* Track applicants for each job
* Accept or reject job applications
* View applicant profiles and resumes

### 🛡️ Security

* JWT Authentication
* Password hashing using bcrypt
* Protected API routes
* API rate limiting
* Input validation
* Environment variable protection
* Secure authentication workflow

### 🎨 Frontend Experience

* Responsive user interface
* Modern UI built with Tailwind CSS
* React Router-based navigation
* Context API for state management
* Optimized user interactions
* Clean and intuitive user experience

---

### Authentication & Authorization

- Secure user registration and login
- JWT-based authentication
- Protected routes
- Role-based access control
- Password encryption using bcrypt

### User Profile Management

- Create and manage user profiles
- Update personal and professional information
- Profile image upload and management
- Cloudinary integration for image storage

### Job Management

- Create job postings
- Update existing job listings
- Delete job postings
- View jobs created by the user
- Browse and explore available jobs

### Security

- API rate limiting
- Input validation and sanitization
- Environment variable protection
- Secure authentication workflow

### Frontend Experience

- Responsive user interface
- React Router-based navigation
- Context API for state management
- Optimized user interactions

---

## Technology Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Context API
- Taiwind CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication & Security

- JSON Web Token (JWT)
- bcrypt.js
- Express Rate Limit
- CORS
- dotenv

### Cloud Services

- Cloudinary

---

## Project Structure

```bash
TalentPick
│
├── backend
│   ├── Config
│   ├── Controllers
│   ├── Middleware
│   ├── Model
│   ├── Routes
│   ├── Utility
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── Components
│   │   ├── Contexts
│   │   ├── Pages
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── index.html
│
├── Screenshots
│
└── README.md
```

---

## Getting Started

### Prerequisites

Ensure the following are installed on your system:

- Node.js
- npm
- MongoDB Atlas or Local MongoDB

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/sachinyadav0907/TalentPick.git
```

```bash
cd TalentPick
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## Environment Variables

Create a `.env` file inside the `backend` directory and configure the following variables:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at:

```bash
http://localhost:5173
```

The backend server will run at:

```bash
http://localhost:5000
```
---

## Core Functionalities

* JWT Authentication & Role-Based Authorization
* Candidate & Recruiter Role Management
* Professional Profile Management
* Profile Picture Upload
* Resume Upload & Management
* Cloudinary Integration
* Job Posting & Management
* Job Search & Filtering
* Saved Jobs
* Apply for Jobs
* Applicant Tracking System
* Accept & Reject Applications
* Recruiter Profile Access
* Protected API Routes
* Responsive Frontend Design
* State Management using Context API

---

## Future Enhancements

* Admin Dashboard
* Real-Time Chat Between Recruiters & Candidates
* Modern UI/UX Improvements
* Email Notifications
* Docker Containerization
* Nginx Reverse Proxy
* CI/CD Pipeline using GitHub Actions
* Production Deployment
* Redis Caching
* Interview Scheduling
* Real-Time Notifications
* Analytics Dashboard

---


## License

This project is licensed under the MIT License.

---

## Author

**Sachin Yadav**

BSc Information Technology Student  
MERN Stack Developer | DevOps Enthusiast

If you found this project useful, consider giving it a star ⭐ on GitHub.
