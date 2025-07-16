import Head from 'next/head';
import Header from '@components/header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const SubmissionHistory = () => {
  const router = useRouter();
  const { id } = router.query;
  const [assignment, setAssignment] = useState<any>(null);
  const [submissionHistory, setSubmissionHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    
    setTimeout(() => {
      
      const mockAssignment = { 
        id: parseInt(id as string), 
        title: 'Web Application Project', 
        schedule: 'Software Engineering',
        dueDate: '2025-05-30'
      };
      
      const mockSubmissionHistory = [
        {
          id: 1,
          type: 'draft',
          timestamp: '2025-05-25T10:15:00',
          content: 'Initial draft submission with basic structure',
          attachments: [
            { name: 'initial_draft.zip', url: '#' }
          ]
        },
        {
          id: 2,
          type: 'draft',
          timestamp: '2025-05-27T14:30:00',
          content: 'Updated draft with additional features implemented',
          attachments: [
            { name: 'updated_draft.zip', url: '#' },
            { name: 'progress_report.pdf', url: '#' }
          ]
        },
        {
          id: 3,
          type: 'submitted',
          timestamp: '2025-05-28T18:45:00',
          content: 'Final submission with all features implemented and documented',
          attachments: [
            { name: 'final_project.zip', url: '#' },
            { name: 'documentation.pdf', url: '#' },
            { name: 'presentation.pptx', url: '#' }
          ]
        }
      ];
      
      setAssignment(mockAssignment);
      setSubmissionHistory(mockSubmissionHistory);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Loading Submission History</title>
        </Head>
        <Header />
        <main className="p-6 min-h-screen flex flex-col items-center">
          <div className="text-center py-8">Loading submission history...</div>
        </main>
      </>
    );
  }

  if (error) {
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
            onClick={() => router.push(`/assignments/${id}`)}
          >
            Back to Assignment
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Submission History</title>
        <meta name="description" content="View your submission history for this assignment" />
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <button
              className="text-blue-500 hover:text-blue-700 flex items-center"
              onClick={() => router.push(`/assignments/${id}`)}
            >
              Back to Assignment
            </button>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Submission History</h1>
          <h2 className="text-xl mb-8">{assignment?.title}</h2>
          
          {submissionHistory.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
              No submission history available
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <div className="font-semibold text-lg">Submission Timeline</div>
              </div>
              
              <div className="divide-y">
                {submissionHistory.map((submission) => (
                  <div key={submission.id} className="p-6 hover:bg-gray-50" data-testid="submission-history-item">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold text-lg">
                          {submission.type === 'submitted' ? 'Final Submission' : 'Draft Saved'}
                        </div>
                        <div className="text-gray-500">{formatDate(submission.timestamp)}</div>
                      </div>
                      <div>
                        {submission.type === 'submitted' ? (
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            Submitted
                          </span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                            Draft
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4 bg-gray-50 p-3 rounded text-gray-700">
                      {submission.content}
                    </div>
                    
                    {submission.attachments && submission.attachments.length > 0 && (
                      <div>
                        <div className="font-medium mb-1">Attachments:</div>
                        <ul className="list-disc pl-5">
                          {submission.attachments.map((attachment: any, index: number) => (
                            <li key={index}>
                              <a href={attachment.url} className="text-blue-500 hover:text-blue-700">
                                {attachment.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Show the due date for reference */}
          <div className="mt-6 text-center text-gray-600">
            Assignment due: <span className="font-semibold">{assignment?.dueDate}</span>
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

export default SubmissionHistory;
