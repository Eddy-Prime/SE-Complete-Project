package be.ucll.se.courses.backend.controller.dto;

import be.ucll.se.courses.backend.model.Role;

public record AuthenticationResponse(
        String message,
        String token,
        String username,
        String fullname,
        Role role
) {
}
