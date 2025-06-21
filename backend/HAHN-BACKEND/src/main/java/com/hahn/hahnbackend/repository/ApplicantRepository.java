package com.hahn.hahnbackend.repository;

import com.hahn.hahnbackend.model.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ApplicantRepository extends JpaRepository<Applicant, Long> {}
