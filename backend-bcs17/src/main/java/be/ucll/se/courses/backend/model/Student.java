package be.ucll.se.courses.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Student {
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
    @JsonProperty("studentnumber")
    private String studentNumber;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @NotNull
    private User user;

    @ManyToMany(mappedBy = "students")
    @JsonBackReference
    private List<Schedule> schedules = new ArrayList<>();

    protected Student() {
    }

    public Student(String studentNumber, User user) {
        this.studentNumber = studentNumber;
        this.user = user;
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

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Schedule> getSchedules() {
        return schedules;
    }
}
