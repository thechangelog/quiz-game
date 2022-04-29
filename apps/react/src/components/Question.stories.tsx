import { Meta, Story } from '@storybook/react';
import { Question as QuestionData } from '../types';
import { Question, QuestionProps } from './Question';

const question: QuestionData = {
  value: 300,
  clue: 'What is the value of this question?',
  answer: '300',
};

export default {
  title: 'Components / Question',
  args: {
    question,
    category: 'Category',
  },
} as Meta;

export const Default: Story<QuestionProps> = (args) => <Question {...args} />;

export const WithAnswer: Story<QuestionProps> = (args) => <Question {...args} showAnswer />;
