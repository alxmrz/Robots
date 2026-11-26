# Design: переход на Vue 3

## Context

См. `proposal.md` — Why. Текущее состояние, влияющее на подход:

- `src/main.js` — `new Vue({ render: h => h(App) }).$mount('#app')`.
- `src/components/App.vue` → `layouts/Main.vue` → `Game.vue`: три компонента Options API без
  пропсов, событий, Vuex и Router; общее состояние между ними не передаётся.
- `Game.vue` создаёт `Phaser.Game` в хуке `created()`, то есть до появления
  `#gameContainer` в документе, и читает `game.input.mousePointer` в обработчике
  `@mousemove`. Панель «Информация по объекту» — `computed`, зависящий от `this.level`, а
  `Level` — обычный класс Phaser, поэтому Vue 2 не видит изменений `level.player`; вдобавок
  `JSON.stringify` игрового объекта с циклическими ссылками небезопасен.
- `src/Level.js`: `create()` вешает сценарный `pointerdown` для правого клика; `addBuilder()`
  вешает ещё два сценарных обработчика — выделение и снятие выбора. В Phaser 4 события
  GameObject обрабатываются раньше сценарных, поэтому текущий порядок «выбрать → сразу
  снять выбор» делает выбор фактически нерабочим; правая кнопка при этом тоже снимает
  выбор.
- `webpack.config.js`: `VueLoaderPlugin` из `vue-loader` 15, алиас
  `vue$ → vue/dist/vue.esm.js`, CSS через `vue-style-loader` + `css-loader`.
- Тесты: Jest 27 + jsdom, `moduleFileExtensions: ["js", "jsx"]`, `.vue` не участвуют в
  тестах, Phaser-объекты проверяются через стабы сцены.

## Goals / Non-Goals

**Goals:**

- Перевести интерфейс на Vue 3 (Composition API), не меняя разметку и визуальное поведение
  панелей.
- Сделать панель сведений о выбранном объекте работающей: односторонний поток данных
  «сцена → интерфейс» без превращения Phaser-объектов в реактивные.
- Исправить порядок обработки кликов: левая кнопка выбирает/снимает выбор, правая — только
  задаёт цель движения.

**Non-Goals:**

- Замена webpack на Vite, обновление Jest, TypeScript, Pinia/Vuex, Router.
- Переписывание игровой логики, алгоритма поиска пути и строительных задач.
- Компонентные тесты (`@vue/test-utils`) и e2e — в проекте их нет, миграция их не вводит.
- Визуальный редизайн: разметка `Game.vue` сохраняется, меняются только реализация
  сценария компонента и привязки.

## Decisions

### 1. `vue` → `^3.5`, `vue-loader` → `^17` + `@vue/compiler-sfc`

`vue-loader` 17 требует `@vue/compiler-sfc` той же минорной ветки, что и `vue`;
`vue-template-compiler` удаляется (он существует только для Vue 2). `VueLoaderPlugin`
остаётся, но импортируется из `vue-loader` v17.

Алиас `vue$ → vue/dist/vue.esm.js` удаляется: файла больше нет, а Vue 3 по умолчанию
подключает `vue.runtime.esm-bundler.js`. Runtime-сборки достаточно — шаблоны компилирует
`vue-loader` на этапе сборки, рантайм-компилятор не нужен.

Альтернатива: `vue/dist/vue.esm-bundler.js` с компилятором в рантайме. Отклонено — лишние
~40 КБ и предупреждения о `new Function` в CSP.

### 2. CSS: `style-loader` вместо `vue-style-loader`

`vue-loader` 17 не подтягивает `vue-style-loader` (он из экосистемы Vue 2/Loader 15).
Правило для `.css` становится `style-loader` + `css-loader`; `vue-style-loader` убирается
из дерева зависимостей. Функционально это тот же dev-инжект стилей в `<style>`.

### 3. Feature-flags Vue 3 через `DefinePlugin`

`vue.runtime.esm-bundler.js` ожидает compile-time константы. В `webpack.config.js`
добавляется `DefinePlugin` с `__VUE_OPTIONS_API__: false` (все компоненты переходят на
Composition API, Options API не нужен), `__VUE_PROD_DEVTOOLS__: false` (devtools нужны только
в разработке) и `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false` (SSR в проекте нет). Без
этих констант webpack печатает предупреждение и подставляет значения по умолчанию.

### 4. Composition API и `<script setup>` в трёх компонентах

`App.vue` и `Main.vue` — тонкие обёртки: `<script setup>` с одним импортом. `Game.vue`
содержит разметку панелей и монтирует игровую область.

Сценарий игры выносится в `src/components/composables/useGame.js`:

- принимает `containerRef` и возвращает `playerInfo`, `mouseX`, `mouseY`, `onMouseMove`,
  `onPointerLeave`;
- в `onMounted` читает `containerRef.value` и создаёт `Phaser.Game({ parent: element,
  scene: level })`;
- в `onBeforeUnmount` вызывает `game.destroy(true)` и снимает обработчик сцены.

Причина выноса: `Game.vue` остаётся декларативным, а жизненный цикл движка и мост «сцена →
Vue» тестируются и меняются в одном месте. Альтернатива — держать всё в `Game.vue`;
отклонена, потому что публичный метод компонента смешивает две ответственности и хуже
читается.

### 5. Мост «сцена → интерфейс»: плоские данные + колбэк

`Level` получает:

- `setPlayerChangeHandler(handler)` — регистрация единственного подписчика;
- `getPlayerInfo()` — `null` либо `{ name, x, y }`;
- `selectPlayer(builder)` / `deselectPlayer()` — изменение выбора, визуальное выделение и
  уведомление подписчика;
- `notifyPlayerChange()` — вызывается из `selectPlayer`/`deselectPlayer`, а также из
  `update()`, когда координаты выбранного объекта изменились с прошлого кадра.

`Builder` получает `getInfo()`, возвращающий `{ name: 'Builder', x, y }` c округлёнными
координатами. `GameObject` в Vue не попадает: `playerInfo` — `ref(null)` с обычным
объектом, поэтому Vue не пытается проксировать Phaser и не ломает его внутренние ссылки.

Уведомление из `update()` с дедупликацией по последнему отправленному значению — вместо
поллинга в UI: при простое сцена ничего не пишет, при движении стрелками панель обновляется
каждый кадр, а Vue батчит обновление DOM.

Альтернатива: `shallowReactive(level)` или `markRaw` + `computed`. Отклонено: реактивность
на классе Phaser непредсказуема (внутренние мутации в `update()` создают лишние триггеры), а
`JSON.stringify` циклических объектов падает.

### 6. Один сценарный обработчик кликов в `Level`

Вместо трёх `pointerdown`, разбросанных по `create()` и `addBuilder()`, остаётся один
сценарный обработчик `handlePointerDown(pointer)`:

1. Если нажата правая кнопка и есть выбранный объект — сброс маркера цели, поиск пути,
   `followPath`. Выбор не меняется.
2. Если нажата левая кнопка и указатель вне прямоугольника выбранного объекта —
   `deselectPlayer()`.

Выбор конкретного билдера остаётся на его собственном `pointerdown` и вызывает
`selectPlayer(builder)`. Поскольку GameObject-обработчики выполняются раньше сценарных,
выбор не будет снят тем же кликом. Проверка «указатель внутри выбранного объекта»
реализуется в приватном `isPointerOverPlayer(pointer)`.

Альтернатива: полагаться на `pointer.event.stopPropagation()` или сценарный флаг
«обработано объектом». Отклонено: порядок событий Phaser не документирован как контракт, а
геометрическая проверка использует только публичные `getBounds()`/`contains()`.

### 7. Границы тестирования

Unit-тестами покрываются изменения в чистых модулях: `Builder.getInfo()`, вызовы
`selectPlayer`/`deselectPlayer`/колбэка в `Level` (через стабы сцены, без запуска
`Phaser.Game`). `.vue` и `useGame.js` остаются без тестов: jsdom не прокручивает игровой
цикл Phaser, поэтому компонентные тесты давали бы ложную уверенность. Ручной smoke-check —
в `tasks.md`.

## Risks / Trade-offs

- **Порядок обработчиков кликов меняется** → покрываем тестом на `selectPlayer`/`deselect` и
  ручной проверкой «клик по билдеру, затем правая кнопка».
- **`useGame` зависит от появления контейнера в DOM** → создание игры переносится в
  `onMounted`, поэтому элемент уже отрендерен; канвас создаётся с `parent: element`.
- **Vue 3 в Jest резолвится в CJS-сборку** → `src/components` не импортируются тестами, так
  что `moduleNameMapper` и `transformIgnorePatterns` не меняются; если позже появятся
  тесты на `useGame`, понадобится `moduleNameMapper` для `vue` на `vue/dist/vue.cjs.js`.
- **Стили из SFC** после смены лоадера инжектятся `style-loader` — визуально разницы нет, но
  нужно проверить, что порядок стилей не конфликтует с inline-стилями `Game.vue`.
- **Уведомления из `update()`** при движении стрелками пишут в reactivity каждый кадр → при
  равных координатах уведомление подавляется, сравнение — два числа.
- **Откат**: правки сосредоточены в `package.json`, `webpack.config.js`, трёх `.vue`,
  `main.js`, `Level.js`, `Builder.js` и тестах — revert коммита возвращает Vue 2.

## Migration Plan

1. Обновить зависимости (`vue@^3.5`, `vue-loader@^17`, `@vue/compiler-sfc`, `style-loader`,
   удалить `vue-template-compiler` и `vue-style-loader`), обновить lock-файл.
2. Перевести `main.js` на `createApp`.
3. Переписать `App.vue`, `Main.vue` на `<script setup>`; `Game.vue` — на `useGame` с
   `onMounted`/`onBeforeUnmount`.
4. Добавить мост в `Level` и `getInfo()` в `Builder`; свести клики в один обработчик.
5. Поправить `webpack.config.js` (лоадеры, feature-flags, алиас).
6. Прогнать `npm run tests`, `npm run build`, smoke-check в браузере по чек-листу из
   `tasks.md`; обновить `README.md`/`AGENTS.md`.

## Open Questions

Нет.
