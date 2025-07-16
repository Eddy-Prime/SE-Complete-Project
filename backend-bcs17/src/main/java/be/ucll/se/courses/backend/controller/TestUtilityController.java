package be.ucll.se.courses.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import be.ucll.se.courses.backend.repository.DbInitializer;



@RestController
@RequestMapping("/test-utils")
@Profile({ "test", "dev" }) // Only activate in test and dev environments
public class TestUtilityController {

    private final DbInitializer dbInitializer;

    @Autowired
    public TestUtilityController( DbInitializer dbInitializer) {
        this.dbInitializer = dbInitializer;
    }

    /**
     * Endpoint to reset the database to its initial state.
     * This is useful for E2E tests to ensure test isolation.
     * 
     * @return Response indicating success
     */
    @PostMapping("/reset-database")
    public ResponseEntity<String> resetDatabase() {
        dbInitializer.init();
        return ResponseEntity.ok("Database reset successfully");
    }
}
