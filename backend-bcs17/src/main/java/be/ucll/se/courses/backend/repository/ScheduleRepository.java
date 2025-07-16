package be.ucll.se.courses.backend.repository;

import be.ucll.se.courses.backend.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByLecturer_User_Username(String username);
    boolean existsByCourse_IdAndLecturer_Id(Long courseId, Long lecturerId);
}
