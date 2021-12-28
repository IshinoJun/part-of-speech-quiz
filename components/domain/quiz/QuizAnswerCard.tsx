import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import useSound from 'use-sound';
import { Quiz } from '../../../models/Quiz';
import { Card } from '../../common/card/Card';
import { CardProperty } from '../../common/card/CardProperty';
import { NoSSR } from '../../common/nossr/NoSSR';

interface Props {
  quizList: Quiz[];
  resultList: string[];
  quizIndex: number;
  onClickNext: () => void;
  onChangeResultList: (value: string[]) => void;
}

export const QuizAnswerCard = ({
  resultList,
  quizIndex,
  onClickNext,
  onChangeResultList,
  quizList,
}: Props): JSX.Element => {
  const [isSolved, setIsSolved] = useBoolean();
  const [play] = useSound(`/sounds/${quizList[quizIndex].word}.mp3`);

  const QUIZ_OPTIONS = ['名詞', '動詞', '形容詞', '副詞'] as const;
  const ITEM_LIST = [
    { label: '単語', key: 'word' },
    { label: '意味', key: 'meaning' },
    { label: '品詞', key: 'partOfSpeech' },
    { label: '接尾辞', key: 'suffix' },
  ] as const;

  const handleClickRadio = useCallback(
    (value: string) => {
      const newResultList = [...resultList];
      newResultList[quizIndex] = value;
      onChangeResultList(newResultList);
    },
    [onChangeResultList, quizIndex, resultList],
  );

  const handleClickNext = useCallback(() => {
    setIsSolved.off();
    onClickNext();
  }, [onClickNext, setIsSolved]);

  const handleClickAnswer = useCallback(() => {
    setIsSolved.on();
  }, [setIsSolved]);

  const handleClickSound = useCallback(() => {
    play();
  }, [play]);

  return (
    <Card
      title={`Q${quizList[quizIndex].no}.`}
      headerRightElement={
        <Text fontSize='sm' color='gray.600'>
          {`${quizIndex + 1} / ${quizList.length}`}
        </Text>
      }
    >
      <Divider />
      <Box pt='6' pb='12'>
        <Box
          maxW={{ base: 'xl', md: '7xl' }}
          mx='auto'
          px={{ base: '6', md: '8' }}
        >
          {!isSolved ? (
            <Stack maxW='xl' mx='auto' spacing='8'>
              <HStack justify='center'>
                <Box pos='relative'>
                  <Text fontSize='6xl' color='gray.700'>
                    {quizList[quizIndex].word}
                  </Text>
                  <IconButton
                    aria-label='音声再生'
                    icon={<Icon as={FaVolumeUp} />}
                    color='gray.600'
                    variant='link'
                    pos='absolute'
                    top='5px'
                    right='-20px'
                    onClick={handleClickSound}
                  />
                </Box>
              </HStack>
              <NoSSR>
                <RadioGroup
                  onChange={handleClickRadio}
                  value={resultList[quizIndex]}
                >
                  <Stack direction='row' justifyContent='center'>
                    {QUIZ_OPTIONS.map((option) => (
                      <Radio value={option} key={option}>
                        {option}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </NoSSR>
              <Button
                variant='outline'
                bg='cyan.600'
                color='white'
                disabled={!resultList[quizIndex]}
                onClick={handleClickAnswer}
              >
                回答
              </Button>
            </Stack>
          ) : (
            <Stack maxW='xl' mx='auto' spacing='8'>
              <HStack justify='center'>
                <Box pos='relative'>
                  <Text fontSize='6xl' color='gray.700'>{`${
                    quizList[quizIndex].partOfSpeech === resultList[quizIndex]
                      ? '正解 🎉'
                      : '残念 😢'
                  }`}</Text>
                </Box>
              </HStack>
              <Box>
                {ITEM_LIST.map((item) => (
                  <CardProperty
                    key={item.key}
                    label={item.label}
                    value={quizList[quizIndex][item.key]}
                  />
                ))}
              </Box>
              <Button
                variant='outline'
                bg='cyan.600'
                color='white'
                onClick={handleClickNext}
              >
                次へ
              </Button>
            </Stack>
          )}
        </Box>
      </Box>
    </Card>
  );
};
