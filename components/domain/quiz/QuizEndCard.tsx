import {
  Box,
  Button,
  Center,
  Divider,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Quiz } from '../../../models/Quiz';
import { Card } from '../../common/card/Card';

interface Props {
  quizList: Quiz[];
  resultList: string[];
  onClickTop: () => void;
}

export const QuizEndCard = ({
  quizList,
  resultList,
  onClickTop,
}: Props): JSX.Element => {
  const COLUMNS = [
    { Header: '単語', accessor: 'word' },
    { Header: '解答', accessor: 'answer' },
    { Header: '正解', accessor: 'partOfSpeech' },
  ] as const;

  return (
    <Card
      title='お疲れさまでした 🎉'
      subTitle='繰り返すことで記憶を定着させましょう！'
    >
      <Divider />
      <Box pt='6' pb='12'>
        <Box
          maxW={{ base: 'xl', md: '7xl' }}
          mx='auto'
          px={{ base: '6', md: '8' }}
        >
          <Stack maxW='xl' mx='auto' spacing='8'>
            <Center>
              <Text fontSize='6xl' color='gray.700'>
                {`${
                  resultList.filter((r, i) => quizList[i].partOfSpeech === r)
                    .length
                } / ${quizList.length}`}
              </Text>
            </Center>
            <Box overflow='scroll'>
              <Table my='8' borderWidth='1px' fontSize='sm'>
                <Thead bg='gray.50'>
                  <Tr>
                    {COLUMNS.map((column, index) => (
                      <Th whiteSpace='nowrap' scope='col' key={index}>
                        {column.Header}
                      </Th>
                    ))}
                    <Th />
                  </Tr>
                </Thead>
                <Tbody>
                  {resultList.map((row, index) => (
                    <Tr key={index}>
                      <Td whiteSpace='nowrap'>{quizList[index].word}</Td>
                      <Td whiteSpace='nowrap'>
                        {quizList[index].partOfSpeech}
                      </Td>
                      <Td whiteSpace='nowrap'>{row}</Td>
                      {row === quizList[index].partOfSpeech ? (
                        <Td textAlign='right' color='cyan.600'>
                          ○
                        </Td>
                      ) : (
                        <Td textAlign='right' color='red.600'>
                          ×
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            <Button
              variant='outline'
              bg='cyan.500'
              color='white'
              onClick={onClickTop}
            >
              Top
            </Button>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
};
