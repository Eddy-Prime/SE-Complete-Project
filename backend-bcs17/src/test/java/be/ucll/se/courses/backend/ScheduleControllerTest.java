package be.ucll.se.courses.backend;

import be.ucll.se.courses.backend.controller.ScheduleController;
import be.ucll.se.courses.backend.controller.dto.EnrollmentInput;
import be.ucll.se.courses.backend.controller.dto.ScheduleInput;
// import be.ucll.se.courses.backend.controller.dto.ScheduleInput.Course;
import be.ucll.se.courses.backend.exception.CoursesException;
import be.ucll.se.courses.backend.exception.NotFoundException;
import be.ucll.se.courses.backend.model.Schedule;
import be.ucll.se.courses.backend.model.Course;
import be.ucll.se.courses.backend.model.Lecturer;
import be.ucll.se.courses.backend.service.ScheduleService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import static org.mockito.Mockito.mock;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ScheduleController.class)
public class ScheduleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @SuppressWarnings("removal")
    @MockBean
    private ScheduleService scheduleService;

    private Schedule testSchedule;
    private ScheduleInput validScheduleInput;
    private EnrollmentInput validEnrollmentInput;
    private Instant now;

    @BeforeEach
    void setUp() {
        now = Instant.now();

        Course mockCourse = mock(Course.class);
        Lecturer mockLecturer = mock(Lecturer.class);

        testSchedule = mock(Schedule.class);
        when(testSchedule.getId()).thenReturn(1L);
        when(testSchedule.getStart()).thenReturn(now);
        when(testSchedule.getEnd()).thenReturn(now.plus(2, ChronoUnit.HOURS));
        when(testSchedule.getCourse()).thenReturn(mockCourse);
        when(testSchedule.getLecturer()).thenReturn(mockLecturer);
        testSchedule.setId(1L);

        validScheduleInput = new ScheduleInput(
                now,
                now.plus(2, ChronoUnit.HOURS),
                new ScheduleInput.Course(1L),
                new ScheduleInput.Lecturer(1L));

        validEnrollmentInput = new EnrollmentInput(
                new EnrollmentInput.Schedule(1L),
                List.of(new EnrollmentInput.Student(1L)));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void getSchedules_AsAdmin_ReturnsAllSchedules() throws Exception {

        List<Schedule> schedules = List.of(testSchedule);
        when(scheduleService.getSchedules(any(Authentication.class))).thenReturn(schedules);

        mockMvc.perform(get("/schedules")
                .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));

        verify(scheduleService).getSchedules(any(Authentication.class));
    }

    @Test
    @WithMockUser(roles = "STUDENT")
    void getSchedules_AsStudent_ReturnsStudentSchedules() throws Exception {

        List<Schedule> schedules = List.of(testSchedule);
        when(scheduleService.getSchedules(any(Authentication.class))).thenReturn(schedules);

        mockMvc.perform(get("/schedules")
                .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_STUDENT"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));

        verify(scheduleService).getSchedules(any(Authentication.class));
    }

    @Test
    @WithMockUser(roles = "STUDENT")
    void getSchedules_ServiceThrowsAccessDenied_ReturnsUnauthorized() throws Exception {

        when(scheduleService.getSchedules(any(Authentication.class)))
                .thenThrow(new AccessDeniedException("Access denied"));

        mockMvc.perform(get("/schedules")
                .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_STUDENT"))))
                .andExpect(status().isForbidden());

        verify(scheduleService).getSchedules(any(Authentication.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void getSchedules_ServiceReturnsEmpty_ReturnsEmptyList() throws Exception {

        when(scheduleService.getSchedules(any(Authentication.class))).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/schedules")
                .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));

        verify(scheduleService).getSchedules(any(Authentication.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void createSchedule_ValidInput_ReturnsCreatedSchedule() throws Exception {

        when(scheduleService.createSchedule(any(ScheduleInput.class))).thenReturn(testSchedule);

        mockMvc.perform(post("/schedules")
                .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN")))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validScheduleInput)))
                .andExpect(status().isOk());

        verify(scheduleService).createSchedule(any(ScheduleInput.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void createSchedule_NullInput_ThrowsException() throws Exception {

        when(scheduleService.createSchedule(any(ScheduleInput.class)))
                .thenThrow(new CoursesException("Invalid schedule input"));

        mockMvc.perform(post("/schedules")
                .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN")))
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Invalid schedule input"));

        verify(scheduleService).createSchedule(any(ScheduleInput.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void createSchedule_EndDateBeforeStartDate_ThrowsException() throws Exception {

        ScheduleInput invalidScheduleInput = new ScheduleInput(
                now.plus(2, ChronoUnit.HOURS), // Start is after end
                now,
                new ScheduleInput.Course(1L),
                new ScheduleInput.Lecturer(1L));

        when(scheduleService.createSchedule(any(ScheduleInput.class)))
                .thenThrow(new CoursesException("End date cannot be before start date"));

        mockMvc.perform(post("/schedules")
                .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN")))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidScheduleInput)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("End date cannot be before start date"));

        verify(scheduleService).createSchedule(any(ScheduleInput.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void createSchedule_OverlappingSchedule_ThrowsException() throws Exception {

        when(scheduleService.createSchedule(any(ScheduleInput.class)))
                .thenThrow(new CoursesException("Schedule already exists for course with id 1 and lecturer with id 1"));

        mockMvc.perform(post("/schedules")
                .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN")))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validScheduleInput)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message")
                        .value("Schedule already exists for course with id 1 and lecturer with id 1"));

        verify(scheduleService).createSchedule(any(ScheduleInput.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void createSchedule_NonExistentCourse_ThrowsNotFoundException() throws Exception {

        when(scheduleService.createSchedule(any(ScheduleInput.class)))
                .thenThrow(new NotFoundException("Course with id 1 not found"));

        mockMvc.perform(post("/schedules")
                .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN")))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validScheduleInput)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Course with id 1 not found"));

        verify(scheduleService).createSchedule(any(ScheduleInput.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void enroll_ValidInput_ReturnsUpdatedSchedule() throws Exception {

        when(scheduleService.enroll(any(EnrollmentInput.class))).thenReturn(testSchedule);

        mockMvc.perform(post("/schedules/enroll")
                .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN")))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validEnrollmentInput)))
                .andExpect(status().isOk());

        verify(scheduleService).enroll(any(EnrollmentInput.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void enroll_NullInput_ThrowsException() throws Exception {

        when(scheduleService.enroll(any(EnrollmentInput.class)))
                .thenThrow(new CoursesException("Invalid enrollment input"));

        mockMvc.perform(post("/schedules/enroll")
                .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN")))
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Invalid enrollment input"));

        verify(scheduleService).enroll(any(EnrollmentInput.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void enroll_NonExistentSchedule_ThrowsNotFoundException() throws Exception {

        when(scheduleService.enroll(any(EnrollmentInput.class)))
                .thenThrow(new NotFoundException("Schedule with id 1 not found"));

        mockMvc.perform(post("/schedules/enroll")
                .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN")))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validEnrollmentInput)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Schedule with id 1 not found"));

        verify(scheduleService).enroll(any(EnrollmentInput.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void enroll_NonExistentStudent_ThrowsNotFoundException() throws Exception {

        when(scheduleService.enroll(any(EnrollmentInput.class)))
                .thenThrow(new NotFoundException("Student with id 1 not found"));

        mockMvc.perform(post("/schedules/enroll")
                .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN")))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validEnrollmentInput)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Student with id 1 not found"));

        verify(scheduleService).enroll(any(EnrollmentInput.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void enroll_EmptyStudentList_ValidatesSuccessfully() throws Exception {

        EnrollmentInput emptyStudentsInput = new EnrollmentInput(
                new EnrollmentInput.Schedule(1L),
                new ArrayList<>());
        when(scheduleService.enroll(any(EnrollmentInput.class))).thenReturn(testSchedule);

        mockMvc.perform(post("/schedules/enroll")
                .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN")))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(emptyStudentsInput)))
                .andExpect(status().isOk());

        verify(scheduleService).enroll(any(EnrollmentInput.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void createSchedule_InvalidDateFormat_HandlesProperly() throws Exception {

        String invalidJson = "{\"start\":\"invalid-date\",\"end\":\"invalid-date\",\"course\":{\"id\":1},\"lecturer\":{\"id\":1}}";

        mockMvc.perform(post("/schedules")
                .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMIN")))
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidJson))
                .andExpect(status().isBadRequest());

        verify(scheduleService, never()).createSchedule(any(ScheduleInput.class));
    }
}