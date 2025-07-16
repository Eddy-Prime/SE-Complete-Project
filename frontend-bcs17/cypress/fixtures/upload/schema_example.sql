CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  schedule_id INTEGER REFERENCES schedules(id),
  estimated_time VARCHAR(100),
  grading_criteria TEXT
);

CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  assignment_id INTEGER REFERENCES assignments(id),
  student_id INTEGER REFERENCES users(id),
  submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  comments TEXT,
  status VARCHAR(50) DEFAULT 'SUBMITTED'
);

CREATE TABLE submission_files (
  id SERIAL PRIMARY KEY,
  submission_id INTEGER REFERENCES submissions(id),
  file_path VARCHAR(255) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);