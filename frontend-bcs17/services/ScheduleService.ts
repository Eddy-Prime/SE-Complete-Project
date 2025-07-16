import { Schedule, Student } from '@types';

const getToken = (): string => {
  const loggedInUserString = sessionStorage.getItem('loggedInUser');
  return loggedInUserString ? JSON.parse(loggedInUserString).token : '';
};

const getSchedule = () => {
  // Log for debugging
  console.log("[ScheduleService] Getting schedules from:", process.env.NEXT_PUBLIC_API_URL + '/schedules');
  console.log("[ScheduleService] Using token:", getToken() ? "token present" : "token missing");
  
  return fetch(process.env.NEXT_PUBLIC_API_URL + '/schedules', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const enrollStudent = (scheduleId: number, student: any) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + '/schedules/' + scheduleId + '/enroll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      student
    }),
  });
};

const createSchedule = (schedule: Schedule) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + '/schedules', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(schedule),
  });
};

const ScheduleService = {
  getSchedule,
  enrollStudent,
  createSchedule,
};

export default ScheduleService;
