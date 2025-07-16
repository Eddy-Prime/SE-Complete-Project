import Head from 'next/head';
import Header from '@components/header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Assignment {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  schedule: string;
  estimatedTime: string;
  gradingCriteria: string;
  status: string;
  isCompleted: boolean;
  isPastDue: boolean;
}

const Assignments = () => {
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'all' | 'bySchedule'>('all');
  const [sortOption, setSortOption] = useState<'dueDate' | 'title' | 'schedule'>('dueDate');
  const [scheduleFilter, setScheduleFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [schedules, setSchedules] = useState<{[key: string]: Assignment[]}>({});

  // Load assignments on page load
  useEffect(() => {
    // This would normally be an API call
    setIsLoading(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      const mockAssignments = [
        { 
          id: 1, 
          title: 'Final Project', 
          description: 'Create a full-stack web application',
          dueDate: '2025-05-15',
          schedule: 'Software Engineering',
          estimatedTime: '10 hours',
          gradingCriteria: 'Code quality: 30%, Functionality: 40%, Documentation: 30%',
          status: 'not-started',
          isCompleted: false,
          isPastDue: false
        },
        { 
          id: 2, 
          title: 'Midterm Assessment', 
          description: 'Complete the midterm evaluation quiz',
          dueDate: '2025-04-01',
          schedule: 'Software Engineering',
          estimatedTime: '1 hour',
          gradingCriteria: 'Correctness: 100%',
          status: 'submitted',
          isCompleted: true,
          isPastDue: true
        },
        { 
          id: 3, 
          title: 'Database Design Project', 
          description: 'Design a normalized database schema for an e-commerce application',
          dueDate: '2025-05-20',
          schedule: 'Database Design',
          estimatedTime: '8 hours',
          gradingCriteria: 'Normalization: 40%, Performance: 30%, Documentation: 30%',
          status: 'in-progress',
          isCompleted: false,
          isPastDue: false
        },
        { 
          id: 4, 
          title: 'SQL Query Optimization', 
          description: 'Optimize the provided SQL queries for better performance',
          dueDate: '2025-04-25',
          schedule: 'Database Design',
          estimatedTime: '3 hours',
          gradingCriteria: 'Correctness: 50%, Performance: 50%',
          status: 'graded',
          isCompleted: true,
          isPastDue: false
        }
      ];
      
      setAssignments(mockAssignments);
      setFilteredAssignments(mockAssignments);
      
      // Group assignments by schedule
      const scheduleGroups: {[key: string]: Assignment[]} = {};
      mockAssignments.forEach(assignment => {
        if (!scheduleGroups[assignment.schedule]) {
          scheduleGroups[assignment.schedule] = [];
        }
        scheduleGroups[assignment.schedule].push(assignment);
      });
      setSchedules(scheduleGroups);
      
      setIsLoading(false);
    }, 500);
  }, []);

  // Effect to handle filtering and sorting
  useEffect(() => {
    if (assignments.length === 0) return;
  
    let result = [...assignments];
    
    // Apply schedule filter
    if (scheduleFilter) {
      result = result.filter(a => a.schedule === scheduleFilter);
    }
    
    // Apply status filter
    if (statusFilter) {
      result = result.filter(a => a.status === statusFilter);
    }
    
    // Apply sorting
    switch(sortOption) {
      case 'dueDate':
        result.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'schedule':
        result.sort((a, b) => a.schedule.localeCompare(b.schedule));
        break;
    }
    
    setFilteredAssignments(result);
  }, [assignments, scheduleFilter, statusFilter, sortOption]);
  
  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'not-started': return 'Not Started';
      case 'in-progress': return 'In Progress';
      case 'submitted': return 'Submitted';
      case 'graded': return 'Graded';
      default: return status;
    }
  };
  
  const getStatusColor = (status: string, isPastDue: boolean) => {
    if (isPastDue && status !== 'submitted' && status !== 'graded') {
      return 'bg-red-100 text-red-800'; // Past due
    }
    
    switch(status) {
      case 'not-started': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'graded': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Head>
        <title>Assignment Dashboard</title>
        <meta name="description" content="Manage your assignments" />
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8">Assignment Dashboard</h1>
        
        {/* View options and filters */}
        <div className="w-full max-w-6xl flex flex-wrap justify-between mb-6">
          <div className="flex flex-wrap space-x-2 space-y-2 sm:space-y-0 items-center mb-4 sm:mb-0">
            <div>
              <label className="mr-2 text-sm font-medium">View:</label>
              <select 
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value as 'all' | 'bySchedule')}
                className="border rounded p-2 text-sm"
                data-testid="view-option"
              >
                <option value="all">All Assignments</option>
                <option value="bySchedule">View by Schedule</option>
              </select>
            </div>
            
            <div>
              <label className="mr-2 text-sm font-medium">Sort by:</label>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as 'dueDate' | 'title' | 'schedule')}
                className="border rounded p-2 text-sm"
                data-testid="sort-option"
              >
                <option value="dueDate">Due Date</option>
                <option value="title">Title</option>
                <option value="schedule">Schedule</option>
              </select>
            </div>
            
            <div>
              <label className="mr-2 text-sm font-medium">Schedule:</label>
              <select 
                value={scheduleFilter}
                onChange={(e) => setScheduleFilter(e.target.value)}
                className="border rounded p-2 text-sm"
                data-testid="schedule-filter"
              >
                <option value="">All Schedules</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Database Design">Database Design</option>
              </select>
            </div>
            
            <div>
              <label className="mr-2 text-sm font-medium">Status:</label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded p-2 text-sm"
                data-testid="status-filter"
              >
                <option value="">All Statuses</option>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="submitted">Submitted</option>
                <option value="graded">Graded</option>
              </select>
            </div>
          </div>
          
          {/* This button will only be visible for professors - in a real app this would use role-based access control */}
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => router.push('/assignments/create')}
            data-testid="create-assignment-button"
          >
            Create Assignment
          </button>
        </div>
        
        {/* Assignments content */}
        <div className="w-full max-w-6xl" data-testid="assignments-list">
          {isLoading ? (
            <div className="text-center py-8">Loading assignments...</div>
          ) : filteredAssignments.length === 0 ? (
            <div className="text-center py-8">No assignments found</div>
          ) : viewMode === 'all' ? (
            <div className="space-y-4">
              {filteredAssignments.map((assignment) => (
                <div 
                  key={assignment.id}
                  className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${assignment.isPastDue && assignment.status === 'not-started' ? 'border-red-300' : ''}`}
                  data-testid="assignment-item"
                >
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold" data-testid="assignment-title">
                      {assignment.title}
                    </h2>
                    <span 
                      className={`px-2 py-1 rounded text-xs ${getStatusColor(assignment.status, assignment.isPastDue)}`}
                    >
                      {assignment.isPastDue && assignment.status !== 'submitted' && assignment.status !== 'graded' 
                        ? 'Past Due' 
                        : getStatusLabel(assignment.status)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span data-testid="assignment-schedule">
                      Schedule: {assignment.schedule}
                    </span>
                    <span 
                      data-testid="assignment-due-date"
                      className={assignment.isPastDue && assignment.status !== 'submitted' && assignment.status !== 'graded' ? 'text-red-600 font-medium' : ''}
                    >
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="mt-2 text-gray-700 line-clamp-2">
                    {assignment.description}
                  </p>
                  
                  <div className="mt-4 flex justify-end space-x-4">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => router.push(`/assignments/${assignment.id}`)}
                      data-testid="view-details-button"
                    >
                      View Details
                    </button>
                    
                    {assignment.status !== 'submitted' && assignment.status !== 'graded' && !assignment.isPastDue && (
                      <button
                        className="text-green-500 hover:text-green-700"
                        onClick={() => router.push(`/assignments/${assignment.id}/submit`)}
                        data-testid="submit-button"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(schedules).map(([scheduleName, scheduleAssignments]) => {
                // Filter assignments in this schedule based on status filter
                const filteredScheduleAssignments = statusFilter 
                  ? scheduleAssignments.filter(a => a.status === statusFilter)
                  : scheduleAssignments;
                
                // Skip empty sections after filtering
                if (filteredScheduleAssignments.length === 0) return null;
                
                // Sort assignments in this schedule
                let sortedAssignments = [...filteredScheduleAssignments];
                switch(sortOption) {
                  case 'dueDate':
                    sortedAssignments.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
                    break;
                  case 'title':
                    sortedAssignments.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                }
                
                return (
                  <div key={scheduleName} className="border rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">{scheduleName}</h2>
                    <div className="space-y-4">
                      {sortedAssignments.length === 0 ? (
                        <p className="text-gray-500">No assignments in this schedule.</p>
                      ) : (
                        sortedAssignments.map((assignment) => (
                          <div 
                            key={assignment.id}
                            className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${assignment.isPastDue && assignment.status === 'not-started' ? 'border-red-300' : ''}`}
                          >
                            <div className="flex justify-between">
                              <h3 className="text-lg font-semibold">
                                {assignment.title}
                              </h3>
                              <span 
                                className={`px-2 py-1 rounded text-xs ${getStatusColor(assignment.status, assignment.isPastDue)}`}
                              >
                                {assignment.isPastDue && assignment.status !== 'submitted' && assignment.status !== 'graded' 
                                  ? 'Past Due' 
                                  : getStatusLabel(assignment.status)}
                              </span>
                            </div>
                            
                            <div className="text-sm text-gray-600 mt-1">
                              <span
                                className={assignment.isPastDue && assignment.status !== 'submitted' && assignment.status !== 'graded' ? 'text-red-600 font-medium' : ''}
                              >
                                Due: {new Date(assignment.dueDate).toLocaleDateString()}
                              </span>
                            </div>
                            
                            <div className="mt-3 flex justify-end space-x-4">
                              <button
                                className="text-blue-500 hover:text-blue-700"
                                onClick={() => router.push(`/assignments/${assignment.id}`)}
                              >
                                View Details
                              </button>
                              
                              {assignment.status !== 'submitted' && assignment.status !== 'graded' && !assignment.isPastDue && (
                                <button
                                  className="text-green-500 hover:text-green-700"
                                  onClick={() => router.push(`/assignments/${assignment.id}/submit`)}
                                >
                                  Submit
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
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

export default Assignments;
