import { useContext } from 'react';
import { QuizSettingContext } from '../../contexts/QuizSettingContext';
import { QuizSetting } from '../../models/QuizSetting';

export const useQuizSetting = (): QuizSetting => {
  const quizSetting = useContext(QuizSettingContext);
  if (!quizSetting)
    throw new Error('useQuizSetting must be inside a Provider with a value');

  return quizSetting;
};
