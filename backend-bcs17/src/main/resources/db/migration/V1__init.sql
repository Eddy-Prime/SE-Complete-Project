DROP TABLE IF EXISTS lecturer CASCADE;
DROP TABLE IF EXISTS student CASCADE;
DROP TABLE IF EXISTS course CASCADE;
DROP TABLE IF EXISTS schedule CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS course_lecturers CASCADE;
DROP TABLE IF EXISTS schedule_students CASCADE;

CREATE TABLE lecturer (
    id BIGSERIAL NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL,
    expertise TEXT NOT NULL,
    user_id BIGINT NOT NULL,

    CONSTRAINT lecturer_pkey PRIMARY KEY (id)
);

CREATE TABLE student (
    id BIGSERIAL NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL,
    student_number TEXT NOT NULL,
    user_id BIGINT NOT NULL,

    CONSTRAINT student_pkey PRIMARY KEY (id)
);

CREATE TABLE course (
    id BIGSERIAL NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    phase INTEGER NOT NULL,
    credits INTEGER NOT NULL,

    CONSTRAINT course_pkey PRIMARY KEY (id)
);

CREATE TABLE schedule (
    id BIGSERIAL NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    course_id BIGINT NOT NULL,
    lecturer_id BIGINT NOT NULL,

    CONSTRAINT schedule_pkey PRIMARY KEY (id)
);

CREATE TABLE "user" (
    id BIGSERIAL NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL,
    username TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,

    CONSTRAINT user_pkey PRIMARY KEY (id)
);

CREATE TABLE course_lecturers (
    course_id BIGINT NOT NULL,
    lecturer_id BIGINT NOT NULL
);

CREATE TABLE schedule_students (
    schedule_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL
);

CREATE UNIQUE INDEX lecturer_user_id_key ON lecturer (user_id);

CREATE UNIQUE INDEX student_student_number_key ON student (student_number);

CREATE UNIQUE INDEX student_user_id_key ON student (user_id);

CREATE UNIQUE INDEX user_username_key ON "user" (username);

CREATE UNIQUE INDEX user_email_key ON "user" (email);

CREATE UNIQUE INDEX course_lecturers_unique ON course_lecturers (course_id, lecturer_id);

CREATE INDEX course_lecturers_lecturer_id_index ON course_lecturers (lecturer_id);

CREATE UNIQUE INDEX schedule_students_unique ON schedule_students (schedule_id, student_id);

CREATE INDEX schedule_students_student_id_index ON schedule_students (student_id);

ALTER TABLE lecturer ADD CONSTRAINT lecturer_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE student ADD CONSTRAINT student_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE schedule ADD CONSTRAINT schedule_course_id_fkey FOREIGN KEY (course_id) REFERENCES course (id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE schedule ADD CONSTRAINT schedule_lecturer_id_fkey FOREIGN KEY (lecturer_id) REFERENCES lecturer (id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE course_lecturers ADD CONSTRAINT course_lecturers_course_id_fkey FOREIGN KEY (course_id) REFERENCES course (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE course_lecturers ADD CONSTRAINT course_lecturers_lecturer_id_fkey FOREIGN KEY (lecturer_id) REFERENCES lecturer (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE schedule_students ADD CONSTRAINT schedule_students_schedule_id_fkey FOREIGN KEY (schedule_id) REFERENCES schedule (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE schedule_students ADD CONSTRAINT schedule_students_student_id_fkey FOREIGN KEY (student_id) REFERENCES student (id) ON DELETE CASCADE ON UPDATE CASCADE;
