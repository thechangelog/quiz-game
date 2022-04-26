const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import Profile from '../../../src/widgets/Profile';
import * as css from '../../../src/widgets/styles/Profile.m.css';

describe('Profile', () => {
	it('default renders correctly', () => {
		const h = harness(() => <Profile username="Dojo User" />);
		h.expect(() => <h1 classes={[css.root]}>Welcome Dojo User!</h1>);
	});
});
