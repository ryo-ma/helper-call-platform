import gql from 'graphql-tag';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import ScheduleCard, { Schedule } from '../components/ScheduleCard';
import { useAuth } from '../lib/auth';

const Schedules: NextPage = () => {
  const { isSignedIn, createApolloClient } = useAuth()!;
  const [visits, setVisits] = useState<Schedule[]>([])!;
  useEffect(() => {
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
    client.query({ query }).then((result) => {
      console.log(result.data);
      setVisits(result.data.getVisits);
    });
  }, []);
  return (
    <div>
      {isSignedIn() &&
        visits.map((visit) => {
          return <ScheduleCard schedule={visit} />;
        })}
    </div>
  );
};

export default Schedules;
