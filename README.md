# TrainerPr0: Full-Stack Personal Trainer Platform

This is a complete, full-stack web application built for a personal trainer to manage client bookings and for clients to register, log in, and schedule sessions. The project was built from the ground up, featuring a modern, animated frontend and a robust, secure backend API.

**Live Application:** [https://trainerpr0.netlify.app](https://trainerpr0.netlify.app)
**Live Backend API:** [https://personal-trainer-backend.herokuapp.com](https://personal-trainer-backend.herokuapp.com)

---

## Key Features & Accomplishments

- **Modern Frontend:** A responsive, animated, and feature-rich Next.js application built with TypeScript and styled with Tailwind CSS and Framer Motion for a smooth user experience.

- **Secure Backend:** A robust Express.js backend provides a complete API with secure, JWT-based authentication for both clients and the trainer, including password hashing with `bcryptjs`.

- **Full-Stack Connectivity:** The frontend and backend are fully integrated, communicating securely between the Netlify and Heroku hosting platforms, with a CORS policy configured for security.

- **Production Database:** Successfully migrated the application from a local SQLite database to a cloud-hosted **Heroku Postgres** database—a critical step for building a scalable, real-world application.

- **Continuous Deployment (CI/CD):**

  - The **frontend** is deployed to **Netlify**, automatically rebuilding from the `main` GitHub branch.
  - The **backend** is deployed to **Heroku**, also rebuilding from its own `main` GitHub branch.

- **Email Integration:**

  - **Contact Form:** Securely sends emails from the frontend using **EmailJS**.
  - **Booking Notifications:** The backend uses **Nodemailer** to send booking confirmation emails.

- **Real-World Problem Solving:** Successfully navigated and resolved numerous professional deployment challenges, including Git versioning conflicts, database syntax incompatibilities, CORS policy errors, and environment variable management.

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Production), SQLite (Development)
- **Authentication:** JSON Web Tokens (JWT), bcrypt.js
- **Deployment & Hosting:** Netlify (Frontend), Heroku (Backend)

---

This project represents a complete development lifecycle, from initial concept and local development to a final, dual-platform production deployment.
