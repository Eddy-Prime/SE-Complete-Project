const getToken = (): string => {
  const loggedInUserString = sessionStorage.getItem('loggedInUser');
  return loggedInUserString ? JSON.parse(loggedInUserString).token : '';
};

const getCourseById = (courseId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/courses/${courseId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const CourseService = {
  getCourseById,
};

export default CourseService;
