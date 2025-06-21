package com.hahn.hahnbackend.repository;

import com.hahn.hahnbackend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByCategoryContainingIgnoreCase(String category);
    List<Job> findByRemote(boolean remote);
    List<Job> findByTitleContainingIgnoreCase(String title);
}