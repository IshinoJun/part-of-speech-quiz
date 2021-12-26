import { Box, BoxProps, HStack, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';

interface Props {
  title?: string;
  children: React.ReactNode;
  subTitle?: string;
  headerRightElement?: JSX.Element;
}

export const Card = ({
  children,
  title,
  subTitle,
  headerRightElement,
  ...props
}: BoxProps & Props): JSX.Element => (
  <Box
    bg='white'
    rounded={{ lg: 'lg' }}
    maxW='3xl'
    mx='auto'
    shadow='base'
    {...props}
  >
    {title ? (
      <HStack px='6' py='5' justify='space-between'>
        <Stack spacing='1'>
          <Text as='h2' fontWeight='bold' fontSize='lg' color='gray.900'>
            {title}
          </Text>
          <Text fontSize='sm' color='gray.600'>
            {subTitle}
          </Text>
        </Stack>
        {headerRightElement}
      </HStack>
    ) : null}
    {children}
  </Box>
);
