import {
  Box,
  Button,
  Center,
  Divider,
  Icon,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { IoClose, IoEllipseOutline } from 'react-icons/io5';
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
    { Header: '正解', accessor: 'partOfSpeech' },
    { Header: '解答', accessor: 'answer' },
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
            <Table borderWidth='1px' fontSize='sm'>
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
                {resultList.map((result, index) => (
                  <Tr key={index}>
                    <Td whiteSpace='nowrap'>{quizList[index].word}</Td>
                    <Td whiteSpace='nowrap'>{quizList[index].partOfSpeech}</Td>
                    <Td whiteSpace='nowrap'>{result}</Td>
                    {result === quizList[index].partOfSpeech ? (
                      <Td textAlign='right' color='cyan.600'>
                        <Icon as={IoEllipseOutline} />
                      </Td>
                    ) : (
                      <Td textAlign='right' color='red.600'>
                        <Icon as={IoClose} />
                      </Td>
                    )}
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Button
              variant='outline'
              bg='cyan.600'
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
