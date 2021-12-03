import { Badge, Box, Text } from '@chakra-ui/layout';
import { Heading, Image } from '@chakra-ui/react';
import React from 'react';

export interface Device {
  id: number;
  name: string;
  type: string;
}

export default function DeviceCard(props: { device: Device }) {
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
        src="https://pbs.twimg.com/media/FEtaQdBaAAARMwX?format=jpg"
      />
      <Box p={5} minW="sm">
        <Heading fontSize="xl">{props.device.name}</Heading>
        <Badge borderRadius="full" px="2" colorScheme="teal">
          {props.device.type}
        </Badge>
        <Text></Text>
      </Box>
    </Box>
  );
}
