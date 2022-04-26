import { GameProvider } from '../src/GameProvider';
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <GameProvider>
      <Story />
    </GameProvider>
  ),
  (Story) => (
    <div style={{backgroundColor: '#101820', margin:'3em', padding: '3em'}}>
    <Story />
  </div>
  )
];
