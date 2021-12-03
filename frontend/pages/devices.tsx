import { gql } from '@apollo/client';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import DeviceCard from '../components/DeviceCard';
import { Schedule } from '../components/ScheduleCard';
import { useAuth } from '../lib/auth';
import Schedules from './schedules';

const Devices: NextPage = () => {
  const { isSignedIn, createApolloClient } = useAuth()!;
  const [devices, setDevices] = useState<Device[]>([])!;
  useEffect(() => {
    const query = gql`
      {
        getDevices {
          id
          type
          name
        }
      }
    `;
    const client = createApolloClient();
    client.query({ query }).then((result) => {
      console.log(result.data);
      setDevices(result.data.getVisits);
    });
  }, []);
  return (
    <div>
      {isSignedIn() &&
        devices.map((device) => {
          return <DeviceCard device={device} />;
        })}
    </div>
  );
};
