import React from 'react';
import { QuizSetting } from '../models/QuizSetting';

export const QuizSettingContext = React.createContext<QuizSetting | null>(null);
