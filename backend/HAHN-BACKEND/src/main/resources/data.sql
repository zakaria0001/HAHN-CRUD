-- ====================
-- Insert into Company
-- ====================
INSERT INTO company (id, name, industry) VALUES (1, 'Google', 'Technology');
INSERT INTO company (id, name, industry) VALUES (2, 'Amazon', 'E-commerce');
INSERT INTO company (id, name, industry) VALUES (3, 'Netflix', 'Entertainment');
INSERT INTO company (id, name, industry) VALUES (4, 'Tesla', 'Automotive');
INSERT INTO company (id, name, industry) VALUES (5, 'Airbnb', 'Hospitality');

-- ================
-- Insert into Job
-- ================
INSERT INTO job (
    id, title, description, category, salary, remote, keywords, company_id
) VALUES
      (1, 'Full Stack Developer', 'Build and maintain full-stack applications.', 'Programming', 90000, true, 'Java,Spring Boot,React', 1),
      (2, 'Data Analyst', 'Analyze and visualize business data.', 'Analytics', 70000, false, 'SQL,Python,PowerBI', 2),
      (3, 'DevOps Engineer', 'Maintain CI/CD pipelines and cloud infrastructure.', 'Infrastructure', 85000, true, 'Docker,Kubernetes,AWS', 3),
      (4, 'UX Designer', 'Design user-centric interfaces for mobile and web.', 'Design', 75000, false, 'Figma,Adobe XD,User Research', 4),
      (5, 'Product Manager', 'Drive product vision and execution.', 'Management', 95000, true, 'Agile,JIRA,Strategy', 5),
      (6, 'Backend Engineer', 'Develop scalable backend APIs and services.', 'Programming', 88000, true, 'Node.js,PostgreSQL,AWS', 1),
      (7, 'QA Tester', 'Test software and automate test suites.', 'Quality Assurance', 68000, false, 'Selenium,JUnit,Cypress', 2);

-- =====================
-- Insert into Applicant
-- =====================
INSERT INTO applicant (id, name, email, job_id) VALUES
                                                    (1, 'Alice Smith', 'alice@example.com', 1),
                                                    (2, 'Bob Johnson', 'bob@example.com', 1),
                                                    (3, 'Charlie Davis', 'charlie@example.com', 2),
                                                    (4, 'Dana Lee', 'dana@example.com', 3),
                                                    (5, 'Evan Turner', 'evan@example.com', 4),
                                                    (6, 'Fiona White', 'fiona@example.com', 5),
                                                    (7, 'George Kim', 'george@example.com', 6),
                                                    (8, 'Hannah Wu', 'hannah@example.com', 7);
