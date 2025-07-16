package be.ucll.se.courses.backend.service;

import be.ucll.se.courses.backend.controller.dto.ScheduleInput;
import be.ucll.se.courses.backend.controller.dto.EnrollmentInput;
import be.ucll.se.courses.backend.exception.CoursesException;
import be.ucll.se.courses.backend.exception.NotFoundException;
import be.ucll.se.courses.backend.model.Role;
import be.ucll.se.courses.backend.model.Schedule;
import be.ucll.se.courses.backend.repository.CourseRepository;
import be.ucll.se.courses.backend.repository.LecturerRepository;
import be.ucll.se.courses.backend.repository.ScheduleRepository;
import be.ucll.se.courses.backend.repository.StudentRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final CourseRepository courseRepository;
    private final LecturerRepository lecturerRepository;
    private final StudentRepository studentRepository;

    public ScheduleService(ScheduleRepository scheduleRepository, CourseRepository courseRepository,
            LecturerRepository lecturerRepository, StudentRepository studentRepository) {
        this.scheduleRepository = scheduleRepository;
        this.courseRepository = courseRepository;
        this.lecturerRepository = lecturerRepository;
        this.studentRepository = studentRepository;
    }

    public List<Schedule> getSchedules(Authentication authentication) {
        if (authentication.getAuthorities().contains(Role.ADMIN.toGrantedAuthority())) {
            return scheduleRepository.findAll();
        } else if (authentication.getAuthorities().contains(Role.LECTURER.toGrantedAuthority())) {
            final var username = authentication.getName();
            return scheduleRepository.findByLecturer_User_Username(username);
        } else if (authentication.getAuthorities().contains(Role.STUDENT.toGrantedAuthority())) {
            // Allow students to view all schedules
            return scheduleRepository.findAll();
        } else {
            throw new AccessDeniedException("You do not have permission to access this resource");
        }
    }

    public Schedule createSchedule(ScheduleInput scheduleInput) {
        final long courseId = scheduleInput.course().id();
        final var course = courseRepository.findById(courseId).orElseThrow(
                () -> new NotFoundException("Course with id " + courseId + " not found"));
        final long lecturerId = scheduleInput.lecturer().id();
        final var lecturer = lecturerRepository.findById(lecturerId).orElseThrow(
                () -> new NotFoundException("Lecturer with id " + lecturerId + " not found"));

        final boolean existingSchedule = scheduleRepository.existsByCourse_IdAndLecturer_Id(course.getId(),
                lecturer.getId());

        if (existingSchedule) {
            throw new CoursesException(
                    "Schedule already exists for course with id " + courseId + " and lecturer with id " + lecturerId);
        }

        final var schedule = new Schedule(
                scheduleInput.start(),
                scheduleInput.end(),
                course,
                lecturer);

        return scheduleRepository.save(schedule);
    }

    public Schedule enroll(EnrollmentInput enrollmentInput) {
        if (enrollmentInput == null || enrollmentInput.schedule() == null || enrollmentInput.schedule().id() == 0
                || enrollmentInput.students() == null || enrollmentInput.students().isEmpty()) {
            throw new CoursesException("Invalid enrollment input");
        }

        final long scheduleId = enrollmentInput.schedule().id();
        final var schedule = scheduleRepository.findById(scheduleId).orElseThrow(
                () -> new NotFoundException("Schedule with id " + scheduleId + " not found"));

        final var students = enrollmentInput.students().stream().map(student -> {
            final long studentId = student.id();
            return studentRepository.findById(student.id()).orElseThrow(
                    () -> new NotFoundException("Student with id " + studentId + " not found"));
        });

        students.forEach(schedule::addStudent);

        return scheduleRepository.save(schedule);
    }
}
