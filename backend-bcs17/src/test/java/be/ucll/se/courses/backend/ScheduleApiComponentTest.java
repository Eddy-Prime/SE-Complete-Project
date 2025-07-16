package be.ucll.se.courses.backend;

import be.ucll.se.courses.backend.controller.dto.EnrollmentInput;
import be.ucll.se.courses.backend.controller.dto.ScheduleInput;
import be.ucll.se.courses.backend.model.*;
import be.ucll.se.courses.backend.repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class ScheduleApiComponentTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private LecturerRepository lecturerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    private Course testCourse;
    private Lecturer testLecturer;
    private Student testStudent;
    private Instant baseTime;

    @BeforeEach
    void setUp() {
        // Clean up the database before each test
        scheduleRepository.deleteAll();

        baseTime = Instant.now();
        testCourse = new Course(
                "Component Test Course",
                "Course for component testing",
                1,
                3);
        testCourse = courseRepository.save(testCourse);
        User lecturerUser = new User(
                "component.test.lecturer",
                "Component",
                "Tester",
                "component.test@example.com",
                "password",
                Role.LECTURER);
        lecturerUser = userRepository.save(lecturerUser);

        testLecturer = new Lecturer(
                "Component testing",
                lecturerUser);
        testLecturer = lecturerRepository.save(testLecturer);
        User studentUser = new User(
                "component.test.student",
                "Student",
                "Tester",
                "student.test@example.com",
                "password",
                Role.STUDENT);
        studentUser = userRepository.save(studentUser);
        testStudent = new Student("r12345678", studentUser);
        testStudent = studentRepository.save(testStudent);
    }

    @AfterEach
    void tearDown() {
        // Clean up the database after each test
        scheduleRepository.deleteAll();
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void createSchedule_ValidInput_CreatesScheduleInDatabase() throws Exception {
        ScheduleInput scheduleInput = new ScheduleInput(
                baseTime,
                baseTime.plus(2, ChronoUnit.HOURS),
                new ScheduleInput.Course(testCourse.getId()),
                new ScheduleInput.Lecturer(testLecturer.getId()));

        // Verify that the database is empty before the test
        List<Schedule> initialSchedules = scheduleRepository.findAll();
        assertThat(initialSchedules).isEmpty();
        mockMvc.perform(post("/schedules")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(scheduleInput)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.start").exists())
                .andExpect(jsonPath("$.end").exists())
                .andExpect(jsonPath("$.course.id").value(testCourse.getId()));

        // Verify the god damn database state (:
        List<Schedule> schedules = scheduleRepository.findAll();
        assertThat(schedules).hasSize(1);

        Schedule savedSchedule = schedules.get(0);
        assertThat(savedSchedule.getCourse().getId()).isEqualTo(testCourse.getId());
        assertThat(savedSchedule.getLecturer().getId()).isEqualTo(testLecturer.getId());
        assertThat(savedSchedule.getStart()).isEqualTo(scheduleInput.start());
        assertThat(savedSchedule.getEnd()).isEqualTo(scheduleInput.end());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void createSchedule_EndDateBeforeStartDate_CreatesScheduleAnyway() throws Exception {

        ScheduleInput invalidScheduleInput = new ScheduleInput(
                baseTime.plus(2, ChronoUnit.HOURS),
                baseTime,
                new ScheduleInput.Course(testCourse.getId()),
                new ScheduleInput.Lecturer(testLecturer.getId()));
        mockMvc.perform(post("/schedules")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidScheduleInput)))
                .andExpect(status().isOk());
        List<Schedule> schedules = scheduleRepository.findAll();
        assertThat(schedules).hasSize(1);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void enroll_ValidInput_AddsStudentsToSchedule() throws Exception {
        //
        Schedule schedule = new Schedule(
                baseTime,
                baseTime.plus(2, ChronoUnit.HOURS),
                testCourse,
                testLecturer);
        schedule = scheduleRepository.save(schedule);

        EnrollmentInput enrollmentInput = new EnrollmentInput(
                new EnrollmentInput.Schedule(schedule.getId()),
                List.of(new EnrollmentInput.Student(testStudent.getId())));
        mockMvc.perform(post("/schedules/enroll")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(enrollmentInput)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(schedule.getId()));
        Schedule updatedSchedule = scheduleRepository.findById(schedule.getId()).orElseThrow();
        assertThat(updatedSchedule.getStudents()).contains(testStudent);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void enroll_NonExistentSchedule_ReturnsNotFound() throws Exception {
        EnrollmentInput enrollmentInput = new EnrollmentInput(
                new EnrollmentInput.Schedule(999L), // Non-existent schedule ID
                List.of(new EnrollmentInput.Student(testStudent.getId())));
        mockMvc.perform(post("/schedules/enroll")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(enrollmentInput)))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void enroll_NonExistentStudent_ReturnsNotFound() throws Exception {

        Schedule schedule = new Schedule(
                baseTime,
                baseTime.plus(2, ChronoUnit.HOURS),
                testCourse,
                testLecturer);
        schedule = scheduleRepository.save(schedule);

        EnrollmentInput enrollmentInput = new EnrollmentInput(
                new EnrollmentInput.Schedule(schedule.getId()),
                List.of(new EnrollmentInput.Student(999L)) // Non-existent student ID
        );
        mockMvc.perform(post("/schedules/enroll")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(enrollmentInput)))
                .andExpect(status().isNotFound());
    }
}