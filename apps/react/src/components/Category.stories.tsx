import { Meta, Story } from '@storybook/react';
import { Question as QuestionData } from '../types';
import Category, { CategoryProps } from './Category';

const questions: QuestionData[] = Array.from({ length: 5 }, (_, i) => {
  const value = i + 1;
  return {
    value: value * 100,
    clue: `Clue question ${value}`,
    answer: `Answer ${value}`,
  };
});

export default {
  title: 'Components / Category',
  args: {
    onClick: () => {},
    category: {
      hint: 'This is a hint',
      name: 'Category Name',
      questions,
    },
  },
} as Meta;

export const Default: Story<CategoryProps> = (args) => <Category {...args} />;
