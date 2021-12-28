import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { Layout } from '../components/common/layout/Layout';
import { QuizSettingCard } from '../components/domain/quiz/QuizSettingCard';
import { QuizSettingType } from '../enums/QuizSettingType';

const Home: NextPage = () => {
  const router = useRouter();
  const [quizSetting, setQuizSetting] = useState<QuizSettingType>(
    QuizSettingType.FIXED,
  );

  const handleClickStart = useCallback(() => {
    void router.push({ pathname: '/quiz', query: { type: quizSetting } });
  }, [quizSetting, router]);

  return (
    <>
      <Head>
        <title>品詞クイズ</title>
      </Head>
      <Layout>
        <Box as='main' py='16'>
          <QuizSettingCard
            quizSetting={quizSetting}
            onChangeQuizSetting={setQuizSetting}
            onClickStart={handleClickStart}
          />
        </Box>
      </Layout>
    </>
  );
};

export default Home;
