-- Company table
CREATE TABLE IF NOT EXISTS company (
                                       id BIGSERIAL PRIMARY KEY,
                                       name VARCHAR(255) NOT NULL,
    industry VARCHAR(255)
    );

-- Job table
CREATE TABLE IF NOT EXISTS job (
                                   id BIGSERIAL PRIMARY KEY,
                                   title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(255),
    salary DOUBLE PRECISION,
    remote BOOLEAN,
    keywords VARCHAR(255),
    company_id BIGINT NOT NULL,
    CONSTRAINT fk_company FOREIGN KEY (company_id) REFERENCES company(id)
    );

-- Applicant table
CREATE TABLE IF NOT EXISTS applicant (
                                         id BIGSERIAL PRIMARY KEY,
                                         name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    job_id BIGINT,
    CONSTRAINT fk_job FOREIGN KEY (job_id) REFERENCES job(id)
    );
ALTER TABLE job
    ALTER COLUMN created_at SET DEFAULT NOW();


ALTER TABLE applicant
DROP CONSTRAINT fkt74cl2p3amxj0ukd6ngwdryvl;

ALTER TABLE applicant
    ADD CONSTRAINT fkt74cl2p3amxj0ukd6ngwdryvl
        FOREIGN KEY (job_id)
            REFERENCES job(id)
            ON DELETE CASCADE;
