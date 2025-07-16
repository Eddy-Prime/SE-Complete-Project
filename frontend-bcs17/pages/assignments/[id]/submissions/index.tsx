import Head from 'next/head';
import Header from '@components/header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const SubmissionsList = () => {
  const router = useRouter();
  const { id } = router.query;
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [assignment, setAssignment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    
    // This would normally be API calls
    setIsLoading(true);
    
    // Simulate API calls with mock data
    setTimeout(() => {
      // Mock assignment data
      const mockAssignment = { 
        id: parseInt(id as string), 
        title: 'Web Application Project', 
        schedule: 'Software Engineering'
      };
      
      // Mock submissions data
      const mockSubmissions = [
        {
          id: 1,
          studentName: 'Sarah Johnson',
          submissionDate: '2025-05-28T14:30:00',
          isGraded: true,
          grade: '90/100',
          status: 'graded'
        },
        {
          id: 2,
          studentName: 'Tom Wilson',
          submissionDate: '2025-05-28T12:15:00',
          isGraded: true,
          grade: '75/100',
          status: 'graded'
        },
        {
          id: 3,
          studentName: 'Emma Davis',
          submissionDate: '2025-05-29T09:45:00',
          isGraded: false,
          status: 'submitted'
        },
        {
          id: 4,
          studentName: 'Michael Brown',
          submissionDate: '2025-05-29T16:20:00',
          isGraded: false,
          status: 'submitted'
        }
      ];
      
      setAssignment(mockAssignment);
      setSubmissions(mockSubmissions);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleViewSubmission = (submissionId: number) => {
    router.push(`/assignments/${id}/submissions/${submissionId}`);
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Loading Submissions</title>
        </Head>
        <Header />
        <main className="p-6 min-h-screen flex flex-col items-center">
          <div className="text-center py-8">Loading submissions...</div>
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
        <title>Assignment Submissions</title>
        <meta name="description" content="View all submissions for this assignment" />
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
          
          <h1 className="text-3xl font-bold mb-2">Submissions</h1>
          <h2 className="text-xl mb-8">{assignment?.title} - {assignment?.schedule}</h2>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b flex justify-between bg-gray-50">
              <div className="font-semibold text-lg">Total Submissions: {submissions.length}</div>
              <div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm mr-2">
                  Graded: {submissions.filter(s => s.isGraded).length}
                </span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                  Pending: {submissions.filter(s => !s.isGraded).length}
                </span>
              </div>
            </div>
            
            {submissions.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No submissions yet</div>
            ) : (
              <table className="w-full" data-testid="submissions-table">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-4">Student</th>
                    <th className="text-left p-4">Submitted</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Grade</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="border-t hover:bg-gray-50" data-testid="submission-row">
                      <td className="p-4">{submission.studentName}</td>
                      <td className="p-4">{formatDate(submission.submissionDate)}</td>
                      <td className="p-4">
                        {submission.isGraded ? (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Graded</span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Pending</span>
                        )}
                      </td>
                      <td className="p-4">{submission.isGraded ? submission.grade : '-'}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleViewSubmission(submission.id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                          data-testid="view-submission-button"
                        >
                          {submission.isGraded ? 'View Grade' : 'Grade'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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

export default SubmissionsList;
