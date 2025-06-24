# 🧑‍💼 Hahn Job Portal – Full Stack CRUD Application

A modern CRUD job portal built with **Spring Boot**, **React.js**, **PostgreSQL**, and **Docker**.

---

## 📥 Download

[Download ZIP](https://github.com/zakaria0001/HAHN-CRUD/archive/refs/heads/main.zip)

Or clone it:

```bash
git clone https://github.com/zakaria0001/HAHN-CRUD.git
```

---

## 📁 Project Structure

```
HAHN-CRUD/
├── backend/
│   └── hahn-backend/       # Spring Boot API
├── frontend/
│   └── hahn-task/          # React frontend
├── docker-compose.yml
├── README.md
```

---

## 🧠 Backend – Spring Boot

### 🛠️ Prerequisites

- Java 17+
- PostgreSQL 12+
- Maven

### 🚀 Run Backend Locally

1. Navigate to backend:

```bash
cd backend/hahn-backend
```

2. Setup PostgreSQL:

```sql
CREATE DATABASE hahn_db;
CREATE USER hahn_user WITH ENCRYPTED PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE hahn_db TO hahn_user;
```

3. Configure `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/hahn_db
spring.datasource.username=hahn_user
spring.datasource.password=admin

spring.jpa.hibernate.ddl-auto=create
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.sql.init.mode=always
spring.sql.init.data-locations=classpath:data.sql
spring.jpa.defer-datasource-initialization=true
server.port=8180
```

4. Build and run:

```bash
./mvnw clean package
java -jar target/hahnbackend-0.0.1-SNAPSHOT.jar
```

API: `http://localhost:8180/api/jobs`

---

## 💻 Frontend – React

### 🛠️ Prerequisites

- Node.js 18+
- npm

### 🚀 Run Frontend Locally

```bash
cd frontend/hahn-task
npm install
npm start
```

Runs on: `http://localhost:3000`

---

## 🐳 Dockerized Setup (Recommended)

### 🧰 Requirements

- Docker
- Docker Compose

### 🚀 Run Entire Stack

```bash
docker-compose up --build
```

### Ports:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8180](http://localhost:8180)
- PostgreSQL: `localhost:5432`

---

## 🗃️ Database Schema

- **Job**: title, salary, remote, category, description, keywords
- **Company**: name, location
- **Applicant**: name, email, linked to job

All tables use `BIGSERIAL` for `id` auto-generation.

---

## ⚠️ Common Issues

- **Missing PostgreSQL connection**: ensure Docker PostgreSQL service is healthy.
- **Spring Boot port in use**: free port 8180 or change `server.port`.
- **Frontend can’t reach backend**: check CORS settings or use relative paths in API calls.

---

## 📩 Contact

Built by [Zakaria Nabil](mailto:zakarianabil68@gmail.com)

---

🎉 Enjoy coding!