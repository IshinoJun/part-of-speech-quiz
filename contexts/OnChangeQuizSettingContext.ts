import React from 'react';
import { QuizSetting } from '../models/QuizSetting';

export type OnChangeQuizSetting = (value: QuizSetting) => void;

export const OnChangeQuizSettingContext =
  React.createContext<OnChangeQuizSetting | null>(null);
