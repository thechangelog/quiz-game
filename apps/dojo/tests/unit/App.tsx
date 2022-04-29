const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import Outlet from '@dojo/framework/routing/Outlet';

import Menu from '../../src/widgets/Menu';
import Home from '../../src/widgets/Home';
import About from '../../src/widgets/About';
import Profile from '../../src/widgets/Profile';

import App from '../../src/App';
import * as css from '../../src/App.m.css';

describe('App', () => {
	it('default renders correctly', () => {
		const h = harness(() => <App />);
		h.expect(() => (
			<div classes={[css.root]}>
				<Menu />
				<div>
					<Outlet key="home" id="home" renderer={() => <Home />} />
					<Outlet key="about" id="about" renderer={() => <About />} />
					<Outlet key="profile" id="profile" renderer={() => <Profile username="Dojo User" />} />
				</div>
			</div>
		));
	});

	it('home outlet renderer', () => {
		const h = harness(() => <App />);
		const renderer = h.trigger('@home', 'renderer');
		h.expect(() => <Home />, () => renderer);
	});

	it('about outlet renderer', () => {
		const h = harness(() => <App />);
		const renderer = h.trigger('@about', 'renderer');
		h.expect(() => <About />, () => renderer);
	});

	it('profile outlet renderer', () => {
		const h = harness(() => <App />);
		const renderer = h.trigger('@profile', 'renderer');
		h.expect(() => <Profile username="Dojo User" />, () => renderer);
	});
});
