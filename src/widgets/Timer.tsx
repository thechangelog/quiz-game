import { create, tsx } from '@dojo/framework/core/vdom';
import * as css from './styles/Timer.m.css';
import icache from '@dojo/framework/core/middleware/icache';

export interface TimerProperties {
	active?: boolean;
	length?: number;
	onTimeEnd?: () => void;
	onInterval?: (remaining: number) => void;
}

const factory = create({ icache }).properties<TimerProperties>();

export const Timer = factory(function Timer({ middleware: { icache }, properties }) {
	const { length = 5, onTimeEnd } = properties();
	const seconds = icache.getOrSet('seconds', length);
	const isActive = icache.getOrSet('isActive', false);
	const interval = icache.getOrSet<number | undefined>('interval', undefined);
	const reset = () => {
		icache.set('seconds', length);
		icache.set('isActive', false);
		icache.set('interval', undefined);
		clearInterval(interval);
	};
	const setSeconds = (value: number) => {
		icache.set('seconds', value > 0 ? value : 0);
	};

	if (isActive && seconds === 0) {
		reset();
		onTimeEnd && onTimeEnd();
	} else if ((!isActive && interval) || seconds === 0) {
		reset();
	} else if (isActive && !interval) {
		const interval = setInterval(() => {
			const seconds = icache.getOrSet('seconds', 0) - 1;
			const { onInterval } = properties();
			setSeconds(seconds);
			onInterval && onInterval(seconds);
		}, 1000);
		icache.set('interval', interval);
	}

	return (
		<div classes={css.root} onclick={() => icache.set('isActive', !isActive)}>
			{Array(length * 2 - 1)
				.fill(0)
				.map((_, i) => {
					const elapsed = length - seconds - 1;
					return (
						<div
							key={`tick-${i}`}
							classes={[
								css.tick,
								(i < length && elapsed < i) ||
								(i >= length && i < length * 2 - 2 - elapsed)
									? css.filledIn
									: null
							]}
						></div>
					);
				})}
		</div>
	);
});

export default Timer;
