package be.ucll.se.courses.backend.repository;

import be.ucll.se.courses.backend.model.*;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

@Component
public class DbInitializer {
    private final PasswordEncoder passwordEncoder;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final LecturerRepository lecturerRepository;
    private final StudentRepository studentRepository;
    private final ScheduleRepository scheduleRepository;
    private final AssignmentRepository assignmentRepository;

    public DbInitializer(PasswordEncoder passwordEncoder,
            CourseRepository courseRepository,
            UserRepository userRepository,
            LecturerRepository lecturerRepository,
            StudentRepository studentRepository,
            ScheduleRepository scheduleRepository,
            AssignmentRepository assignmentRepository) {
        this.passwordEncoder = passwordEncoder;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.lecturerRepository = lecturerRepository;
        this.studentRepository = studentRepository;
        this.scheduleRepository = scheduleRepository;
        this.assignmentRepository = assignmentRepository;
    }

    public void clearAll() {
        scheduleRepository.deleteAll();
        courseRepository.deleteAll();
        lecturerRepository.deleteAll();
        studentRepository.deleteAll();
        userRepository.deleteAll();
    }

    @SuppressWarnings("unused")
    @PostConstruct
    public void init() {
        clearAll();

        final var fullStack = courseRepository.save(new Course(
                "Full-stack development",
                "Learn how to build a full stack web application.",
                2,
                6));

        final var softwareEngineering = courseRepository.save(new Course(
                "Software Engineering",
                "Learn how to build and deploy a software application.",
                2,
                6));

        final var frontEnd = courseRepository.save(new Course(
                "Front-End Development",
                "Learn how to build a front-end web application.",
                1,
                6));

        final var backEnd = courseRepository.save(new Course(
                "Back-end Development",
                "Learn how to build a REST-API in a back-end application.",
                1,
                6));

        final var admin = userRepository.save(new User(
                "admin",
                "admin",
                "admin",
                "administration@ucll.be",
                passwordEncoder.encode("admin123"),
                Role.ADMIN));

        // Add users for Cypress testing
        final var professorUser = userRepository.save(new User(
                "professor.thompson",
                "Professor",
                "Thompson",
                "professor.thompson@ucll.be",
                passwordEncoder.encode("password123"),
                Role.LECTURER));

        final var professorThompson = lecturerRepository.save(new Lecturer(
                "Software Engineering, Full-stack development",
                professorUser));

        final var studentUser = userRepository.save(new User(
                "student.alex",
                "Alex",
                "Student",
                "alex.student@student.ucll.be",
                passwordEncoder.encode("password123"),
                Role.STUDENT));

        final var studentAlex = studentRepository.save(new Student(
                "r0785099",
                studentUser));

        // Johan Pieck

        final var userJP = userRepository.save(new User(
                "johanp",
                "Johan",
                "Pieck",
                "johan.pieck@ucll.be",
                passwordEncoder.encode("johanp123"),
                Role.LECTURER));

        final var lecturerJP = lecturerRepository.save(new Lecturer(
                "Full-stack development, Front-end development",
                userJP));

        fullStack.addLecturer(lecturerJP);
        frontEnd.addLecturer(lecturerJP);

        // Elke Steegmans

        final var userES = userRepository.save(new User(
                "elkes",
                "Elke",
                "Steegmans",
                "elke.steegmans@ucll.be",
                passwordEncoder.encode("elkes123"),
                Role.LECTURER));

        final var lecturerES = lecturerRepository.save(new Lecturer(
                "Software Engineering, Back-End Development",
                userES));

        fullStack.addLecturer(lecturerES);
        softwareEngineering.addLecturer(lecturerES);

        // Greetje Jongen

        final var userGJ = userRepository.save(new User(
                "greetjej",
                "Greetje",
                "Jongen",
                "greetje.jongen@ucll.be",
                passwordEncoder.encode("greetjej123"),
                Role.LECTURER));

        final var lecturerGJ = lecturerRepository.save(new Lecturer(
                "Full-Stack development, Back-end Development",
                userGJ));

        fullStack.addLecturer(lecturerGJ);
        backEnd.addLecturer(lecturerGJ);

        courseRepository.save(frontEnd);
        courseRepository.save(fullStack);
        courseRepository.save(backEnd);
        courseRepository.save(softwareEngineering);

        // Student 1

        final var student1User = userRepository.save(new User(
                "peterp",
                "Peter",
                "Parker",
                "peter.parker@student.ucll.be",
                passwordEncoder.encode("peterp123"),
                Role.STUDENT));

        final var student1 = studentRepository.save(new Student(
                "r0785023",
                student1User));

        // Student 2

        final var student2User = userRepository.save(new User(
                "bruceb",
                "Bruce",
                "Banner",
                "bruce.banner@student.ucll.be",
                passwordEncoder.encode("bruceb123"),
                Role.STUDENT));

        final var student2 = studentRepository.save(new Student(
                "r0785024",
                student2User));

        // Student 3

        final var student3User = userRepository.save(new User(
                "sallys",
                "Sally",
                "Smith",
                "sally.smith@student.ucll.be",
                passwordEncoder.encode("sallys123"),
                Role.STUDENT));

        final var student3 = studentRepository.save(new Student(
                "r0785025",
                student3User));

        // Student 4

        final var student4User = userRepository.save(new User(
                "michaelm",
                "Michael",
                "Miller",
                "michael.miller@student.ucll.be",
                passwordEncoder.encode("michaelm123"),
                Role.STUDENT));

        final var student4 = studentRepository.save(new Student(
                "r0785026",
                student4User));

        // Student 5

        final var student5User = userRepository.save(new User(
                "lindas",
                "Linda",
                "Lawson",
                "linda.lawson@student.ucll.be",
                passwordEncoder.encode("lindal123"),
                Role.STUDENT));

        final var student5 = studentRepository.save(new Student(
                "r0785027",
                student5User));

        // Schedules

        final var schedule1 = scheduleRepository.save(new Schedule(
                todayAt(8, 30),
                todayAt(10, 30),
                fullStack,
                lecturerJP));
        schedule1.addStudent(student1);
        scheduleRepository.save(schedule1);

        final var schedule2 = scheduleRepository.save(new Schedule(
                todayAt(13, 30),
                todayAt(15, 30),
                fullStack,
                lecturerES));
        schedule2.addStudent(student2);
        scheduleRepository.save(schedule2);

        final var schedule3 = scheduleRepository.save(new Schedule(
                todayAt(13, 30),
                todayAt(15, 30),
                softwareEngineering,
                lecturerES));
        schedule3.addStudent(student4);
        scheduleRepository.save(schedule3);

        final var schedule4 = scheduleRepository.save(new Schedule(
                todayAt(10, 45),
                todayAt(12, 45),
                backEnd,
                lecturerGJ));
        schedule4.addStudent(student5);
        scheduleRepository.save(schedule4);

        final var assignment1 = assignmentRepository.save(new Assignment(
                "Build a REST API",
                "Create a REST API for a library management system.",
                todayAt(23, 59), // Due date
                schedule1 // Associated schedule
        ));

        final var assignment2 = assignmentRepository.save(new Assignment(
                "Frontend Design",
                "Design a responsive frontend for the library management system.",
                todayAt(23, 59).plusSeconds(7 * 24 * 60 * 60), // Due date in 7 days
                schedule2 // Associated schedule
        ));

        final var assignment3 = assignmentRepository.save(new Assignment(
                "Database Normalization",
                "Normalize the database schema for the library management system.",
                todayAt(23, 59).plusSeconds(14 * 24 * 60 * 60), // Due date in 14 days
                schedule3 // Associated schedule
        ));

        final var assignment4 = assignmentRepository.save(new Assignment(
                "Backend Testing",
                "Write unit and integration tests for the backend API.",
                todayAt(23, 59).plusSeconds(21 * 24 * 60 * 60), // Due date in 21 days
                schedule4 // Associated schedule
        ));

        System.out.println("Initialized assignments:");
        System.out.println(assignment1);
        System.out.println(assignment2);
        System.out.println(assignment3);
        System.out.println(assignment4);
    }

    /**
     * Utility method to quickly create an Instant that's at a certain time today
     */
    private static Instant todayAt(int hour, int minute) {
        return LocalDate.now().atTime(hour, minute).atZone(ZoneId.systemDefault()).toInstant();
    }
}
