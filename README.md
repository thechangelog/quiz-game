# Quiz Game

This repository contains implementation of the quiz game as seen on [JS Party](https://jsparty.fm) and [Go
Time](https://gotime.fm).

![quiz-game](https://user-images.githubusercontent.com/293805/165973302-8afe7c46-32a2-44ec-8cc2-253aae6f6be4.png)


## History

This game started out as a [Dojo](https://dojo.io) app, and was then ported to [React](https://reactjs.org) + [XState](https://xstate.js.org). Now, each implementation exists in this repository as a separate npm workspace, and future implementations may be added.

## Getting started

For more detailed information, see the READMEs for each implementation in their respective folders.

The dojo implementation exists at `apps/dojo` and the React implementation exists at `apps/react`.

To run either project, simply execute the following commands.

For React:

```shell
npm run dev -w quiz-game-react
```

For Dojo:

```shell
npm run dev -w quiz-game-dojo
```
