package com.hahn.hahnbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication  // scans sub-packages by default
public class HahnBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(HahnBackendApplication.class, args);
    }
}
