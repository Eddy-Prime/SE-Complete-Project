import Head from 'next/head';
import Header from '@components/header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Assignment editing page based on the assignment_editing.feature file
const AssignmentEdit = () => {
  const router = useRouter();
  const { id } = router.query;
  const [assignment, setAssignment] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    schedule: '',
    estimatedTime: '',
    gradingCriteria: ''
  });
  const [files, setFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [hasSubmissions, setHasSubmissions] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
    
      const mockAssignments = [
        { 
          id: 1, 
          title: 'Software Design Principles', 
          description: 'Learn and apply software design principles',
          dueDate: '2025-05-15',
          schedule: 'Software Engineering',
          estimatedTime: '10 hours',
          gradingCriteria: 'Code quality: 30%, Functionality: 40%, Documentation: 30%',
          isPublished: true,
          hasSubmissions: true,
          attachments: [
            { name: 'design_principles.pdf', url: '#' }
          ]
        }
      ];
      
      const foundAssignment = mockAssignments.find(a => a.id === parseInt(id as string));
      
      if (foundAssignment) {
        setAssignment(foundAssignment);
        setFormData({
          title: foundAssignment.title,
          description: foundAssignment.description,
          dueDate: foundAssignment.dueDate,
          schedule: foundAssignment.schedule,
          estimatedTime: foundAssignment.estimatedTime,
          gradingCriteria: foundAssignment.gradingCriteria
        });
        setExistingFiles(foundAssignment.attachments || []);
        setIsPublished(foundAssignment.isPublished || false);
        setHasSubmissions(foundAssignment.hasSubmissions || false);
      } else {
        setError('Assignment not found');
      }
      
      setIsLoading(false);
    }, 500);
  }, [id]);

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

  const removeExistingFile = (index: number) => {
    const newExistingFiles = [...existingFiles];
    newExistingFiles.splice(index, 1);
    setExistingFiles(newExistingFiles);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validate form
    if (!formData.title && !isPublished) {
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

    // If published, check for title change (which should be restricted)
    if (isPublished && formData.title !== assignment.title) {
      setError('Cannot change the title of a published assignment');
      return;
    }

    // Checking if due date is reduced and there are submissions
    if (hasSubmissions && new Date(formData.dueDate) < new Date(assignment.dueDate)) {
      setError('Cannot reduce deadline of an assignment with existing submissions');
      return;
    }

    // All validation passed, submit form (this would normally be an API call)
    console.log('Form submitted:', formData);
    console.log('Files:', files);
    console.log('Existing Files:', existingFiles);
    
    // Show success message
    setSuccessMessage('Assignment updated successfully');
    
    // Redirect after a short delay
    setTimeout(() => {
      router.push(`/assignments/${id}`);
    }, 2000);
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Edit Assignment</title>
        </Head>
        <Header />
        <main className="p-6 min-h-screen flex flex-col items-center">
          <div className="text-center py-8">Loading assignment...</div>
        </main>
      </>
    );
  }

  if (error && !assignment) {
    return (
      <>
        <Head>
          <title>Error</title>
        </Head>
        <Header />
        <main className="p-6 min-h-screen flex flex-col items-center">
          <div className="text-center py-8 text-red-500">{error}</div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => router.push('/assignments')}
          >
            Back to Assignments
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Edit Assignment</title>
        <meta name="description" content="Edit assignment details" />
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <button
              className="text-blue-500 hover:text-blue-700 flex items-center"
              onClick={() => router.push(`/assignments/${id}`)}
            >
              Back to Assignment
            </button>
          </div>
          
          <h1 className="text-3xl font-bold mb-8">Edit Assignment</h1>
          
          <form 
            className="w-full bg-white p-6 rounded-lg shadow"
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                {successMessage}
              </div>
            )}
            
            {isPublished && (
              <div className="mb-4 p-3 bg-yellow-100 text-yellow-700 rounded">
                This assignment has been published. Some fields cannot be changed.
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${isPublished ? 'bg-gray-100' : ''}`}
                value={formData.title}
                onChange={handleInputChange}
                disabled={isPublished}
                data-testid="assignment-title"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                value={formData.description}
                onChange={handleInputChange}
                data-testid="assignment-description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="dueDate" className="block text-gray-700 font-semibold mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  data-testid="assignment-due-date"
                />
              </div>
              <div>
                <label htmlFor="schedule" className="block text-gray-700 font-semibold mb-2">
                  Schedule
                </label>
                <select
                  id="schedule"
                  name="schedule"
                  className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${isPublished ? 'bg-gray-100' : ''}`}
                  value={formData.schedule}
                  onChange={handleInputChange}
                  disabled={isPublished}
                  data-testid="assignment-schedule"
                >
                  <option value="">Select a schedule</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Database Design">Database Design</option>
                  <option value="Research Methods">Research Methods</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="estimatedTime" className="block text-gray-700 font-semibold mb-2">
                  Estimated Completion Time
                </label>
                <input
                  type="text"
                  id="estimatedTime"
                  name="estimatedTime"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.estimatedTime}
                  onChange={handleInputChange}
                  data-testid="assignment-estimated-time"
                />
              </div>
              <div>
                <label htmlFor="gradingCriteria" className="block text-gray-700 font-semibold mb-2">
                  Grading Criteria
                </label>
                <input
                  type="text"
                  id="gradingCriteria"
                  name="gradingCriteria"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.gradingCriteria}
                  onChange={handleInputChange}
                  data-testid="assignment-grading-criteria"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Current Attachments
              </label>
              {existingFiles.length === 0 ? (
                <p className="text-gray-500">No attachments</p>
              ) : (
                <ul className="space-y-2">
                  {existingFiles.map((file, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeExistingFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Add New Attachments
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                multiple
                data-testid="assignment-attachments"
              />
              
              {files.length > 0 && (
                <div className="mt-2">
                  <p className="text-gray-700 font-semibold">Selected files:</p>
                  <ul className="space-y-1 mt-1">
                    {files.map((file, index) => (
                      <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                        <span>{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => router.push(`/assignments/${id}`)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                data-testid="save-changes-button"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default AssignmentEdit;
