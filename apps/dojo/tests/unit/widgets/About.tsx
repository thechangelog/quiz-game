const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import About from '../../../src/widgets/About';
import * as css from '../../../src/widgets/styles/About.m.css';

describe('About', () => {
	it('default renders correctly', () => {
		const h = harness(() => <About />);
		h.expect(() => <h1 classes={[css.root]}>About Page</h1>);
	});
});
