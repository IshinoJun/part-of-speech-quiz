import { Box, useBoolean } from '@chakra-ui/react';
import { MicroCMSListResponse } from 'microcms-js-sdk';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Layout } from '../components/common/layout/Layout';
import { QuizAnswerCard } from '../components/domain/quiz/QuizAnswerCard';
import { QuizEndCard } from '../components/domain/quiz/QuizEndCard';
import { QuizSettingType } from '../enums/QuizSettingType';
import { useWarningOnExit } from '../hooks/common/useWarningOnExit';
import { Quiz } from '../models/Quiz';
import { apiClient } from '../utils/apiClient';
import { buildSounds } from '../utils/soundUtils';

interface Props {
  quizList: MicroCMSListResponse<Quiz>;
}

const Quiz: NextPage<Props> = ({ quizList }) => {
  const router = useRouter();
  const [resultList, setResultList] = useState<string[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [newQuizList, setNewQuizList] = useState(quizList.contents);
  const [isEnd, setIsEnd] = useBoolean();
  useWarningOnExit(!isEnd);

  const handleClickNext = useCallback(() => {
    if (quizIndex + 1 === quizList.totalCount) {
      setIsEnd.on();
    } else {
      setQuizIndex((prev) => prev + 1);
    }
  }, [quizIndex, quizList.totalCount, setIsEnd]);

  const handleClickTop = useCallback(() => {
    void router.push('/');
  }, [router]);

  const randomList = useCallback(() => {
    const array = [...quizList.contents];
    for (let i = array.length - 1; i >= 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [array[i], array[rand]] = [array[rand], array[i]];
    }
    return array;
  }, [quizList.contents]);

  useEffect(() => {
    if (router.query.type === QuizSettingType.RANDOM) {
      setNewQuizList(randomList());
    } else {
      setNewQuizList(quizList.contents);
    }
  }, [quizList.contents, randomList, router.query.type]);

  return (
    <>
      <Head>
        <title>品詞クイズ</title>
      </Head>
      <Layout>
        <Box as='main' py='16'>
          {!isEnd ? (
            <QuizAnswerCard
              quizIndex={quizIndex}
              resultList={resultList}
              onChangeResultList={setResultList}
              quizList={newQuizList}
              onClickNext={handleClickNext}
            />
          ) : (
            <QuizEndCard
              quizList={newQuizList}
              resultList={resultList}
              onClickTop={handleClickTop}
            />
          )}
        </Box>
      </Layout>
    </>
  );
};

export default Quiz;

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
