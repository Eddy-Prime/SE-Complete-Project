package be.ucll.se.courses.backend.controller;

import be.ucll.se.courses.backend.model.Lecturer;
import be.ucll.se.courses.backend.service.LecturerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lecturers")
public class LecturerController {
    private final LecturerService lecturerService;

    public LecturerController(LecturerService lecturerService) {
        this.lecturerService = lecturerService;
    }

    @GetMapping
    public List<Lecturer> getLecturers() {
        return lecturerService.getAllLecturers();
    }

    @GetMapping("/{id}")
    public Lecturer getLecturerById(@PathVariable long id) {
        return lecturerService.getLecturerById(id);
    }
}
