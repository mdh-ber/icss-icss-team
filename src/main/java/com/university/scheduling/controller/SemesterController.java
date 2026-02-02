package com.university.scheduling.controller;

import com.university.scheduling.model.Semester;
import com.university.scheduling.service.SemesterService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/semesters")
@CrossOrigin(origins = "*")
public class SemesterController {

    private final SemesterService semesterService;

    public SemesterController(SemesterService semesterService) {
        this.semesterService = semesterService;
    }

    @PostMapping
    public Semester createSemester(@RequestBody Semester semester) {
        return semesterService.createSemester(semester);
    }

    @GetMapping
    public List<Semester> getAllSemesters() {
        return semesterService.getAllSemesters();
    }

    @PutMapping("/{id}")
    public Semester updateSemester(@PathVariable Long id, @RequestBody Semester semester) {
        return semesterService.updateSemester(id, semester);
    }
}
