package be.ucll.se.courses.backend.repository;

import be.ucll.se.courses.backend.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findBySchedule_Id(Long scheduleId);
}