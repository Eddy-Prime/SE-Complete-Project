package be.ucll.se.courses.backend.controller;

import be.ucll.se.courses.backend.exception.CoursesException;
import be.ucll.se.courses.backend.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class ExceptionHandlers {
    @ExceptionHandler(CoursesException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleCoursesException(CoursesException coursesException) {
        return Map.of(
                "status", "domain error",
                "message", coursesException.getMessage()
        );
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleNotFoundException(NotFoundException notFoundError) {
        return Map.of(
                "status", "not found",
                "message", notFoundError.getMessage()
        );
    }
}
