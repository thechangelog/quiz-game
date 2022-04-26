import { RenderMachine } from 'storybook-xstate-addon/RenderMachine';
import { gameMachine } from './gameMachine';

export default {
  title: 'Game Machine',
  parameters: {
    xstate: true,
  },
};

export const Default = () => <RenderMachine machine={gameMachine} />;
