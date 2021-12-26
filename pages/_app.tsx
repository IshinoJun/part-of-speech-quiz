import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { NoSSR } from '../components/common/nossr/NoSSR';
import { OnChangeQuizSettingContext } from '../contexts/OnChangeQuizSettingContext';
import { QuizSettingContext } from '../contexts/QuizSettingContext';
import { QuizSettingType } from '../enums/QuizSettingType';
import { theme } from '../lib/theme';
import { QuizSetting } from '../models/QuizSetting';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [quizSetting, setQuizSetting] = useState<QuizSetting>({
    settingType: QuizSettingType.FIXED,
  });

  return (
    <NoSSR>
      <ChakraProvider resetCSS theme={theme}>
        <QuizSettingContext.Provider value={quizSetting}>
          <OnChangeQuizSettingContext.Provider value={setQuizSetting}>
            <Component {...pageProps} />
          </OnChangeQuizSettingContext.Provider>
        </QuizSettingContext.Provider>
      </ChakraProvider>
    </NoSSR>
  );
}

export default MyApp;
