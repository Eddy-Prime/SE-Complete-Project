package be.ucll.se.courses.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Course {
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
    private String name;

    @NotNull
    private String description;

    private int phase;

    private int credits;

    @ManyToMany
    @JoinTable(
            name = "course_lecturers",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "lecturer_id")
    )
    @JsonBackReference
    private List<Lecturer> lecturers = new ArrayList<>();

    protected Course() {}

    public Course(String name,
                  String description,
                  int phase,
                  int credits) {
        this.name = name;
        this.description = description;
        this.phase = phase;
        this.credits = credits;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPhase() {
        return phase;
    }

    public void setPhase(int phase) {
        this.phase = phase;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public List<Lecturer> getLecturers() {
        return lecturers;
    }

    public void addLecturer(Lecturer lecturer) {
        this.lecturers.add(lecturer);
    }
}
