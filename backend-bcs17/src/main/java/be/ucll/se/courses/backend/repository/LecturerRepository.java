package be.ucll.se.courses.backend.repository;

import be.ucll.se.courses.backend.model.Lecturer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LecturerRepository extends JpaRepository<Lecturer, Long> {
}
