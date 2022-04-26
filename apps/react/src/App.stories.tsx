import { Meta, Story } from '@storybook/react';
import App from './App';

export default {
  title: 'Game Board',
  args: {},
  parameters: {
    xstate: true,
  },
} as Meta;

export const Default: Story = (args) => <App {...args} />;
