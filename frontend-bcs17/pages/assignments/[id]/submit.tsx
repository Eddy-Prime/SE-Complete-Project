import Head from 'next/head';
import Header from '@components/header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AssignmentSubmission = () => {
  const router = useRouter();
  const { id } = router.query;
  const [assignment, setAssignment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [pastDeadline, setPastDeadline] = useState(false);

  // Form state
  const [submissionContent, setSubmissionContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [existingDraft, setExistingDraft] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    
    // This would normally be API calls
    setIsLoading(true);
    
    setTimeout(() => {
      // Mock assignment data
      const mockAssignment = { 
        id: parseInt(id as string), 
        title: 'Web Application Project', 
        description: 'Create a full-stack web application with the following features:\n- User authentication\n- Data persistence\n- Responsive UI\n- Documentation\n- Unit tests',
        dueDate: '2025-05-30',
        schedule: 'Software Engineering',
        hasDeadlinePassed: false
      };

      // Check if current date is past the deadline
      const currentDate = new Date();
      const dueDate = new Date(mockAssignment.dueDate);
      const isPastDeadline = currentDate > dueDate;
      
      setPastDeadline(isPastDeadline);
      setAssignment(mockAssignment);

      // Check for existing draft (mock)
      const hasDraft = Math.random() > 0.7; // Randomly determine if there's a draft
      if (hasDraft) {
        setExistingDraft({
          content: 'This is a draft of my project submission. I still need to complete the documentation section.',
          attachments: [
            { name: 'draft_project.zip', url: '#' }
          ],
          lastSaved: '2025-05-25T10:15:00'
        });
        setSubmissionContent('This is a draft of my project submission. I still need to complete the documentation section.');
      }
      
      setIsLoading(false);
    }, 500);
  }, [id]);

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

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSubmissionContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    setError('');
    setSubmitSuccess(false);
    setDraftSaved(false);

    // Validate required fields for final submission
    if (!isDraft && !submissionContent.trim()) {
      setError('Please provide some content for your submission');
      return;
    }

    
    console.log('Submitting assignment:', {
      assignmentId: id,
      content: submissionContent,
      files,
      isDraft
    });

    
    if (isDraft) {
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 3000);
    } else {
      setSubmitSuccess(true);
      setTimeout(() => {
        router.push(`/assignments/${id}`);
      }, 2000);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Loading Assignment</title>
        </Head>
        <Header />
        <main className="p-6 min-h-screen flex flex-col items-center">
          <div className="text-center py-8">Loading assignment submission page...</div>
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
        <title>Submit Assignment</title>
        <meta name="description" content="Submit your assignment" />
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
          
          <h1 className="text-3xl font-bold mb-2">Submit Assignment</h1>
          <h2 className="text-xl mb-8">{assignment?.title}</h2>
          
          {pastDeadline ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
              <div className="font-bold">Submission Deadline Passed</div>
              <div>The deadline for this assignment was {assignment?.dueDate}. Submissions are no longer accepted.</div>
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => router.push(`/assignments/${id}`)}
                >
                  Return to Assignment
                </button>
              </div>
            </div>
          ) : (
            <form 
              className="w-full bg-white p-6 rounded-lg shadow"
              onSubmit={(e) => handleSubmit(e, false)}
            >
              {submitSuccess && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                  Your assignment has been submitted successfully!
                </div>
              )}

              {draftSaved && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                  Your draft has been saved successfully!
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}

              {existingDraft && !submitSuccess && (
                <div className="mb-4 p-3 bg-yellow-100 text-yellow-700 rounded">
                  <p className="font-semibold mb-1">You have a saved draft</p>
                  <p>Last saved: {formatDate(existingDraft.lastSaved)}</p>
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
                  Submission Content
                </label>
                <textarea
                  id="content"
                  value={submissionContent}
                  onChange={handleContentChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-64"
                  placeholder="Enter your submission content here..."
                  data-testid="submission-content"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Attachments
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  multiple
                  data-testid="submission-attachments"
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

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  data-testid="save-draft-button"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                  data-testid="submit-button"
                >
                  Submit Assignment
                </button>
              </div>
            </form>
          )}
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

export default AssignmentSubmission;
