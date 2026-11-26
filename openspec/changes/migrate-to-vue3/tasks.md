# Tasks

## 1. Зависимости и сборка

- [x] 1.1 Заменить в `package.json` `vue` на `^3.5`, `vue-loader` на `^17`, добавить
  `@vue/compiler-sfc` и `style-loader`, удалить `vue-template-compiler` и
  `vue-style-loader`; обновить lock-файл. Проверка: `npm ls vue vue-loader @vue/compiler-sfc`
  показывает Vue 3.x и loader 17 без unmet peer, `npm ls vue-template-compiler` пуст.
- [x] 1.2 Обновить `webpack.config.js`: правило `.vue` через `vue-loader` 17, правило `.css`
  через `style-loader` + `css-loader`, `VueLoaderPlugin`, `DefinePlugin` с
  `__VUE_OPTIONS_API__: false`, `__VUE_PROD_DEVTOOLS__: false`,
  `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false`, удалить алиас `vue$`. Проверка:
  `npm run build` собирается без ошибок и без предупреждений Vue о feature-flags.

## 2. Точка входа и компоненты

- [x] 2.1 Перевести `src/main.js` на `createApp(App).mount('#app')` из `vue`; удалить
  `new Vue`. Проверка: `grep -n "new Vue" src/main.js` пуст, `npm run build` находит
  `createApp`.
- [x] 2.2 Переписать `src/components/App.vue` и `src/components/layouts/Main.vue` на
  `<script setup>` с теми же вложенными компонентами. Проверка: разметка компонентов не
  изменилась, `npm run build` собирает оба SFC.
- [x] 2.3 Добавить `src/components/composables/useGame.js`: `onMounted` создаёт
  `Phaser.Game` с `parent: containerRef.value`, `onBeforeUnmount` вызывает
  `game.destroy(true)` и снимает подписчика сцены; экспортировать `playerInfo`, `mouseX`,
  `mouseY`, `onMouseMove`, `onPointerLeave`. Проверка: файл импортируется сборкой без
  ошибок, `game.destroy(true)` вызывается из `onBeforeUnmount` (визуальная проверка кода).
- [x] 2.4 Переписать `src/components/Game.vue` на `useGame` + `<script setup>`, сохранив
  разметку: контейнер получает `ref`, `@mousemove` вызывает `onMouseMove`, `@mouseleave` —
  `onPointerLeave`, панель выводит `playerInfo` (имя и координаты) либо «Объект не выбран».
  Проверка: `npm run build` без ошибок, в разметке нет `this.` и `computed`.

## 3. Мост «сцена → интерфейс» и клики

- [x] 3.1 Добавить в `src/Builder.js` `getInfo()`, возвращающий
  `{ name: 'Builder', x, y }` с округлёнными координатами. Проверка: новый тест
  `tests/unit/Builder.test.js` проверяет поля и округление.
- [x] 3.2 Добавить в `src/Level.js` `setPlayerChangeHandler`, `getPlayerInfo`,
  `selectPlayer`, `deselectPlayer`, `notifyPlayerChange`; `notifyPlayerChange` не
  отправляет подписчику повторяющиеся данные. Проверка: тесты
  `tests/unit/Level.test.js` проверяют уведомление при выборе, снятии выбора и отсутствие
  повторного уведомления при неизменных данных.
- [x] 3.3 Вызывать `notifyPlayerChange()` из `update()`, когда координаты выбранного
  объекта изменились, и очищать подписчика/состояние при уничтожении сцены. Проверка: тест
  на `Level` эмулирует `update()` и проверяет уведомление только при изменении координат.
- [x] 3.4 Свести обработку кликов в `Level` к одному сценарному `handlePointerDown`:
  правая кнопка задаёт цель движения и не меняет выбор, левая кнопка вне выбранного
  объекта снимает выбор; `isPointerOverPlayer(pointer)` — приватный метод. Выбор билдера
  остаётся в его `pointerdown` и вызывает `selectPlayer`. Проверка: тесты на
  `handlePointerDown` покрывают правый клик с сохранением выбора и левый клик по пустому
  месту.
- [x] 3.5 Прогнать `npm run tests` целиком — все наборы должны проходить, уровень
  цикломатической сложности новых методов не выше 2 (ветки вынесены в приватные методы).

## 4. Документация

- [x] 4.1 Обновить `README.md`: Vue 3 в разделе стека, состав сборки. Проверка: в README нет
  упоминаний Vue 2 и `vue-template-compiler`.
- [x] 4.2 Обновить `AGENTS.md`: Vue 3, `vue-loader` 17, `@vue/compiler-sfc`,
  `style-loader`; в Gotchas — удалённый алиас `vue$`, feature-flags Vue и создание
  `Phaser.Game` только после монтирования. Проверка: разделы «Стек», «Layout / wiring» и
  «Gotchas» соответствуют фактическим файлам.

## 5. Интеграционная проверка

- [x] 5.1 `npm run build` и `npm start`, открыть страницу: канвас 1075×625 внутри
  `#gameContainer`, в консоли нет ошибок и предупреждений Vue.
- [x] 5.2 Smoke-check в браузере: клик левой кнопкой по билдеру выделяет его и заполняет
  панель; стрелки двигают билдера и обновляют координаты в панели; правая кнопка строит
  путь и не снимает выбор; клик по пустому месту сбрасывает панель; координаты мыши
  обновляются.
- [x] 5.3 Проверить освобождение ресурсов: размонтировать игровую область (например,
  временно через `v-if` в `Main.vue`) и убедиться, что канвас исчезает и игровой цикл
  останавливается; вернуть исходную разметку.

## Workflow follow-up

- Заархивировать изменение после проверки и обновления основных спек.
