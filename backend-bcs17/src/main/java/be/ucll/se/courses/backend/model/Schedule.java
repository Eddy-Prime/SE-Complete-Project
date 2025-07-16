package be.ucll.se.courses.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @JsonIgnore
    private Instant createdAt;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @JsonIgnore
    private Instant updatedAt;

    @NotNull
    private Instant start;

    @NotNull
    private Instant end;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "lecturer_id")
    private Lecturer lecturer;

    @ManyToMany
    @JoinTable(
        name = "schedule_students",
        joinColumns = @JoinColumn(name = "schedule_id"),
        inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    @JsonManagedReference
    private List<Student> students = new ArrayList<>();

    protected Schedule() {}

    public Schedule(@NotNull Instant start,
                    @NotNull Instant end,
                    @NotNull Course course,
                    @NotNull Lecturer lecturer) {
        this.start = start;
        this.end = end;
        this.course = course;
        this.lecturer = lecturer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Instant getStart() {
        return start;
    }

    public void setStart(Instant start) {
        this.start = start;
    }

    public Instant getEnd() {
        return end;
    }

    public void setEnd(Instant end) {
        this.end = end;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Lecturer getLecturer() {
        return lecturer;
    }

    public void setLecturer(Lecturer lecturer) {
        this.lecturer = lecturer;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void addStudent(Student student) {
        students.add(student);
    }
}
