export type Course = {
    id: number;
    name: string;
    description: string;
    phase: number;
    credits: number;
};

export type Lecturer = {
    id: number;
    user: User;
    expertise: string;
    courses: Course[];
};

export type User = {
    firstName?: string;
    lastName?: string;
    fullname?: string;
    email?: string;
    username?: string;
    password?: string;
    role?: string;
};

export type Student = {
    user: User;
    studentnumber: string;
};

export type Schedule = {
    id?: number;
    start: Date;
    end: Date;
    course: Course;
    lecturer: Lecturer;
    students: Student[];
};

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};
