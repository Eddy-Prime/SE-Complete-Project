import Head from 'next/head';
import Header from '@components/header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const SubmissionGrading = () => {
  const router = useRouter();
  const { id, submissionId } = router.query;
  const [submission, setSubmission] = useState<any>(null);
  const [assignment, setAssignment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Grading state
  const [overallGrade, setOverallGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [criteriaGrades, setCriteriaGrades] = useState<{[key: string]: string}>({});
  const [requestRevision, setRequestRevision] = useState(false);

  useEffect(() => {
    if (!id || !submissionId) return;
    
    
    setIsLoading(true);
    
   
    setTimeout(() => {
      // Mock assignment data with grading criteria
      const mockAssignment = { 
        id: parseInt(id as string), 
        title: 'Web Application Project',
        schedule: 'Software Engineering',
        gradingCriteria: {
          'Code quality': { maxScore: 30, weight: 0.3 },
          'Functionality': { maxScore: 40, weight: 0.4 },
          'Documentation': { maxScore: 30, weight: 0.3 }
        }
      };
      
      // Mock student submission
      const mockSubmission = {
        id: parseInt(submissionId as string),
        assignmentId: parseInt(id as string),
        studentName: 'Sarah Johnson',
        submissionDate: '2025-05-28T14:30:00',
        content: 'This is my final submission for the web application project. I have implemented all the required features and added proper documentation.',
        attachments: [
          { name: 'project.zip', url: '#' },
          { name: 'documentation.pdf', url: '#' }
        ],
        isGraded: submissionId === '1' || submissionId === '2',
        grade: submissionId === '1' ? '90/100' : (submissionId === '2' ? '75/100' : ''),
        criteriaGrades: submissionId === '1' ? {
          'Code quality': '28/30',
          'Functionality': '35/40',
          'Documentation': '27/30'
        } : {},
        feedback: submissionId === '1' ? 
          'Excellent implementation with clear documentation.' : 
          (submissionId === '2' ? 
            'Good effort, but some features are missing. Code organization needs improvement.' : '')
      };
      
      setAssignment(mockAssignment);
      setSubmission(mockSubmission);
      
      // Initialize grading state if already graded
      if (mockSubmission.isGraded) {
        setOverallGrade(mockSubmission.grade);
        setFeedback(mockSubmission.feedback);
        setCriteriaGrades(mockSubmission.criteriaGrades as {[key: string]: string});
      }
      
      setIsLoading(false);
    }, 500);
  }, [id, submissionId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleCriteriaGradeChange = (criterion: string, value: string) => {
    setCriteriaGrades(prev => ({
      ...prev,
      [criterion]: value
    }));
    
    // Recalculate overall grade based on criteria grades
    const newGrades = { ...criteriaGrades, [criterion]: value };
    let totalScore = 0;
    let totalPossibleScore = 0;
    
    Object.entries(newGrades).forEach(([key, value]) => {
      if (value && assignment?.gradingCriteria[key]) {
        const [score, maxScore] = value.split('/').map(Number);
        totalScore += score;
        totalPossibleScore += assignment.gradingCriteria[key].maxScore;
      }
    });
    
    if (totalPossibleScore > 0) {
      setOverallGrade(`${totalScore}/${totalPossibleScore}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (requestRevision) {
      // Just send feedback without grades
      if (!feedback) {
        setError('Please provide feedback for the revision request');
        return;
      }
      
      console.log('Requesting revision with feedback:', feedback);
      setSuccessMessage('Feedback sent successfully');
    } else {
      // Validate form for grading
      if (!overallGrade) {
        setError('Please provide an overall grade');
        return;
      }

      if (!feedback) {
        setError('Please provide feedback');
        return;
      }
      
      // Here you would normally submit the grade to an API
      console.log('Submitting grade:', {
        overallGrade,
        feedback,
        criteriaGrades,
        assignmentId: id,
        submissionId
      });
      
      setSuccessMessage('Grade saved successfully');
    }
    
    // Redirect after a short delay
    setTimeout(() => {
      router.push(`/assignments/${id}/submissions`);
    }, 2000);
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Loading Submission</title>
        </Head>
        <Header />
        <main className="p-6 min-h-screen flex flex-col items-center">
          <div className="text-center py-8">Loading submission...</div>
        </main>
      </>
    );
  }

  if (error && !submission) {
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
            onClick={() => router.push(`/assignments/${id}/submissions`)}
          >
            Back to Submissions
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{submission?.isGraded ? 'View Graded Submission' : 'Grade Submission'}</title>
        <meta name="description" content="Grade student submission" />
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <button
              className="text-blue-500 hover:text-blue-700 flex items-center"
              onClick={() => router.push(`/assignments/${id}/submissions`)}
            >
              Back to Submissions
            </button>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{submission?.isGraded ? 'Graded Submission' : 'Grade Submission'}</h1>
          <h2 className="text-xl mb-8">{assignment?.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Submission details column */}
            <div className="md:col-span-2">
              <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Student Information</h3>
                  <p><span className="font-medium">Name:</span> {submission?.studentName}</p>
                  <p><span className="font-medium">Submitted:</span> {submission?.submissionDate ? formatDate(submission.submissionDate) : 'N/A'}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Submission Content</h3>
                  <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap">
                    {submission?.content}
                  </div>
                </div>
                
                {submission?.attachments && submission.attachments.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Attachments</h3>
                    <ul className="list-disc pl-5">
                      {submission.attachments.map((attachment: any, index: number) => (
                        <li key={index} className="mb-1">
                          <a href={attachment.url} className="text-blue-500 hover:text-blue-700">
                            {attachment.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            {/* Grading column */}
            <div className="md:col-span-1">
              <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Grading</h3>
                
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
                
                <div className="mb-6">
                  <label className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={requestRevision}
                      onChange={(e) => setRequestRevision(e.target.checked)}
                      disabled={submission?.isGraded}
                      data-testid="request-revision-checkbox"
                    />
                    <span>Request Revision (without grade)</span>
                  </label>
                </div>
                
                {!requestRevision && (
                  <>
                    {/* Grading criteria */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Criteria Breakdown</h4>
                      
                      {assignment?.gradingCriteria && Object.entries(assignment.gradingCriteria).map(([criterion, details]: [string, any]) => (
                        <div key={criterion} className="flex justify-between items-center mb-2">
                          <label className="block">{criterion} ({details.maxScore} pts)</label>
                          <input
                            type="text"
                            value={criteriaGrades[criterion] || ''}
                            onChange={(e) => handleCriteriaGradeChange(criterion, e.target.value)}
                            placeholder={`0/${details.maxScore}`}
                            className="border rounded w-20 p-1 text-center"
                            disabled={submission?.isGraded}
                            data-testid={`criteria-${criterion.toLowerCase().replace(' ', '-')}`}
                          />
                        </div>
                      ))}
                    </div>
                    
                    {/* Overall grade */}
                    <div className="mb-4">
                      <label className="block font-medium mb-2">Overall Grade</label>
                      <input
                        type="text"
                        value={overallGrade}
                        onChange={(e) => setOverallGrade(e.target.value)}
                        placeholder="e.g. 90/100"
                        className="border rounded w-full p-2"
                        disabled={submission?.isGraded}
                        data-testid="overall-grade-input"
                      />
                    </div>
                  </>
                )}
                
                {/* Feedback */}
                <div className="mb-6">
                  <label className="block font-medium mb-2">Feedback</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="border rounded w-full p-2 h-32"
                    placeholder="Provide detailed feedback about the submission"
                    disabled={submission?.isGraded}
                    data-testid="feedback-input"
                  />
                </div>
                
                {!submission?.isGraded && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                      data-testid="save-grade-button"
                    >
                      {requestRevision ? 'Send Feedback' : 'Save Grade'}
                    </button>
                  </div>
                )}
              </form>
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

export default SubmissionGrading;
