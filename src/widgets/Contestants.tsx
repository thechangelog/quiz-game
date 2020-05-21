import { create, tsx } from '@dojo/framework/core/vdom';
import { Contestant as ContestantData } from '../interfaces';
import Contestant from './Contestant';
import * as css from './styles/Contestants.m.css';

export interface ContestantsProperties {
	contestants: ContestantData[];
	horizontal?: boolean;
}

const factory = create({}).properties<ContestantsProperties>();

export const Contestants = factory(function Contestants({ properties }) {
	const { contestants, horizontal } = properties();
	return (
		<div classes={[css.root, horizontal && css.horizontal]}>
			{contestants.map((contestant) => (
				<Contestant large={horizontal} contestant={contestant} />
			))}
		</div>
	);
});

export default Contestants;
