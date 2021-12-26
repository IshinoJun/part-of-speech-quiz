import { Center, chakra, Icon } from '@chakra-ui/react';
import React from 'react';
import { FaGithub } from 'react-icons/fa';

export const Footer = (): JSX.Element => {
  return (
    <chakra.footer>
      <Center
        py={2}
        position='relative'
        borderTop='1px'
        borderTopColor='gray.400'
      >
        <Icon as={FaGithub} color='gray.400' />
      </Center>
    </chakra.footer>
  );
};
