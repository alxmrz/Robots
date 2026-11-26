# AGENTS.md

Файл создан из шаблона `alxmrz/agent-kit`. Дальше он ваш: kit его не перезаписывает.
Заполните разделы под проект; общие правила уже подключены в `instructions[]` файла
`opencode.json`.

## 1. Стек проекта

- JavaScript (ES modules), Phaser 4 (`phaser` `^4.2.1`), Vue 3, webpack 5. Точка входа —
  `src/main.js` (`createApp(App).mount('#app')`).
- Движение билдера по пути — `MoveTo` из `phaser4-rex-plugins` `^4.2.0`.
- SFC собираются `vue-loader` 17 с `@vue/compiler-sfc`; компоненты написаны на Composition
  API (`<script setup>`).
- Источник истины по командам — `package.json` (секции `scripts` и `jest`).

## 2. Команды

- Запуск: `npm start` (раздаёт `dist/`); сначала нужен `npm run build`.
- Сборка: `npm run build`
- Тесты: `npm run tests`
- Один тест: `npx jest tests/unit/Builder.test.js`
- Обёртка: `make init|up|build|tests|tests-unit|tests-coverage` (`Makefile`).

Обновляйте этот раздел, когда меняются команды запуска.

## 3. Правила

- Общие правила написания кода — `.agents/rules/alxmrz_kit_general_rules.md`. Подключены в
  `instructions[]` файла `opencode.json`; здесь они не повторяются.
- Локальные правила проекта — `.agents/rules/project_rules.md` (тоже подключены в
  `instructions[]`). Сюда пишем то, что специфично для этого проекта; файл `agent-kit` не
  перезаписывает.
- Правила написания артефактов (`proposal.md`, `spec.md`, `design.md`, `tasks.md`) —
  скилл `alxmrz_kit_spec-authoring`. Загружайте перед работой над спекой.

## 3.1. Инкапсуляция и тесты

- Клиентский код обращается к объекту только через методы: чтение — геттером
  (`point.getX()`), запись — сеттером или командой. Прямое чтение полей
  (`destination.x`, `wall.point.x`) запрещено; внутри своего класса поля использовать
  можно. Нет подходящего метода — добавь его, а не обходи интерфейс.
- Не проверяй метод через чтение того же состояния, из которого он берёт результат:
  `expect(obj.getPoint()).toBe(obj.point)` — тавтология, такой тест не ловит ошибку в
  геттере. Задавай ожидание независимо: через конструктор или сеттер
  (`new Point(15, 25)` / `point.setX(5)`), а ссылки на объекты прокидывай снаружи и
  сравнивай с этим же внешним экземпляром. Подробнее — `.agents/rules/project_rules.md`.

## 4. Layout / wiring

- `src/` — игровой код: `Level.js` (сцена), `Builder.js`, `Wall.js`, `Gate.js`, `Tower.js`,
  `RobotFactory.js`, `Destination.js`, `ObjectFactory.js`, `Point.js`, `libs/PriorityQueue.js`.
- `src/components/` — Vue-обёртка на Composition API: `App.vue` → `layouts/Main.vue` →
  `Game.vue`; `composables/useGame.js` создаёт `Phaser.Game` после монтирования и
  уничтожает его при размонтировании, отдавая сцене колбэк для данных о выбранном объекте.
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
- Vue 3 в webpack требует feature-flags через `DefinePlugin` (`__VUE_OPTIONS_API__`,
  `__VUE_PROD_DEVTOOLS__`, `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__`); без них сборка
  предупреждает о подставленных значениях по умолчанию.
- Алиаса `vue$ → vue/dist/vue.esm.js` больше нет: в Vue 3 файла не существует, webpack
  берёт `vue.runtime.esm-bundler.js`. Стили SFC идут через `style-loader` (не
  `vue-style-loader`).
- `Phaser.Game` создаётся только в `onMounted`, когда контейнер уже в DOM (`parent`
  принимает сам элемент, а не строку-id); `onBeforeUnmount` вызывает `game.destroy(true)`.
- Точка ветвления в методе — максимум одна (правило проекта): в `Level` ветки кликов и
  движения вынесены в `handlePointerDown`-хелперы, а не лежат в одном методе.

## Происхождение файлов

Файлы с префиксом `alxmrz_kit_` в `.agents/` ставит `agent-kit`. Правки в них будут
перезаписаны при обновлении; локальные изменения держите вне префиксованных файлов.
