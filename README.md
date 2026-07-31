# 🍔 Fooddy – Food Ordering Platform

![React](https://img.shields.io/badge/React-Frontend-blue)
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Docker](https://img.shields.io/badge/Docker-Container-blue)
![AWS](https://img.shields.io/badge/AWS-Cloud-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

# 📌 Project Overview

Fooddy is a full-stack Food Ordering Platform developed using React, Node.js, Express.js, and MongoDB.

The project enables users to browse food items, place orders, and manage their accounts through a responsive web application. It is designed for production deployment using Docker, AWS, Jenkins, GitHub Actions, and modern DevOps practices.

---

# ✨ Features

- User Authentication
- Food Menu Management
- Online Food Ordering
- Shopping Cart
- Order Management
- User Profile Management
- Responsive User Interface
- RESTful APIs
- Secure Authentication
- Production Ready Deployment

---

# 🛠 Technology Stack

## Frontend

- React.js
- HTML5
- CSS3
- JavaScript

## Backend

- Node.js
- Express.js

## Database

- MongoDB

## DevOps

- Docker
- AWS EC2
- Jenkins
- GitHub Actions
- Nginx
- PM2

---

# 📂 Project Structure

```text
Fooddy/

├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# 🏗 System Architecture

```text
                Users
                   │
                   ▼
           React Frontend
                   │
                   ▼
            Nginx Reverse Proxy
                   │
                   ▼
          Node.js + Express API
                   │
                   ▼
             MongoDB Database
```

---

# ☁ AWS Deployment Architecture

```text
                Internet
                    │
                    ▼
          AWS Security Group
                    │
                    ▼
            Amazon EC2 Instance
                    │
         ┌──────────┴──────────┐
         │                     │
         ▼                     ▼
       Nginx           Docker Container
                               │
                               ▼
                     Node.js Application
                               │
                               ▼
                        MongoDB Atlas
```

---

# 🚀 Local Installation

Clone the repository

```bash
git clone https://github.com/varaprasad-h/fooddy.git

cd fooddy
```

Install Backend Dependencies

```bash
cd backend
npm install
```

Install Frontend Dependencies

```bash
cd frontend
npm install
```

Run Backend

```bash
npm start
```

Run Frontend

```bash
npm start
```

---

# 🐳 Docker Deployment

Build Docker Image

```bash
docker build -t fooddy .
```

Run Docker Container

```bash
docker run -d -p 3000:3000 fooddy
```

---

# ☁ AWS Deployment

The application can be deployed using:

- AWS EC2
- Docker
- Nginx
- Jenkins
- GitHub Actions

Deployment Flow

```text
GitHub

↓

GitHub Actions

↓

Jenkins

↓

Docker Build

↓

Amazon EC2

↓

Nginx

↓

Users
```

---

# ⚙ CI/CD Pipeline

```text
Developer

↓

GitHub Repository

↓

GitHub Actions

↓

Jenkins Pipeline

↓

Docker Build

↓

Deploy to AWS EC2

↓

Application Live
```

---

# 📊 Monitoring

Recommended Monitoring Stack

- Prometheus
- Grafana
- Node Exporter

---

# 🔐 Security

- JWT Authentication
- Password Encryption
- Environment Variables
- Secure REST APIs
- HTTPS Ready
- Nginx Reverse Proxy

---

# 🚀 Future Enhancements

- Kubernetes Deployment
- Helm Charts
- Terraform Infrastructure
- AWS EKS
- Prometheus & Grafana Monitoring
- GitOps with Argo CD
- Auto Scaling
- Application Load Balancer

---

# 👨‍💻 Contributors

- Vara Prasad Renati
- Samyou02

---

# ⭐ Support

If you found this project useful,

⭐ Star this repository.

---

# 📜 License

MIT License
