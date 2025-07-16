package be.ucll.se.courses.backend.controller;

import be.ucll.se.courses.backend.model.Assignment;
import be.ucll.se.courses.backend.service.AssignmentService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assignments")
public class AssignmentController {
    private final AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Assignment createAssignment(@RequestBody Assignment assignment) {
        return assignmentService.createAssignment(assignment);
    }

    @GetMapping
    public List<Assignment> getAllAssignments() {
        return assignmentService.getAllAssignments();
    }

    @GetMapping("/{id}")
    public Assignment getAssignmentById(@PathVariable Long id) {
        return assignmentService.getAssignmentById(id);
    }

    @GetMapping("/schedule/{scheduleId}")
    public List<Assignment> getAssignmentsByScheduleId(@PathVariable Long scheduleId) {
        return assignmentService.getAssignmentsByScheduleId(scheduleId);
    }

    @PutMapping("/{id}")
    public Assignment updateAssignment(@PathVariable Long id, @RequestBody Assignment updatedAssignment) {
        return assignmentService.updateAssignment(id, updatedAssignment);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAssignment(@PathVariable Long id) {
        assignmentService.deleteAssignment(id);
    }

    @PostMapping("/{id}/submissions")
    @ResponseStatus(HttpStatus.CREATED)
    public String submitAssignment(@PathVariable Long id, @RequestBody String submissionContent) {
        return "Submission received for assignment ID: " + id;
    }
}