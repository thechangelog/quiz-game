import { create, tsx } from '@dojo/framework/core/vdom';
import { Category as CategoryData } from '../interfaces';
import store from '../middleware/store';
import { setCurrentQuestion } from '../processes/game';
import * as css from './styles/Category.m.css';

export interface CategoryProperties extends CategoryData {}

const factory = create({ store }).properties<CategoryProperties>();

export const Category = factory(function Category({ middleware: { store }, properties }) {
	const { name, questions } = properties();
	const { executor } = store;
	return (
		<div classes={css.root}>
			<div classes={[css.box, css.title]}>{name}</div>
			{questions.map((question) => (
				<div
					onclick={() => {
						executor(setCurrentQuestion)({ question });
					}}
					classes={[css.box, css.value]}
				>
					{String(question.value)}
				</div>
			))}
		</div>
	);
});

export default Category;
