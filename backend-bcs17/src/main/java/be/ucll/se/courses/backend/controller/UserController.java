package be.ucll.se.courses.backend.controller;

import be.ucll.se.courses.backend.controller.dto.AuthenticationRequest;
import be.ucll.se.courses.backend.controller.dto.AuthenticationResponse;
import be.ucll.se.courses.backend.controller.dto.UserInput;
import be.ucll.se.courses.backend.model.User;
import be.ucll.se.courses.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody AuthenticationRequest authenticationRequest) {
        return userService.authenticate(authenticationRequest.username(), authenticationRequest.password());
    }

    @PostMapping("/signup")
    public User signup(@Valid @RequestBody UserInput userInput) {
        return userService.signup(userInput);
    }
}
