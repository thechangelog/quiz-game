import { create, tsx } from '@dojo/framework/core/vdom';
import { Category as CategoryData } from '../interfaces';
import Question from './Question';
import * as css from './styles/Category.m.css';

export interface CategoryProperties extends CategoryData {}

const factory = create({}).properties<CategoryProperties>();

export const Category = factory(function Category({ middleware: {}, properties }) {
	const { name, questions } = properties();
	return (
		<div classes={css.root}>
			<div classes={[css.box, css.categoryTitle]}>{name}</div>
			{questions.map((q) => (
				<Question key={q.value} {...q} />
			))}
		</div>
	);
});

export default Category;
