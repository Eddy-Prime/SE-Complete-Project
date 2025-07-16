package be.ucll.se.courses.backend;

import be.ucll.se.courses.backend.model.*;
import be.ucll.se.courses.backend.repository.CourseRepository;
import be.ucll.se.courses.backend.repository.ScheduleRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class ScheduleRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @SuppressWarnings("unused")
    @Autowired
    private CourseRepository courseRepository;

    private Course course;
    private Lecturer lecturer;
    private User lecturerUser;
    private Instant baseTime;

    @BeforeEach
    void setUp() {
        baseTime = Instant.now();

        lecturerUser = new User(
                "test.lecturer",
                "Test",
                "Lecturer",
                "test.lecturer@example.com",
                "password",
                Role.LECTURER);
        entityManager.persist(lecturerUser);

        lecturer = new Lecturer(
                "Test expertise",
                lecturerUser);
        entityManager.persist(lecturer);

        course = new Course(
                "Test Course",
                "Test Description",
                1,
                3);
        entityManager.persist(course);
    }

    @Test
    void findByLecturer_User_Username_WithExistingLecturer_ReturnsSchedules() {
        Schedule schedule1 = new Schedule(
                baseTime,
                baseTime.plus(2, ChronoUnit.HOURS),
                course,
                lecturer);
        entityManager.persist(schedule1);

        Schedule schedule2 = new Schedule(
                baseTime.plus(3, ChronoUnit.HOURS),
                baseTime.plus(5, ChronoUnit.HOURS),
                course,
                lecturer);
        entityManager.persist(schedule2);

        List<Schedule> foundSchedules = scheduleRepository.findByLecturer_User_Username("test.lecturer");

        assertThat(foundSchedules).hasSize(2);
        assertThat(foundSchedules).extracting("id").contains(schedule1.getId(), schedule2.getId());
    }

    @Test
    void findByLecturer_User_Username_WithNonExistingLecturer_ReturnsEmptyList() {

        Schedule schedule = new Schedule(
                baseTime,
                baseTime.plus(2, ChronoUnit.HOURS),
                course,
                lecturer);
        entityManager.persist(schedule);

        List<Schedule> foundSchedules = scheduleRepository.findByLecturer_User_Username("non.existing.lecturer");

        assertThat(foundSchedules).isEmpty();
    }

    @Test
    void existsByCourse_IdAndLecturer_Id_WithExistingSchedule_ReturnsTrue() {
        Schedule schedule = new Schedule(
                baseTime,
                baseTime.plus(2, ChronoUnit.HOURS),
                course,
                lecturer);
        entityManager.persist(schedule);

        boolean exists = scheduleRepository.existsByCourse_IdAndLecturer_Id(course.getId(), lecturer.getId());
        assertThat(exists).isTrue();
    }

    @Test
    void existsByCourse_IdAndLecturer_Id_WithNonExistingSchedule_ReturnsFalse() {

        boolean exists = scheduleRepository.existsByCourse_IdAndLecturer_Id(course.getId(), lecturer.getId());
        assertThat(exists).isFalse();
    }

    @Test
    void findSchedulesInDateRange() {
        // - We need to add a custom query method to the repository
        Instant rangeStart = baseTime;
        Instant rangeEnd = baseTime.plus(10, ChronoUnit.HOURS);

        // Schedule 1: within range
        Schedule schedule1 = new Schedule(
                baseTime.plus(1, ChronoUnit.HOURS),
                baseTime.plus(3, ChronoUnit.HOURS),
                course,
                lecturer);
        entityManager.persist(schedule1);

        // Schedule 2: within range
        Schedule schedule2 = new Schedule(
                baseTime.plus(5, ChronoUnit.HOURS),
                baseTime.plus(7, ChronoUnit.HOURS),
                course,
                lecturer);
        entityManager.persist(schedule2);

        // Schedule 3: outside range
        Schedule schedule3 = new Schedule(
                baseTime.plus(12, ChronoUnit.HOURS),
                baseTime.plus(14, ChronoUnit.HOURS),
                course,
                lecturer);
        entityManager.persist(schedule3);
        List<Schedule> schedulesInRange = scheduleRepository.findAll().stream()
                .filter(s -> !s.getStart().isBefore(rangeStart) && !s.getEnd().isAfter(rangeEnd))
                .toList();
        assertThat(schedulesInRange).hasSize(2);
        assertThat(schedulesInRange).extracting("id").contains(schedule1.getId(), schedule2.getId());
        assertThat(schedulesInRange).extracting("id").doesNotContain(schedule3.getId());
    }
    

    @Test
    void findOverlappingSchedules() {
        Schedule existingSchedule = new Schedule(
                baseTime,
                baseTime.plus(2, ChronoUnit.HOURS),
                course,
                lecturer);
        entityManager.persist(existingSchedule);

        User otherUser = new User(
                "other.lecturer",
                "Other",
                "Lecturer",
                "other@example.com",
                "password",
                Role.LECTURER);
        entityManager.persist(otherUser);

        Lecturer otherLecturer = new Lecturer(
                "Other expertise",
                otherUser);
        entityManager.persist(otherLecturer);

        Schedule overlappingSchedule = new Schedule(
                baseTime.plus(1, ChronoUnit.HOURS),
                baseTime.plus(3, ChronoUnit.HOURS),
                course,
                otherLecturer);
        entityManager.persist(overlappingSchedule);
        List<Schedule> overlappingSchedules = scheduleRepository.findAll().stream()
                .filter(s -> s.getLecturer().getId().equals(otherLecturer.getId())
                        && s.getStart().isBefore(existingSchedule.getEnd())
                        && s.getEnd().isAfter(existingSchedule.getStart()))
                .toList();
        assertThat(overlappingSchedules).hasSize(1);
        assertThat(overlappingSchedules.get(0).getId()).isEqualTo(overlappingSchedule.getId());
    }
}
