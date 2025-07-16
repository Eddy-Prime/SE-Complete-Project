package be.ucll.se.courses.backend.service;

import be.ucll.se.courses.backend.exception.NotFoundException;
import be.ucll.se.courses.backend.model.Course;
import be.ucll.se.courses.backend.repository.CourseRepository;
import org.springframework.stereotype.Service;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course getCourseById(long id) {
        return courseRepository.findById(id).orElseThrow(() -> new NotFoundException("Course with id " + id + " not found"));
    }
}
