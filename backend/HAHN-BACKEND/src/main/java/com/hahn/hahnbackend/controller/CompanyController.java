package com.hahn.hahnbackend.controller;

import com.hahn.hahnbackend.model.Company;
import com.hahn.hahnbackend.repository.CompanyRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyRepository companyRepo;

    public CompanyController(CompanyRepository companyRepo) {
        this.companyRepo = companyRepo;
    }

    @GetMapping
    public List<Company> getAllCompanies() {
        return companyRepo.findAll();
    }
}
