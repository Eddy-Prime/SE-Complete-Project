import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ScheduleService from '@services/ScheduleService';
import { Course, Lecturer } from '@types';

type Props = {
  lecturer: Lecturer;
  course: Course;
};

const ScheduleForm = ({ lecturer, course }: Props) => {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('');

  const validate = () => {
    let result = true;
    setErrors([]);

    if (!start) {
      setErrors((errors) => [...errors, 'Start date is required.']);
      result = false;
    }
    if (!end) {
      setErrors((errors) => [...errors, 'End date is required.']);
      result = false;
    }
    if (start && end && start > end) {
      setErrors((errors) => [...errors, 'Start date must be before end date.']);
      result = false;
    }
    return result;
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!start || !end) return;

    if (!validate()) {
      return;
    }

    const schedule = {
      start,
      end,
      lecturer,
      course,
      students: [],
    };

    const response = await ScheduleService.createSchedule(schedule);
    const data = await response.json();

    if (!response.ok) {
      setErrors((errors) => [...errors, data.message]);
    } else {
      setStatus('Schedule created successfully.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="m-3">
        {!!errors.length && (
          <ul className="text-red-800 rounded-lg" role="alert">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        {status && (
          <p className="text-green-800" role="alert">
            {status}
          </p>
        )}
      </div>
      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium">Course:</label>
        <div className="">
          <input
            type="text"
            value={course ? course.name : ''}
            disabled
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium">Lecturer:</label>
        <div className="col-sm-8">
          <input
            type="text"
            value={
              lecturer
                ? `${lecturer.user.firstName} ${lecturer.user.lastName}`
                : ''
            }
            disabled
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="block mb-2 text-sm font-medium">Start Date:</label>
        <div className="customDatePickerWidth">
          <DatePicker
            selected={start}
            onChange={(date) => setStart(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy HH:mm"
            timeFormat="HH:mm"
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="block mb-2 text-sm font-medium">End Date:</label>
        <div className="customDatePickerWidth">
          <DatePicker
            selected={end}
            onChange={(date) => setEnd(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy HH:mm"
            timeFormat="HH:mm"
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
          />
        </div>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        Create Schedule
      </button>
    </form>
  );
};

export default ScheduleForm;
