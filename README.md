<div align="center">

# Admin Dashboard Backend API

<p>Express.js & Prisma ORM REST API for Admin Analytics & User Metrics</p>

![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Express.js](https://img.shields.io/badge/Express.js-blue?style=flat-square) ![Node.js](https://img.shields.io/badge/Node.js-blue?style=flat-square) ![Prisma ORM](https://img.shields.io/badge/Prisma%20ORM-blue?style=flat-square) ![Bcrypt](https://img.shields.io/badge/Bcrypt-blue?style=flat-square) ![JWT](https://img.shields.io/badge/JWT-blue?style=flat-square)

</div>

---

## Overview
A secure Express.js REST API providing statistical data feeds, user authentication, role management, and operational activity logging for administrative dashboards.

---

## Key Features
- Secure user authentication with bcrypt password hashing
- Prisma ORM data layer for high-performance relational queries
- CORS enabled with configurable security headers

---

## Tech Stack
- **Framework**: Express.js
- **ORM**: Prisma ORM
- **Security**: Bcrypt, JWT, CORS
- **Runtime**: Node.js

---

## Project Structure
```text
advanced-admin-dashboard-backend/
├── src/                # Controllers, routes, and middleware
├── prisma/             # Schema and database migrations
└── package.json
```

---

## Getting Started

### Prerequisites
Make sure you have the required runtimes and tools installed on your machine:
- Node.js (v18+ recommended) / Appropriate runtime
- Git

### Installation & Local Setup
```bash
git clone https://github.com/MohammadKevin/advanced-admin-dashboard-backend.git
cd advanced-admin-dashboard-backend
npm install
npx prisma migrate dev
npm run dev
```

---

## Author
**Mohammad Kevin Arif Rudianto**
- **GitHub:** [@MohammadKevin](https://github.com/MohammadKevin)
- **Portfolio:** [portfolio-mohammadkevin.vercel.app](https://portfolio-mohammadkevin.vercel.app)
- **LinkedIn:** [Mohammad Kevin](https://www.linkedin.com/in/mohammad-kevin-arif-rudianto-945733347)
- **Email:** [kvn4.200581@gmail.com](mailto:kvn4.200581@gmail.com)

---

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

<div align="center">
If you found this repository useful, please consider giving it a star!
</div>
