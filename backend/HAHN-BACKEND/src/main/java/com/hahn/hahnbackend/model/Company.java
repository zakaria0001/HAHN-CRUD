package com.hahn.hahnbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

@Entity
public class Company {
    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String name;

    private String industry;

    @OneToMany(mappedBy = "company")
    @JsonIgnoreProperties("company") // Ignore company inside jobs
    private List<Job> jobs;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
