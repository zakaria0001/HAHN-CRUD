package com.hahn.hahnbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Applicant {
    @Id @GeneratedValue
    private Long id;

    @NotBlank
    private String name;
    private String email;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    // ✅ Getter and Setter for job
    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    // ✅ (Optional) Getter and Setter for other fields
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
