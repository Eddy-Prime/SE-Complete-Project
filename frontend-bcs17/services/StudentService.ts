const getToken = (): string => {
  const loggedInUserString = sessionStorage.getItem('loggedInUser');
  return loggedInUserString ? JSON.parse(loggedInUserString).token : '';
};

const getAllStudents = () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + '/students', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const StudentService = {
  getAllStudents,
};

export default StudentService;
