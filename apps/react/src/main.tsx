import { inspect } from '@xstate/inspect';
import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GameProvider } from './GameProvider';
import './index.css';

inspect({
  iframe: () => document.querySelector<HTMLIFrameElement>('[data-xstate]'),
});

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <GameProvider>
        <App />
      </GameProvider>
    </Suspense>
  </StrictMode>,
  document.getElementById('root'),
);
