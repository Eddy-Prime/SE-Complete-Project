import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import ScheduleService from '@services/ScheduleService';
import { Schedule, Student } from '@types';

type Props = {
  schedules: Array<Schedule>;
  students: Array<Student>;
};

const ScheduleOverview: React.FC<Props> = ({ schedules, students }: Props) => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'available' | 'enrolled'>('available');

  const selectSchedule = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setError(null); // Clear any previous errors
  };

  const handleEnroll = async (student: Student) => {
    if (!selectedSchedule || !selectedSchedule.id) return;
    
    try {
      const response = await ScheduleService.enrollStudent(selectedSchedule.id, student);
      
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to enroll in schedule');
        return;
      }
      
      setError(null);
      selectedSchedule.students.push(student);
    } catch (err) {
      setError('An unexpected error occurred while enrolling');
    }
  };

  return (
    <>
      <div className="mb-4 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
          <li className="mr-2" role="presentation">
            <button 
              data-testid="available-schedules-tab"
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'available' ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
              onClick={() => setActiveTab('available')}
            >
              Available Schedules
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              data-testid="my-schedules-tab"
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'enrolled' ? 'border-blue-600 text-blue-600' : 'border-transparent'}`}
              onClick={() => setActiveTab('enrolled')}
            >
              My Schedules
            </button>
          </li>
        </ul>
      </div>
      
      {error && (
        <div data-testid="error-message" className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span className="font-medium">Error:</span> {error}
        </div>
      )}
      
      {activeTab === 'available' && schedules && (
        <table className="mt-6">
          <thead>
            <tr>
              <th scope="col">Course</th>
              <th scope="col">Start</th>
              <th scope="col">End</th>
              <th scope="col">Lecturer</th>
              <th scope="col">Enrolled students</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule, index) => (
              <tr
                key={index}
                data-testid="schedule-item"
                onClick={() => selectSchedule(schedule)}
                className={classNames({
                  'table-active': selectedSchedule?.id === schedule.id,
                })}
                role="button">
                <td>{schedule.course.name}</td>
                <td data-testid="schedule-start-time">{dayjs(schedule.start).format('DD-MM-YYYY HH:mm')}</td>
                <td data-testid="schedule-end-time">{dayjs(schedule.end).format('DD-MM-YYYY HH:mm')}</td>
                <td>
                  {schedule.lecturer.user.firstName +
                    ' ' +
                    schedule.lecturer.user.lastName}
                </td>
                <td data-testid="enrolled-count">{schedule.students.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {activeTab === 'enrolled' && schedules && (
        <div className="mt-6">
          <h2 className="text-xl mb-4">My Enrolled Schedules</h2>
          {schedules.filter(schedule => 
            schedule.students.some(s => s.studentnumber === sessionStorage.getItem('studentnumber'))
          ).map((schedule, index) => (
            <div key={index} data-testid="enrolled-schedule-item" className="p-4 mb-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold">{schedule.course.name}</h3>
              <p>Start: <span data-testid="schedule-start-time">{dayjs(schedule.start).format('DD-MM-YYYY HH:mm')}</span></p>
              <p>End: <span data-testid="schedule-end-time">{dayjs(schedule.end).format('DD-MM-YYYY HH:mm')}</span></p>
              <p>Lecturer: {schedule.lecturer.user.firstName} {schedule.lecturer.user.lastName}</p>
            </div>
          ))}
          {schedules.filter(schedule => 
            schedule.students.some(s => s.studentnumber === sessionStorage.getItem('studentnumber'))
          ).length === 0 && (
            <p className="text-center text-gray-500">You are not enrolled in any schedules yet.</p>
          )}
        </div>
      )}
      
      {activeTab === 'available' && selectedSchedule && (
        <section className="mt-5">
          <h2 className="text-center">Students</h2>
          <table>
            <thead>
              <tr>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Studentnumber</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{student.user.firstName}</td>
                  <td>{student.user.lastName}</td>
                  <td>{student.studentnumber}</td>
                  <td>
                    {!selectedSchedule.students.find(
                      (s) => s.studentnumber === student.studentnumber
                    ) && (
                      <button
                        data-testid="enroll-button"
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={() => handleEnroll(student)}>
                        Enroll
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
};

export default ScheduleOverview;
