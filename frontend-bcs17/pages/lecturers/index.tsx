import Head from 'next/head';
import LecturersOverviewTable from '@components/lecturers/LecturerOverviewTable';
import { useState, useEffect } from 'react';
import { Lecturer } from '@types';
import Header from '@components/header';
import LecturerService from '@services/LecturerService';
import CourseOverviewTable from '@components/courses/CourseOverviewTable';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Lecturers: React.FC = () => {
  const [lecturers, setLecturers] = useState<Array<Lecturer>>();
  const [error, setError] = useState<string>();
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(
    null
  );

  const getLecturers = async () => {
    setError('');
    const response = await LecturerService.getAllLecturers();

    if (!response.ok) {
      if (response.status === 401) {
        setError(
          'You are not authorized to view this page. Please login first.'
        );
      } else {
        setError(response.statusText);
      }
    } else {
      const lecturers = await response.json();
      setLecturers(lecturers);
    }
  };

  useEffect(() => {
    getLecturers();
  }, []);

  return (
    <>
      <Head>
        <title>Lecturers</title>
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        <h1>Lecturers</h1>
        <section>
          {error && <div className="text-red-800">{error}</div>}
          {lecturers && (
            <LecturersOverviewTable
              lecturers={lecturers}
              selectLecturer={setSelectedLecturer}
            />
          )}
        </section>

        {selectedLecturer && (
          <section className="mt-5">
            <h2 className="text-center">
              Courses taught by {selectedLecturer.user.firstName}
            </h2>
            {selectedLecturer.courses && (
              <CourseOverviewTable lecturer={selectedLecturer} />
            )}
          </section>
        )}
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

export default Lecturers;
