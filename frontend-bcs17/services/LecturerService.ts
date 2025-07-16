const getToken = (): string => {
  const loggedInUserString = sessionStorage.getItem('loggedInUser');
  return loggedInUserString ? JSON.parse(loggedInUserString).token : '';
};

const getAllLecturers = () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + '/lecturers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const getLecturerById = (lecturerId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/lecturers/${lecturerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const LecturerService = {
  getAllLecturers,
  getLecturerById,
};

export default LecturerService;
