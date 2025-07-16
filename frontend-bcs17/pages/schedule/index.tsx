import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ScheduleIndex = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/schedule/overview');
  }, [router]);

  return <div>Redirecting to schedules...</div>;
};

export default ScheduleIndex;