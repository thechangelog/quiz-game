import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import dojo from '@dojo/themes/dojo';

import Contestant from './Contestant';
import Answer from './Answer';

import * as css from './App.m.css';

const factory = create({ theme });

export default factory(function App({ middleware: { theme } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}
	return (
		<div classes={[css.root]}>
			<Answer points={300} text="This framework is definitely probably better than React." />
			<div
				styles={{
					width: '400px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Contestant name="Nick Nisi" handle="nicknisi" score={-1500} />
				<Contestant name="Jerod Santo" handle="jerodsanto" score={2500} />
				<Contestant name="Suz Hinton" handle="noopkat" score={300} />
			</div>
		</div>
	);
});
