# Robots
Robot's city...will be in the future :)

Download the code and run *dist/index.html* to watch it in action or run command `$ npm run build` in root directory to compile the code to dist/ folder.
Also you can watch the demo here: http://i98535xh.bget.ru/robots/ (not always current version of the code)

## Stack

- [Phaser 4](https://phaser.io/) (`phaser` `^4.2.1`) — игровой движок, сцена и аркадная физика.
- `phaser4-rex-plugins` `^4.2.0` — плагин `MoveTo` для движения билдера по пути.
- Vue 3 (`vue` `^3.5`) — обёртка интерфейса на Composition API; SFC собираются
  `vue-loader` 17 + `@vue/compiler-sfc`, стили инжектятся `style-loader`.

## Commands

1. `npm install`
2. `npm run build` — собрать бандл в `dist/`.
3. `npm run tests` — запустить unit-тесты (Jest).
4. `npm start` — поднять `dist/` локально.
5. Open `dist/index.html` (или адрес из `npm start`).

### Makefile

- `make init` — установить зависимости, собрать, прогнать тесты и запустить.
- `make up` — запустить проект.
- `make build` — собрать проект.
- `make tests` — все тесты.
- `make tests-unit` — только модульные тесты.
- `make tests-coverage` — тесты с отчётом о покрытии (`coverage/`).
