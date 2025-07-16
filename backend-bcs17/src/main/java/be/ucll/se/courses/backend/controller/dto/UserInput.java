package be.ucll.se.courses.backend.controller.dto;

import be.ucll.se.courses.backend.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserInput(
        @NotBlank
        String username,
        @NotBlank
        String password,
        @NotBlank
        String firstName,
        @NotBlank
        String lastName,
        @Email
        String email,
        Role role
) {
}
