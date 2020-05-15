import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import icache from '@dojo/framework/core/middleware/icache';
import dojo from '@dojo/themes/dojo';
import { Game } from './interfaces';

import Contestant from './widgets/Contestant';
import Answer from './widgets/Answer';

import * as css from './App.m.css';

const factory = create({ theme, icache });

export default factory(function App({ middleware: { theme, icache } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}

	const game = icache.getOrSet('game', async () => {
		const response = await fetch('./assets/game.json');

		if (response.status !== 200) {
			throw new Error('Failed to fetch game data.');
		}

		return (await response.json()).game as Game;
	});

	return (
		game && (
			<div classes={[css.root]}>
				<Answer
					points={300}
					text="This framework is definitely probably better than React."
				/>
				<div
					styles={{
						width: '400px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					{game.contestants.map((c) => (
						<Contestant name={c.name} handle={c.handle} score={c.score || 0} />
					))}
				</div>
			</div>
		)
	);
});
