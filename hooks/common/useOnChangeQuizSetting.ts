import { useContext } from 'react';
import {
  OnChangeQuizSetting,
  OnChangeQuizSettingContext,
} from '../../contexts/OnChangeQuizSettingContext';

export const useOnChangeQuizSetting = (): OnChangeQuizSetting => {
  const onChangeQuizSetting = useContext(OnChangeQuizSettingContext);
  if (!onChangeQuizSetting)
    throw new Error(
      'useOnChangeQuizSetting must be inside a Provider with a value',
    );

  return onChangeQuizSetting;
};
