import { tsx, create } from '@dojo/framework/core/vdom';

import * as css from './styles/Home.m.css';

const factory = create();

export default factory(function Profile() {
	return <h1 classes={[css.root]}>Home Page</h1>;
});
