import { Lecturer, User } from '@types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {
  lecturer: Lecturer;
};

const CourseOverviewTable: React.FC<Props> = ({ lecturer }: Props) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    if (loggedInUserString !== null) {
      setLoggedInUser(JSON.parse(loggedInUserString));
    }
  }, []);

  return (
    <>
      {lecturer.courses && (
        <table className="mt-4">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Phase</th>
              <th scope="col">Credits</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {lecturer.courses.map((course, index) => (
              <tr key={index}>
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td>{course.phase}</td>
                <td>{course.credits}</td>
                <td>
                  {loggedInUser?.role === 'admin' && (
                    <Link href={`/schedule/${lecturer.id}/${course.id}`}>
                      <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Schedule
                      </button>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CourseOverviewTable;
