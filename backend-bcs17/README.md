# Courses backend

This repository contains the starter code for the courses backend. It's a rewrite of the courses backend from Full-Stack Development using Java with Spring Boot. The API is compatible with the Next.js frontend from Full-Stack Development.

## Starting the application

Create a local `application.yaml` in the project root
that enables the `dev` profile and sets the datasource
details and JWT secret key:

```yaml
spring:
  profiles:
    active: dev
  datasource:
    url: jdbc:h2:mem:courses
    username: courses
    password: courses123
jwt:
  secret-key: d2ViNC1ub3Qtc28tc2VjcmV0LWFjY2Vzcy1zZWNyZXQ=
```

You can then start the application with `mvn spring-boot:run`.

You can then access the backend on <http://localhost:3000>. You
can test if everything works correctly by requesting
<http://localhost:3000/status> from a browser or a tool like Postman.

You can access the API documentation and test it via Swagger running on
<http://localhost:3000/swagger-ui.html>.

## Bugs

Some bugs were deliberately inserted into this codebase. This is part
of your assignment: to find these bugs, write tests to reproduce them
and to fix them.

## Swagger UI and OpenAPI docs

[springdoc-openapi](https://springdoc.org) is used to provide API
documentation. It can be accessed through the following URLs:

- UI: http://localhost:3000/swagger-ui.html
- OpenAPI docs: http://localhost:3000/v3/api-docs (can be imported into compatible clients)

## Database

An H2 in-memory database is used. See [application.yaml](src/main/resources/application.yaml) for details
about the configuration. The H2 console can be accessed at http://localhost:3000/h2-console.

Initial data is inserted into the database on startup using the
[DbInitializer](src/main/java/be/ucll/se/courses/backend/repository/DbInitializer.java) component.

## Security

Authentication and authorization in the project are handled by [Spring Security](https://docs.spring.io/spring-security/reference/index.html).

The following classes are involved in the security configuration:

- [SecurityConfig](src/main/java/be/ucll/se/courses/backend/config/SecurityConfig.java): most of the security-related beans are created in this configuration class.
  - [CorsProperties](src/main/java/be/ucll/se/courses/backend/config/CorsProperties.java): used to configure allowed origins in [application.yaml](src/main/resources/application.yaml).
  - [JwtProperties](src/main/java/be/ucll/se/courses/backend/config/JwtProperties.java): used to configure JWT in [application.yaml](src/main/resources/application.yaml).
- [JwtService](src/main/java/be/ucll/se/courses/backend/service/JwtService.java): used to create JSON Web Tokens.
- [UserDetailsImpl](src/main/java/be/ucll/se/courses/backend/service/UserDetailsImpl.java): implements the [UserDetails](https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/user-details.html#page-title) interface that Spring Security uses for username/password authentication.
- [UserDetailsServiceImpl](src/main/java/be/ucll/se/courses/backend/service/UserDetailsServiceImpl.java): implements the [UserDetailsService](https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/user-details-service.html#servlet-authentication-userdetailsservice) interface that Spring Security uses for username/password authentication. Also implements [UserDetailsPasswordService](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/core/userdetails/UserDetailsPasswordService.html) so that password hashes will be automatically updated to a higher strength or different encoding if necessary.
- [UserService](src/main/java/be/ucll/se/courses/backend/service/UserService.java): contains `authenticate` and `signup` methods.

### CORS configuration

Allowed origins are configured with custom properties defined in
[CorsProperties](src/main/java/be/ucll/se/courses/backend/config/CorsProperties.java). These can be customized in
[application.yaml](src/main/resources/application.yaml) as follows:

```yaml
cors:
  allowed-origins:
    - https://frontend.example.com
```

CORS configuration is applied using the `corsConfigurationSource` bean in [SecurityConfig](src/main/java/be/ucll/se/courses/backend/config/SecurityConfig.java).

### JWT configuration

HS256 is used as the algorithm. The JWT configuration details are
configured using custom properties defined in
[JwtProperties](src/main/java/be/ucll/se/courses/backend/config/JwtProperties.java). These can be customized in
[application.yaml](src/main/resources/application.yaml) as follows:

```yaml
jwt:
  # Sets the secret key used for HMAC-SHA256
  secret-key: my-secret-key
  token:
    # Sets the issuer
    issuer: courses_app
    # Determines when the JWT expires
    lifetime: 8h
```