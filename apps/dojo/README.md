# JS Danger / Go Panic

A Jeopardy-style board game interface used by Changelog for the [JS Party](https://changelog.com/jsparty) and [Go Time](https://changelog.com/gotime) podcasts.

This project was generated with the [Dojo CLI](https://github.com/dojo/cli) & [Dojo CLI create app command](https://github.com/dojo/cli-create-app).

## Build

Run `npm run build` or `dojo build --mode dist` (the `mode` option defaults to `dist`) to create a production build for the project. The built artifacts will be stored in the `output/dist` directory.

## Development Build

Run `npm run build:dev` or `dojo build --mode dev` to create a development build for the project. The built artifacts will be stored in the `output/dev` directory.

## Development server

Run `npm run dev` or `dojo build --mode dev --watch file --serve` to create a development build and start a development server. By default the server runs on port `9999`, navigate to `http://localhost:9999/`.

To change the port of the development server use the `--port` option on the `dojo build` command.

To create an in memory development build and start a development server with hot reload, switch the `--watch` option to `memory`.

## Operating the game

- `esc` or `q` returns to main view, stopping audio
- `c` shows contestants view (use between rounds)
- `▶️` moves to next round
- `◀️` moves to previous round
- `b` plays "times up" sound
- `y` plays "correct answer" sound
- `n` plays "incorrect answer" sound
- `t` plays "theme song" sound
- `T` plays "stressed out theme song" sound
- `w` plays "winner" song

## Legal

Code is released under the [MIT license](/LICENSE).

Images and sounds are released under the [CC BY 4.0 license](https://creativecommons.org/licenses/by/4.0/).

This project is in no way affiliated with nor endorsed by [America's Favorite Quiz Show](https://www.jeopardy.com).
