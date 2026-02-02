package com.university.scheduling.repository;

import com.university.scheduling.model.Semester;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SemesterRepository extends JpaRepository<Semester, Long> {
    boolean existsByAcronym(String acronym);
}
