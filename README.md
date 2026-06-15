# TalentPick 💼

TalentPick is a full-stack MERN-based job portal designed to bridge the gap between job seekers and recruiters through a streamlined and user-friendly platform. The application provides secure authentication, profile management, job posting capabilities, and a responsive user experience, enabling users to efficiently discover opportunities and manage their professional presence.

---

## Features

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
- Vite
- React Router DOM
- Axios
- Context API
- CSS3

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

## Screenshots

### Home Page

![Home Page](./Screenshots/home.png)

### User Profile

![Profile](./Screenshots/profile.png)

### Edit Profile

![Edit Profile](./Screenshots/edit-profile.png)

### My Jobs

![My Jobs](./Screenshots/my-jobs.png)

### Mobile View

![Mobile View](./Screenshots/mobile.png)
---

## Core Functionalities

- User Authentication and Authorization
- Profile Creation and Management
- Cloud-Based Image Uploads
- Job Posting and Management
- Protected API Routes
- Secure Backend Architecture
- Responsive Frontend Design
- State Management using Context API

---

## Future Enhancements

- Resume Upload Support
- Job Application Tracking
- Saved Jobs Functionality
- Recruiter Dashboard
- Admin Management Panel
- Advanced Search and Filtering
- Email Notifications
- Real-Time Updates

---

## License

This project is licensed under the MIT License.

---

## Author

**Sachin**

BSc Information Technology Student  
MERN Stack Developer | DevOps Enthusiast

If you found this project useful, consider giving it a star ⭐ on GitHub.