import { Center, chakra, Heading } from '@chakra-ui/react';
import React from 'react';

export const Header = (): JSX.Element => {
  return (
    <chakra.header>
      <Center py={2} position='relative' bg='cyan.500'>
        <Heading fontSize='2xl' color='white'>
          品詞 クイズ
        </Heading>
      </Center>
    </chakra.header>
  );
};
