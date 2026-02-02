package com.university.scheduling.service;

import com.university.scheduling.model.Semester;
import com.university.scheduling.repository.SemesterRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SemesterService {

    private final SemesterRepository semesterRepository;

    public SemesterService(SemesterRepository semesterRepository) {
        this.semesterRepository = semesterRepository;
    }

    public Semester createSemester(Semester semester) {
        if (semester.getEndDate().isBefore(semester.getStartDate())) {
            throw new IllegalArgumentException("End date cannot be before start date");
        }

        if (semesterRepository.existsByAcronym(semester.getAcronym())) {
            throw new IllegalArgumentException("Semester acronym already exists");
        }

        return semesterRepository.save(semester);
    }

    public List<Semester> getAllSemesters() {
        return semesterRepository.findAll();
    }

    public Semester updateSemester(Long id, Semester updatedSemester) {
        Semester existing = semesterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Semester not found"));

        if (updatedSemester.getEndDate().isBefore(updatedSemester.getStartDate())) {
            throw new IllegalArgumentException("End date cannot be before start date");
        }

        existing.setName(updatedSemester.getName());
        existing.setAcronym(updatedSemester.getAcronym());
        existing.setStartDate(updatedSemester.getStartDate());
        existing.setEndDate(updatedSemester.getEndDate());

        return semesterRepository.save(existing);
    }
}
