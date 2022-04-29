import { Meta, Story } from '@storybook/react';
import { Player as ContestantData } from '../types';
import { Player, PlayerProps } from './Player';

const contestant: ContestantData = {
  name: 'Nick Nisi',
  handle: 'nicknisi',
  avatar: 'https://pbs.twimg.com/profile_images/1455971061271498755/oIr282mQ_400x400.jpg',
  score: 0,
};

export default {
  title: 'Components / Contestant',
  args: {
    ...contestant,
    onIncrement: () => {},
    onDecrement: () => {},
  },
} as Meta;

export const Default: Story<PlayerProps> = (args) => <Player {...args} />;
export const Large: Story<PlayerProps> = (args) => <Player {...args} large />;
