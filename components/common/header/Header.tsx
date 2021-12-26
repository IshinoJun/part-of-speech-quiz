import { Button, Center, chakra, Heading } from '@chakra-ui/react';
import Router from 'next/router';
import React, { useCallback } from 'react';

export const Header = (): JSX.Element => {
  const handleClickReload = useCallback(() => {
    Router.reload();
  }, []);

  return (
    <chakra.header>
      <Center py={2} position='relative' bg='cyan.500'>
        <Button variant='unstyled' onClick={handleClickReload}>
          <Heading fontSize='2xl' color='white'>
            品詞 クイズ
          </Heading>
        </Button>
      </Center>
    </chakra.header>
  );
};
