# AGENTS.md

Файл создан из шаблона `alxmrz/agent-kit`. Дальше он ваш: kit его не перезаписывает.
Заполните разделы под проект; общие правила уже подключены в `instructions[]` файла
`opencode.json`.

## 1. Стек проекта

- JavaScript (ES modules), Phaser 4 (`phaser` `^4.2.1`), Vue 2, webpack 5. Точка входа —
  `src/main.js`.
- Движение билдера по пути — `MoveTo` из `phaser4-rex-plugins` `^4.2.0`.
- Источник истины по командам — `package.json` (секции `scripts` и `jest`).

## 2. Команды

- Запуск: `npm start` (раздаёт `dist/`); сначала нужен `npm run build`.
- Сборка: `npm run build`
- Тесты: `npm run tests`
- Один тест: `npx jest tests/unit/Builder.test.js`

Обновляйте этот раздел, когда меняются команды запуска.

## 3. Правила

- Общие правила написания кода — `.agents/rules/alxmrz_kit_general_rules.md`. Подключены в
  `instructions[]` файла `opencode.json`; здесь они не повторяются.
- Правила написания артефактов (`proposal.md`, `spec.md`, `design.md`, `tasks.md`) —
  скилл `alxmrz_kit_spec-authoring`. Загружайте перед работой над спекой.

## 4. Layout / wiring

- `src/` — игровой код: `Level.js` (сцена), `Builder.js`, `Wall.js`, `Gate.js`, `Tower.js`,
  `RobotFactory.js`, `Destination.js`, `ObjectFactory.js`, `Point.js`, `libs/PriorityQueue.js`.
- `src/components/` — Vue-обёртка (`App.vue`, `Game.vue`), создаёт `Phaser.Game`.
- `tests/` — Jest-тесты (`tests/unit`) и стабы сцены (`tests/helpers/scene.js`).
- `public/` — HTML-шаблон для `HtmlWebpackPlugin`; сборка кладётся в `dist/`.
- `openspec/` — спеки и изменения (spec-driven workflow).
- Конфиги: `webpack.config.js`, `babel.config.js`, секция `jest` в `package.json`.

## 5. Gotchas

- Jest 27 не транспилирует `node_modules`, а `phaser4-rex-plugins` поставляется ESM —
  без `transformIgnorePatterns: ["node_modules/(?!(phaser4-rex-plugins)/)"]` тесты падают на
  `Cannot use import statement outside a module`.
- `phaser` в Jest мэппится на `node_modules/phaser/dist/phaser.js` (UMD v4).
- В Phaser 4 у `Grid` `outline` переименован в `stroke`, а `cellPadding` по умолчанию `0.5`:
  для сплошной сетки как в v3 нужны `setStrokeStyle(1, 0x000000)` и `setCellPadding(0)`.
- Canvas-рендерер в v4 устарел; конфиг остаётся `Phaser.AUTO` (WebGL там, где доступен).

## Происхождение файлов

Файлы с префиксом `alxmrz_kit_` в `.agents/` ставит `agent-kit`. Правки в них будут
перезаписаны при обновлении; локальные изменения держите вне префиксованных файлов.
