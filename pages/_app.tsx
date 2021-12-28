import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { NoSSR } from '../components/common/nossr/NoSSR';
import { theme } from '../lib/theme';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <NoSSR>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </NoSSR>
  );
}

export default MyApp;
