import { User } from "@types";

// Directly set the API_URL for testing, bypassing environment variable loading for now
const API_URL = "http://localhost:3000";

console.log("[UserService] FORCED API_URL:", API_URL);

const loginUser = (user: User) => {
    console.log("[UserService] loginUser called. Using FORCED API_URL:", API_URL);

    if (!API_URL) {
        console.error("[UserService] CRITICAL: API_URL is somehow still not defined! This shouldn't happen with a hardcoded URL.");
        return Promise.reject(new Error("API_URL is not configured."));
    }

    const loginEndpoint = API_URL + "/users/login";
    console.log("[UserService] Attempting to fetch with FORCED URL:", loginEndpoint);

    return fetch(loginEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
    .then(response => {
        console.log("[UserService] Response status from " + loginEndpoint + " (FORCED URL):", response.status);
        if (!response.ok) {
            console.warn("[UserService] Response not OK. Status: " + response.status + ", StatusText: " + response.statusText);
            // Attempt to read the response body for more error details
            response.text().then(text => console.warn("[UserService] Error response body:", text));
        }
        return response;
    })
    .catch(error => {
        console.error("[UserService] Fetch error for " + loginEndpoint + " (FORCED URL):", error);
        // Log more details about the error if possible
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            console.error("[UserService] This 'Failed to fetch' error often indicates a network issue, CORS problem, or the server not being reachable at the specified URL.");
        }
        throw error;
    });
};

const UserService = {
    loginUser,
};

export default UserService;
