import Header from '@components/header';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(loggedInUser));
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-semibold mb-2">Welcome, {user.fullname}</h2>
          <p className="mb-4">You are logged in as: {user.role}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded shadow">
              <h3 className="font-medium">Schedules</h3>
              <p className="text-sm text-gray-600">View and manage your schedules</p>
              <button 
                onClick={() => router.push('/schedule')}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                View Schedules
              </button>
            </div>
            
            <div className="bg-green-50 p-4 rounded shadow">
              <h3 className="font-medium">Courses</h3>
              <p className="text-sm text-gray-600">Browse available courses</p>
              <button 
                className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                View Courses
              </button>
            </div>
            
            <div className="bg-purple-50 p-4 rounded shadow">
              <h3 className="font-medium">Assignments</h3>
              <p className="text-sm text-gray-600">Check your assignments</p>
              <button 
                className="mt-2 bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm">
                View Assignments
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default Dashboard;