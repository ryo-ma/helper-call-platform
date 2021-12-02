import gql from 'graphql-tag';
import type { NextPage } from 'next';
import ScheduleCard from '../components/ScheduleCard';
import { useAuth } from '../lib/auth';
const schedule = {
  imageUrl: 'https://bit.ly/2Z4KKcF',
  facilityName: '練馬区役所へ',
  startDate: '2021/12/1 10:00',
  endDate: '2021/12/1 12:00',
};

const Schedules: NextPage = () => {
  const { isSignedIn, createApolloClient } = useAuth()!;
  const query = gql`
    {
      getVisits {
        id
        todayAppearance
        disabilityType
        disabilityDescription
        startDateTime
        endDateTime
        facility {
          id
          name
        }
      }
    }
  `;
  const client = createApolloClient();
  console.log(client.query({ query }));
  return <div>{isSignedIn() && <ScheduleCard schedule={schedule} />}</div>;
};

export default Schedules;
