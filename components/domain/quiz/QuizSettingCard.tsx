import { Box, Button, Divider, Icon, Stack } from '@chakra-ui/react';
import { useCallback } from 'react';
import { FaListOl, FaRandom } from 'react-icons/fa';
import { QuizSettingType } from '../../../enums/QuizSettingType';
import { unreachable } from '../../../utils/ErrorHandling.utils';
import { Card } from '../../common/card/Card';
import { ButtonRadioGroup } from '../../common/radio/ButtonRadioGroup';

interface Props {
  quizSetting: QuizSettingType;
  onChangeQuizSetting: (value: QuizSettingType) => void;
  onClickStart: () => void;
}

export const QuizSettingCard = ({
  quizSetting,
  onChangeQuizSetting,
  onClickStart,
}: Props): JSX.Element => {
  const handleChangeRadio = useCallback(
    (nextValue: string) => {
      switch (nextValue) {
        case QuizSettingType.FIXED:
        case QuizSettingType.RANDOM: {
          onChangeQuizSetting(nextValue);
          break;
        }
        default:
          unreachable();
      }
    },
    [onChangeQuizSetting],
  );

  return (
    <Card
      title='出題方法の選択'
      subTitle='出題される英単語がどの品詞か当てましょう！出題方法を選択してStartを押してください！'
    >
      <Divider />
      <Box pt='6' pb='12'>
        <Box
          maxW={{ base: 'xl', md: '7xl' }}
          mx='auto'
          px={{ base: '6', md: '8' }}
        >
          <Stack maxW='xl' mx='auto' spacing='4'>
            <ButtonRadioGroup
              value={quizSetting}
              onChange={handleChangeRadio}
              options={[
                {
                  label: 'Fixed',
                  description: '問題順で出題されます',
                  value: QuizSettingType.FIXED,
                  icon: <Icon as={FaListOl} color='gray.500' fontSize='24px' />,
                },
                {
                  label: 'Random',
                  description: 'ランダムで出題されます',
                  icon: <Icon as={FaRandom} color='gray.500' fontSize='24px' />,
                  value: QuizSettingType.RANDOM,
                },
              ]}
            />
            <Button
              variant='outline'
              bg='cyan.600'
              color='white'
              onClick={onClickStart}
            >
              Start
            </Button>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
};
