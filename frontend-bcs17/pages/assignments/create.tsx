import Head from 'next/head';
import Header from '@components/header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AssignmentCreate = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    schedule: '',
    estimatedTime: '',
    gradingCriteria: ''
  });
  const [error, setError] = useState('');
  const [schedules, setSchedules] = useState([
    { id: 1, name: 'Software Engineering' },
    { id: 2, name: 'Data Science' },
    { id: 3, name: 'Web Development' }
  ]);
  const [files, setFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFiles([...files, ...fileArray]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!formData.title) {
      setError('Title is required');
      return;
    }

    if (!formData.description) {
      setError('Description is required');
      return;
    }

    if (!formData.dueDate) {
      setError('Due date is required');
      return;
    }

    if (!formData.schedule) {
      setError('Schedule is required');
      return;
    }

    // Check if due date is in the past
    const currentDate = new Date();
    const selectedDate = new Date(formData.dueDate);
    if (selectedDate < currentDate) {
      setError('Due date cannot be in the past');
      return;
    }

    // All validation passed, submit form (this would normally be an API call)
    console.log('Form submitted:', formData);
    console.log('Files:', files);
    
    // Redirect to assignments page with success message
    setTimeout(() => {
      router.push('/assignments');
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Create Assignment</title>
        <meta name="description" content="Create a new assignment" />
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8">Create New Assignment</h1>
        
        <form 
          className="w-full max-w-3xl bg-white p-6 rounded-lg shadow"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
              <p data-testid="error-message">{error}</p>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              data-testid="assignment-title"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              data-testid="assignment-description"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="dueDate">
                Due Date *
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                data-testid="assignment-due-date"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.dueDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="schedule">
                Schedule *
              </label>
              <select
                id="schedule"
                name="schedule"
                data-testid="assignment-schedule"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.schedule}
                onChange={handleInputChange}
              >
                <option value="">Select Schedule</option>
                {schedules.map(schedule => (
                  <option key={schedule.id} value={schedule.name}>{schedule.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="estimatedTime">
                Estimated Completion Time
              </label>
              <input
                type="text"
                id="estimatedTime"
                name="estimatedTime"
                data-testid="estimated-time"
                placeholder="e.g. 10 hours"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.estimatedTime}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="gradingCriteria">
                Grading Criteria
              </label>
              <input
                type="text"
                id="gradingCriteria"
                name="gradingCriteria"
                data-testid="grading-criteria"
                placeholder="e.g. Code quality: 30%, Documentation: 30%, Functionality: 40%"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.gradingCriteria}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Attachments
            </label>
            <input
              type="file"
              multiple
              data-testid="file-upload"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleFileChange}
            />
            {files.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold">Uploaded Files:</p>
                <ul className="list-disc list-inside">
                  {files.map((file, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeFile(index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => router.push('/assignments')}
            >
              Cancel
            </button>
            <button
              type="submit"
              data-testid="create-assignment-button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Assignment
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default AssignmentCreate;
