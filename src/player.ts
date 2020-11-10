export const sounds = {
	correctAnswer: 'Correct Answer.wav',
	correctSteal: 'Correct Steal.wav',
	jsDangerStressTheme: 'JS Danger Stress Theme.wav',
	jsDangerTheme: 'JS Danger Theme.wav',
	goPanicTheme: 'Go Panic Theme.wav',
	goPanicWinner: 'Go Panic Winner.wav',
	jsDangerWinner: 'JS Danger Winner.wav',
	timesUp: 'Times Up.wav',
	wrongAnswer: 'Wrong Answer.wav',
	wrongSteal: 'Wrong Steal.wav'
} as const;

const players = new Map<string, HTMLAudioElement>();

export function stopAudio() {
	players.forEach((player) => {
		player.pause();
		player.currentTime = 0;
	});
}

export function playAudio(sound: keyof typeof sounds) {
	const path = `assets/${sounds[sound]}`;
	if (!players.has(path)) {
		players.set(path, new Audio(path));
	}
	const player = players.get(path)!;
	player.play();
}

export default playAudio;
