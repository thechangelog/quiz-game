const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/ActiveLink';
import Toolbar from '@dojo/widgets/toolbar';

import Menu from '../../../src/widgets/Menu';
import * as css from '../../../src/widgets/styles/Menu.m.css';

describe('Menu', () => {
	it('default renders correctly', () => {
		const h = harness(() => <Menu />);
		h.expect(() => (
			<div classes={css.root}>
				<Toolbar heading="My Dojo App!" collapseWidth={600}>
					<Link to="home" classes={[css.link]} activeClasses={[css.selected]}>
						Home
					</Link>
					<Link to="about" classes={[css.link]} activeClasses={[css.selected]}>
						About
					</Link>
					<Link to="profile" classes={[css.link]} activeClasses={[css.selected]}>
						Profile
					</Link>
				</Toolbar>
			</div>
		));
	});
});
