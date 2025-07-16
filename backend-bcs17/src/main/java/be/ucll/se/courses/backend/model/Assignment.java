package be.ucll.se.courses.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String title;

    @NotNull
    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull
    private Instant dueDate;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Instant createdAt;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Instant updatedAt;

    @NotNull
    private boolean isPublished = false;

    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    private Schedule schedule;

    public Assignment() {
    }

    public Assignment(String title, String description, Instant dueDate, Schedule schedule) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.schedule = schedule;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getDueDate() {
        return dueDate;
    }

    public void setDueDate(Instant dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isPublished() {
        return isPublished;
    }

    public void setPublished(boolean published) {
        isPublished = published;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }
}