package be.ucll.se.courses.backend.controller.dto;

import java.time.Instant;

public record ScheduleInput(
        Instant start,
        Instant end,
        Course course,
        Lecturer lecturer
) {
    public record Course(long id) {}
    public record Lecturer(long id) {}
}
