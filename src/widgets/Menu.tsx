import { tsx, create } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/ActiveLink';
import Toolbar from '@dojo/widgets/toolbar';

import * as css from './styles/Menu.m.css';

const factory = create();

export default factory(function Menu() {
	return (
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
	);
});
