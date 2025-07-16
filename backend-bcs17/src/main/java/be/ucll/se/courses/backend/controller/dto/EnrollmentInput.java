package be.ucll.se.courses.backend.controller.dto;

import java.util.List;

public record EnrollmentInput(
        Schedule schedule,
        List<Student> students
) {
    public record Schedule(long id) {}
    public record Student(long id) {}
}
