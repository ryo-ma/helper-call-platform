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
    //<Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
    //  <img src={props.schedule.imageUrl} alt={props.schedule.imageAlt} />

    //  <Box p="6">
    //    <Box display="flex" alignItems="baseline">
    //      <Badge borderRadius="full" px="2" colorScheme="teal">
    //        New
    //      </Badge>
    //      <Box
    //        color="gray.500"
    //        fontWeight="semibold"
    //        letterSpacing="wide"
    //        fontSize="xs"
    //        textTransform="uppercase"
    //        ml="2"
    //      >
    //        {props.schedule.beds} beds &bull; {props.schedule.baths} baths
    //      </Box>
    //    </Box>

    //    <Box
    //      mt="1"
    //      fontWeight="semibold"
    //      as="h4"
    //      lineHeight="tight"
    //      isTruncated
    //    >
    //      {props.schedule.title}
    //    </Box>

    //    <Box>
    //      {props.schedule.formattedPrice}
    //      <Box as="span" color="gray.600" fontSize="sm">
    //        / wk
    //      </Box>
    //    </Box>
    //  </Box>
    //</Box>
  );
}
