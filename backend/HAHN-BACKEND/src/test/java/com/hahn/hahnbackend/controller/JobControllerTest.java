package com.hahn.hahnbackend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hahn.hahnbackend.model.Job;
import com.hahn.hahnbackend.repository.JobRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.Mockito;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
@WebMvcTest(
        controllers = JobController.class,
        excludeAutoConfiguration = {
                SecurityAutoConfiguration.class,
                SecurityFilterAutoConfiguration.class
        }
)
public class JobControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private JobRepository jobRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Job sampleJob;

    @BeforeEach
    void setup() {
        sampleJob = new Job();
        sampleJob.setId(1L);
        sampleJob.setTitle("Full Stack Developer");
        sampleJob.setCategory("Programming");
        sampleJob.setSalary(90000.0);
        sampleJob.setRemote(true);
        // set other properties as needed
    }

    @Test
    void testGetAllJobs() throws Exception {
        when(jobRepository.findAll()).thenReturn(List.of(sampleJob));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/jobs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(sampleJob.getId()))
                .andExpect(jsonPath("$[0].title").value(sampleJob.getTitle()))
                .andExpect(jsonPath("$[0].category").value(sampleJob.getCategory()))
                .andExpect(jsonPath("$[0].salary").value(sampleJob.getSalary()))
                .andExpect(jsonPath("$[0].remote").value(sampleJob.isRemote()));
    }

    @Test
    void testGetJobById_found() throws Exception {
        when(jobRepository.findById(anyLong())).thenReturn(Optional.of(sampleJob));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/jobs/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(sampleJob.getId()))
                .andExpect(jsonPath("$.title").value(sampleJob.getTitle()));
    }

    @Test
    void testGetJobById_notFound() throws Exception {
        when(jobRepository.findById(anyLong())).thenReturn(Optional.empty());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/jobs/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCreateJob() throws Exception {
        when(jobRepository.save(Mockito.any(Job.class))).thenReturn(sampleJob);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/jobs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleJob)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value(sampleJob.getTitle()));
    }
}
