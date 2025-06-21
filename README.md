# Hahn Backend

This is the backend service for the Hahn job portal project built with Spring Boot, JPA/Hibernate, and PostgreSQL.

---

## Prerequisites

- Java 17+ (or compatible JDK)
- PostgreSQL 12+ (running locally or remotely)
- Maven or Gradle (depending on your build setup)
- (Optional) IDE like IntelliJ IDEA or VS Code

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/zakaria0001/HAHN-CRUD.git
cd hahn-backend
```

### 2. Configure PostgreSQL database

- Create a new database in PostgreSQL for this project, e.g., `hahn_db`
- Create a user with appropriate privileges or use your existing user

Example commands (PostgreSQL CLI):

```sql
CREATE DATABASE hahn_db;
CREATE USER hahn_user WITH ENCRYPTED PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE hahn_db TO hahn_user;
```

### 3. Update application properties

Edit `src/main/resources/application.properties` to reflect your PostgreSQL settings:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/hahn_db
spring.datasource.username=hahn_user
spring.datasource.password=admin

spring.jpa.hibernate.ddl-auto=none
spring.sql.init.mode=always
```

### 4. Database schema and data initialization

- The database schema will be created automatically by `schema.sql` on application startup.
- Initial sample data will be loaded from `data.sql`.

Make sure both files exist in `src/main/resources/`.

### 5. Build and run the application

Using Maven:

```bash
./mvnw clean spring-boot:run
```

Or build a jar and run:

```bash
./mvnw clean package
java -jar target/hahnbackend-0.0.1-SNAPSHOT.jar
```

### 6. Test the application

The API will be available at `http://localhost:8080/`.

You can test endpoints like:

- `GET /jobs` — list jobs
- `GET /companies` — list companies
- `GET /applicants` — list applicants

---

## Troubleshooting

- If you get errors about `NULL` values for primary keys, make sure your `schema.sql` uses `BIGSERIAL` for auto-generated IDs and your inserts do **not** specify the `id` column.
- Verify PostgreSQL is running and accessible with the credentials configured.
- Use logs for detailed errors (`application.properties` logging level can be set).

---

## Contact

For any questions or help, contact [NABIL Zakaria](mailto:zakarianabil68@gmail.com).

---

Happy coding! 🚀
