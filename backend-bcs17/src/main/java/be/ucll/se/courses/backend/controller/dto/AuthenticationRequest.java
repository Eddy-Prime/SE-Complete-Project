package be.ucll.se.courses.backend.controller.dto;

public record AuthenticationRequest(
        String username,
        String password
) {
}
