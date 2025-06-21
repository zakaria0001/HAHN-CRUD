-- Insert sample companies
INSERT INTO company (name, industry) VALUES
                                         ('Google', 'Technology'),
                                         ('Amazon', 'E-commerce'),
                                         ('OpenAI', 'Artificial Intelligence');


-- Insert sample jobs
INSERT INTO job (title, description, category, salary, remote, keywords, company_id) VALUES
                                                                                         ('Backend Developer', 'Develop and maintain REST APIs', 'Software Development', 90000, true, 'java,spring,backend', 1),
                                                                                         ('Frontend Developer', 'Build UI with React.js', 'Software Development', 85000, true, 'javascript,react,frontend', 2),
                                                                                         ('Data Scientist', 'Analyze and build ML models', 'Data Science', 95000, false, 'python,machine learning,ai', 3);

-- Insert sample applicants
INSERT INTO applicant (name, email, job_id) VALUES
                                                ('Alice Johnson', 'alice.johnson@example.com', 1),
                                                ('Bob Smith', 'bob.smith@example.com', 2),
                                                ('Carol Williams', 'carol.williams@example.com', 3);
