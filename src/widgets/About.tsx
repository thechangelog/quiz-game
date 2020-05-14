import { tsx, create } from '@dojo/framework/core/vdom';

import * as css from './styles/About.m.css';

const factory = create();

export default factory(function Profile() {
	return <h1 classes={[css.root]}>About Page</h1>;
});
