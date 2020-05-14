import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import Outlet from '@dojo/framework/routing/Outlet';
import dojo from '@dojo/themes/dojo';

import Menu from './widgets/Menu';
import Home from './widgets/Home';
import About from './widgets/About';
import Profile from './widgets/Profile';

import * as css from './App.m.css';

const factory = create({ theme });

export default factory(function App({ middleware: { theme } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}
	return (
		<div classes={[css.root]}>
			<Menu />
			<div>
				<Outlet key="home" id="home" renderer={() => <Home />} />
				<Outlet key="about" id="about" renderer={() => <About />} />
				<Outlet key="profile" id="profile" renderer={() => <Profile username="Dojo User" />} />
			</div>
		</div>
	);
});
