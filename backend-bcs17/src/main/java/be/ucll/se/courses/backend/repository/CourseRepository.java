package be.ucll.se.courses.backend.repository;

import be.ucll.se.courses.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
