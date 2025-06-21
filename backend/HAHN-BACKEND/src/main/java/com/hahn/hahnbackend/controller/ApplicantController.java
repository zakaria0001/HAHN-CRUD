package com.hahn.hahnbackend.controller;

import com.hahn.hahnbackend.model.Applicant;
import com.hahn.hahnbackend.repository.ApplicantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/api/applicants")
public class ApplicantController {

    private ApplicantRepository repo;

    @PostMapping
    public Applicant apply(@RequestBody Applicant applicant) {
        return repo.save(applicant);
    }

    @GetMapping("/job/{jobId}")
    public List<Applicant> getApplicants(@PathVariable Long jobId) {
        return repo.findAll().stream()
                .filter(a -> a.getJob() != null && a.getId().equals(jobId))
                .toList();
    }

}
