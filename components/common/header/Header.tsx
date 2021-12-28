import { Button, Center, chakra, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

export const Header = (): JSX.Element => {
  const router = useRouter();

  const handleClickReload = useCallback(() => {
    void router.push('/');
  }, [router]);

  return (
    <chakra.header>
      <Center py={2} position='relative' bg='cyan.600'>
        <Button variant='unstyled' onClick={handleClickReload}>
          <Heading fontSize='2xl' color='white'>
            品詞 クイズ
          </Heading>
        </Button>
      </Center>
    </chakra.header>
  );
};
