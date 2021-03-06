import { Badge, Box, Text } from '@chakra-ui/layout';
import { Heading, Image } from '@chakra-ui/react';
import React from 'react';

interface Facility {
  id: number;
  name: string;
}
export interface Schedule {
  id: number;

  todayAppearance: string;

  disabilityType: string;

  disabilityDescription: string;

  startDateTime: Date;

  endDateTime: Date;

  facilityId: number;

  facility: Facility;
}

export default function ScheduleCard(props: { schedule: Schedule }) {
  return (
    <Box
      minW="sm"
      bg="white"
      display={{ base: 'grid', md: 'flex' }}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image
        m={1}
        borderRadius="lg"
        height={{ base: '100%', md: '150px' }}
        src="https://bit.ly/2Z4KKcF"
      />
      <Box p={5} minW="sm">
        <Heading fontSize="xl">{props.schedule.facility.name}</Heading>
        <Badge borderRadius="full" px="2" colorScheme="teal">
          これから
        </Badge>
        <Text>
          {props.schedule.startDateTime} ~ {props.schedule.endDateTime}
        </Text>
      </Box>
    </Box>
  );
}
