import Head from 'next/head';
import Header from '@components/header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AssignmentDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [assignment, setAssignment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    
    // This would normally be an API call
    setIsLoading(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      // For demo purposes we'll just use mock data
      const mockAssignments = [
        { 
          id: 1, 
          title: 'Final Project', 
          description: 'Create a full-stack web application with the following features:\n- User authentication\n- Data persistence\n- Responsive UI\n- Documentation\n- Unit tests',
          dueDate: '2025-05-15',
          schedule: 'Software Engineering',
          estimatedTime: '10 hours',
          gradingCriteria: 'Code quality: 30%, Functionality: 40%, Documentation: 30%',
          status: 'In Progress',
          userRole: 'professor', // or 'student' to test different views
          hasSubmission: true,
          attachments: [
            { name: 'project_requirements.pdf', url: '#' },
            { name: 'example_code.zip', url: '#' }
          ]
        },
        { 
          id: 2, 
          title: 'Midterm Assessment', 
          description: 'Complete the midterm evaluation quiz covering all material from weeks 1-6.',
          dueDate: '2025-04-01',
          schedule: 'Software Engineering',
          estimatedTime: '1 hour',
          gradingCriteria: 'Correctness: 100%',
          attachments: []
        }
      ];
      
      const foundAssignment = mockAssignments.find(a => a.id === parseInt(id as string));
      
      if (foundAssignment) {
        setAssignment(foundAssignment);
      } else {
        setError('Assignment not found');
      }
      
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Loading Assignment...</title>
        </Head>
        <Header />
        <main className="p-6 min-h-screen flex flex-col items-center">
          <div className="text-center py-8">Loading assignment details...</div>
        </main>
      </>
    );
  }

  if (error || !assignment) {
    return (
      <>
        <Head>
          <title>Error</title>
        </Head>
        <Header />
        <main className="p-6 min-h-screen flex flex-col items-center">
          <div className="text-center py-8 text-red-500">{error || 'Assignment not found'}</div>
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
        <title>{assignment.title}</title>
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <button
              className="text-blue-500 hover:text-blue-700 flex items-center"
              onClick={() => router.push('/assignments')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Assignments
            </button>
            
            {/* Conditional buttons based on user role */}
            <div className="space-x-2">
              {assignment.userRole === 'professor' && (
                <>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                    onClick={() => router.push(`/assignments/${id}/edit`)}
                    data-testid="edit-assignment-button"
                  >
                    Edit Assignment
                  </button>
                  <button
                    className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 text-sm"
                    onClick={() => router.push(`/assignments/${id}/submissions`)}
                    data-testid="view-submissions-button"
                  >
                    View Submissions
                  </button>
                </>
              )}
              
              {assignment.userRole === 'student' && (
                <>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                    onClick={() => router.push(`/assignments/${id}/submit`)}
                    data-testid="submit-assignment-button"
                  >
                    Submit Assignment
                  </button>
                  {assignment.hasSubmission && (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      onClick={() => router.push(`/assignments/${id}/submission-history`)}
                      data-testid="view-submission-history-button"
                    >
                      Submission History
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          
          <div data-testid="assignment-details" className="bg-white shadow rounded-lg p-6">
            <h1 
              className="text-3xl font-bold mb-4" 
              data-testid="assignment-title"
            >
              {assignment.title}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-gray-600 font-medium">Schedule:</span>
                <span 
                  className="ml-2" 
                  data-testid="assignment-schedule"
                >
                  {assignment.schedule}
                </span>
              </div>
              
              <div>
                <span className="text-gray-600 font-medium">Due Date:</span>
                <span 
                  className="ml-2" 
                  data-testid="assignment-due-date"
                >
                  {new Date(assignment.dueDate).toLocaleDateString()}
                </span>
              </div>
              
              <div>
                <span className="text-gray-600 font-medium">Estimated Time:</span>
                <span 
                  className="ml-2" 
                  data-testid="estimated-completion-time"
                >
                  {assignment.estimatedTime}
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <div 
                className="text-gray-700 whitespace-pre-line" 
                data-testid="assignment-description"
              >
                {assignment.description}
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Grading Criteria</h2>
              <div 
                className="text-gray-700" 
                data-testid="grading-criteria"
              >
                {assignment.gradingCriteria}
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Status</h2>
              <div className="flex items-center">
                {assignment.status === 'Not Started' && (
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    Not Started
                  </span>
                )}
                {assignment.status === 'In Progress' && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    In Progress
                  </span>
                )}
                {assignment.status === 'Submitted' && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    Submitted
                  </span>
                )}
                {assignment.status === 'Graded' && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Graded
                  </span>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Attachments</h2>
              {assignment.attachments.length === 0 ? (
                <p className="text-gray-500">No attachments</p>
              ) : (
                <ul 
                  className="list-disc list-inside" 
                  data-testid="attachment-list"
                >
                  {assignment.attachments.map((attachment: any, index: number) => (
                    <li key={index} data-testid="resource-item">
                      <a 
                        href={attachment.url}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        {attachment.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
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

export default AssignmentDetail;
