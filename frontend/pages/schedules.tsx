import type { NextPage } from 'next';
import ScheduleCard from '../components/ScheduleCard';
const schedule = {
  imageUrl: 'https://bit.ly/2Z4KKcF',
  facilityName: '練馬区役所へ',
  startDate: '2021/12/1 10:00',
  endDate: '2021/12/1 12:00',
};

const Schedules: NextPage = () => {
  return <ScheduleCard schedule={schedule} />;
};

export default Schedules;
