package be.ucll.se.courses.backend.service;

import be.ucll.se.courses.backend.exception.NotFoundException;
import be.ucll.se.courses.backend.model.Lecturer;
import be.ucll.se.courses.backend.repository.LecturerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LecturerService {
    private final LecturerRepository lecturerRepository;

    public LecturerService(LecturerRepository lecturerRepository) {
        this.lecturerRepository = lecturerRepository;
    }

    public List<Lecturer> getAllLecturers() {
        return lecturerRepository.findAll();
    }

    public Lecturer getLecturerById(long id) {
        return lecturerRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Lecturer with id " + id + " not found"));
    }
}
