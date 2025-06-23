package com.hahn.hahnbackend.controller;

import com.hahn.hahnbackend.model.Company;
import com.hahn.hahnbackend.model.Job;
import com.hahn.hahnbackend.repository.CompanyRepository;
import com.hahn.hahnbackend.repository.JobRepository;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobRepository jobRepo;
    private final CompanyRepository companyRepo;

    // Constructor injection for both repositories
    public JobController(JobRepository jobRepo, CompanyRepository companyRepo) {
        this.jobRepo = jobRepo;
        this.companyRepo = companyRepo;
    }

    @GetMapping
    public List<Job> getAll() {
        return jobRepo.findAll();
    }

    @PostMapping
    public Job create(@Valid @RequestBody Job job) {
        System.out.println("Received job company: " + job.getCompany());
        if (job.getCompany() == null || job.getCompany().getId() == null) {
            throw new RuntimeException("Company is required");
        }
        Company company = companyRepo.findById(job.getCompany().getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));
        System.out.println("Company: " + company);
        job.setCompany(company);
        return jobRepo.save(job);
    }



    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id, @RequestBody Job updatedJob) {
        return jobRepo.findById(id)
                .map(existingJob -> {
                    existingJob.setTitle(updatedJob.getTitle());
                    existingJob.setCategory(updatedJob.getCategory());
                    existingJob.setSalary(updatedJob.getSalary());
                    existingJob.setRemote(updatedJob.isRemote());
                    existingJob.setDescription(updatedJob.getDescription());

                    // Important: preserve relationship
                    if (updatedJob.getCompany() != null && updatedJob.getCompany().getId() != null) {
                        Company company = companyRepo.findById(updatedJob.getCompany().getId())
                                .orElseThrow(() -> new RuntimeException("Company not found"));
                        existingJob.setCompany(company);
                    }

                    return jobRepo.save(existingJob);
                })
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

    @GetMapping("/search")
    public List<Job> search(@RequestParam(required = false) String category,
                            @RequestParam(required = false) Boolean remote,
                            @RequestParam(required = false) String title) {

        if (title != null && !title.isEmpty()) {
            return jobRepo.findByTitleContainingIgnoreCase(title);
        }

        if (category != null && !category.isEmpty()) {
            return jobRepo.findByCategoryContainingIgnoreCase(category);
        }

        if (remote != null) {
            return jobRepo.findByRemote(remote);
        }

        return jobRepo.findAll();
    }
    @GetMapping("/{id}")
    public Job getJobById(@PathVariable Long id) {
        return jobRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

}
