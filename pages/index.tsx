import { Box } from '@chakra-ui/react';
import { MicroCMSListResponse } from 'microcms-js-sdk';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import { Layout } from '../components/common/layout/Layout';
import { QuizAnswerCard } from '../components/domain/quiz/QuizAnswerCard';
import { QuizEndCard } from '../components/domain/quiz/QuizEndCard';
import { QuizSettingCard } from '../components/domain/quiz/QuizSettingCard';
import { QuizSettingType } from '../enums/QuizSettingType';
import { QuizStatusType } from '../enums/QuizStatusType';
import { useWarningOnExit } from '../hooks/common/useWarningOnExit';
import { Quiz } from '../models/Quiz';
import { apiClient } from '../utils/apiClient';
import { buildSounds } from '../utils/soundUtils';
interface Props {
  quizList: MicroCMSListResponse<Quiz>;
}

const Home: NextPage<Props> = ({ quizList }) => {
  const [resultList, setResultList] = useState<string[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [newQuizList, setNewQuizList] = useState(quizList.contents);

  const [quizSetting, setQuizSetting] = useState<QuizSettingType>(
    QuizSettingType.FIXED,
  );
  const [status, setStatus] = useState<QuizStatusType>(QuizStatusType.SETTING);
  useWarningOnExit(status === QuizStatusType.QUIZ);

  const handleClickStart = useCallback(() => {
    const newResultList = [...resultList];
    newResultList.push('');

    setStatus(QuizStatusType.QUIZ);
  }, [resultList]);

  const handleClickTop = useCallback(() => {
    setResultList([]);
    setQuizSetting(QuizSettingType.FIXED);
    setStatus(QuizStatusType.SETTING);
  }, []);

  const handleClickNext = useCallback(() => {
    if (quizIndex + 1 === quizList.totalCount) {
      setStatus(QuizStatusType.END);
      setQuizIndex(0);
    } else {
      setQuizIndex((prev) => prev + 1);
    }
  }, [quizIndex, quizList.totalCount]);

  const random = useCallback(() => {
    const array = [...quizList.contents];
    for (let i = array.length - 1; i >= 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [array[i], array[rand]] = [array[rand], array[i]];
    }
    return array;
  }, [quizList.contents]);

  useEffect(() => {
    if (status === QuizStatusType.SETTING) {
      if (quizSetting === QuizSettingType.RANDOM) {
        setNewQuizList(random());
      } else {
        setNewQuizList(quizList.contents);
      }
    }
  }, [quizList.contents, quizSetting, random, status]);

  return (
    <>
      <Head>
        <title>品詞クイズ</title>
        <meta
          name='description'
          content='出題される単語がどの品詞に当てはまるか当てましょう！'
        />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <Layout>
        <Box as='main' py='16'>
          {status === QuizStatusType.SETTING ? (
            <QuizSettingCard
              quizSetting={quizSetting}
              onChangeQuizSetting={setQuizSetting}
              onClickStart={handleClickStart}
            />
          ) : status === QuizStatusType.QUIZ ? (
            <QuizAnswerCard
              quizIndex={quizIndex}
              resultList={resultList}
              onChangeResultList={setResultList}
              quizList={newQuizList}
              onClickNext={handleClickNext}
            />
          ) : status === QuizStatusType.END ? (
            <QuizEndCard
              quizList={newQuizList}
              resultList={resultList}
              onClickTop={handleClickTop}
            />
          ) : null}
        </Box>
      </Layout>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const quizList = await apiClient.quiz.$get({ query: { limit: 1000 } });
  /** TODO: コマンドで実行できるようにしたい */
  await buildSounds(quizList.contents);

  return {
    props: {
      quizList,
    },
  };
};
