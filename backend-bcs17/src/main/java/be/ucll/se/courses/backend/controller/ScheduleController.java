package be.ucll.se.courses.backend.controller;

import be.ucll.se.courses.backend.controller.dto.ScheduleInput;
import be.ucll.se.courses.backend.controller.dto.EnrollmentInput;
import be.ucll.se.courses.backend.model.Schedule;
import be.ucll.se.courses.backend.service.ScheduleService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("schedules")
public class ScheduleController {
    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    /**
     * Get the schedule of a lecturer or if the user is an admin, a list of all
     * schedules.
     */
    @GetMapping
    public List<Schedule> getSchedules(Authentication authentication) {
        return scheduleService.getSchedules(authentication);
    }

    @GetMapping("/auth-check")
    public ResponseEntity<Map<String, Object>> checkAuthentication(Authentication authentication) {
        return ResponseEntity.ok(Map.of(
                "username", authentication.getName(),
                "authorities", authentication.getAuthorities(),
                "authenticated", authentication.isAuthenticated()));
    }

    @PostMapping
    public Schedule createSchedule(@RequestBody ScheduleInput schedule) {
        return scheduleService.createSchedule(schedule);
    }

    @PostMapping("/enroll")
    public Schedule enroll(@RequestBody EnrollmentInput enrollmentInput) {
        return scheduleService.enroll(enrollmentInput);
    }
}
