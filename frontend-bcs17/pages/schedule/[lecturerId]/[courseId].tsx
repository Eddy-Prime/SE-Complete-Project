import Header from '@components/header';
import ScheduleForm from '@components/schedule/ScheduleForm';
import CourseService from '@services/CourseService';
import LecturerService from '@services/LecturerService';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const CreateSchedule = () => {
  const router = useRouter();
  const { lecturerId, courseId } = router.query;

  const fetcher = async (key: string) => {
    const [lecturerResponse, courseResponse] = await Promise.all([
      LecturerService.getLecturerById(lecturerId as string),
      CourseService.getCourseById(courseId as string),
    ]);

    if (!lecturerResponse.ok || !courseResponse.ok) {
      if (lecturerResponse.status === 401) {
        throw new Error(
          'You are not authorized to view this page. Please login first.'
        );
      }
    } else {
      const [lecturer, course] = await Promise.all([
        lecturerResponse.json(),
        courseResponse.json(),
      ]);
      return { lecturer, course };
    }
  };

  /**
   * We can't fetch data in getServerSideProps() because we need the loggedInUser from session storage.
   * Since getServerSideProps() runs on the server trying to fetch data while pre-rendering,
   * it doesn't have access to the session storage which is a client-side object.
   * useSWR() is a React hook that fetches data on the client-side as an alternative to useEffect() that
   * has a built in caching mechanism.
   */
  const { data, isLoading, error } = useSWR('lecturerCourse', fetcher);

  return (
    <>
      <Head>
        <title>New schedule</title>
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        <h1>Create new schedule</h1>
        <section>
          {error && <p className="text-danger">{error}</p>}
          {isLoading && <p>Loading...</p>}
          {data && (
            <ScheduleForm lecturer={data.lecturer} course={data.course} />
          )}
        </section>
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

export default CreateSchedule;
