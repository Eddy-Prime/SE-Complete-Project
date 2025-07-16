package be.ucll.se.courses.backend.service;

import be.ucll.se.courses.backend.exception.NotFoundException;
import be.ucll.se.courses.backend.model.Assignment;
import be.ucll.se.courses.backend.repository.AssignmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;

    public AssignmentService(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    public Assignment createAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    public Assignment getAssignmentById(Long id) {
        return assignmentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Assignment with id " + id + " not found"));
    }

    public List<Assignment> getAssignmentsByScheduleId(Long scheduleId) {
        return assignmentRepository.findBySchedule_Id(scheduleId);
    }

    public Assignment updateAssignment(Long id, Assignment updatedAssignment) {
        Assignment existingAssignment = getAssignmentById(id);
        existingAssignment.setTitle(updatedAssignment.getTitle());
        existingAssignment.setDescription(updatedAssignment.getDescription());
        existingAssignment.setDueDate(updatedAssignment.getDueDate());
        existingAssignment.setPublished(updatedAssignment.isPublished());
        return assignmentRepository.save(existingAssignment);
    }

    public void deleteAssignment(Long id) {
        if (!assignmentRepository.existsById(id)) {
            throw new NotFoundException("Assignment with id " + id + " not found");
        }
        assignmentRepository.deleteById(id);
    }

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }
}