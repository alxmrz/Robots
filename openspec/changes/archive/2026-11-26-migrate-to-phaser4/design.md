# Design: переход на Phaser 4

## Context

См. `proposal.md` — Why. Текущее состояние, влияющее на подход:

- `src/Level.js` — единственная сцена (`Phaser.Scene`), в `preload()` создаёт `Grid` через
  `this.add.grid(...).setOrigin(0, 0).setOutlineStyle(0x000000)`, в `create()` — билдер и три
  стены, в `update()` — столкновения и управление стрелками.
- `src/Builder.js` — наследник `Phaser.GameObjects.Rectangle`, подключён к аркадной физике;
  движение по точкам пути делает `MoveTo` из `phaser3-rex-plugins/plugins/moveto`, на событие
  `complete` повешен переход к следующей точке пути.
- `src/Destination.js`, `src/Gate.js`, `src/Tower.js`, `src/Wall.js`, `src/RobotFactory.js` —
  простые `Shape`-объекты (`Arc`/`Rectangle`) + `scene.add.existing`/`physics.add.existing`.
- `src/components/Game.vue` — создаёт `Phaser.Game` с `type: Phaser.AUTO`, аркадной физикой и
  одной сценой; читает `game.input.mousePointer` для отображения координат.
- Тесты — Jest 27 + `jest-canvas-mock`, `phaser` маппится на `dist/phaser.js`, сцена
  подменяется стабами из `tests/helpers/scene.js`.
- Установленные версии: `phaser@3.90.0` (в манифесте `^3.55.2`),
  `phaser3-rex-plugins@1.80.20`.

Факты о Phaser 4, проверенные на 4.2.1 (спайк в отдельной песочнице: 13/13 тестов и
webpack-сборка проходят):

- `Grid#setOutlineStyle` удалён, вместо него `setStrokeStyle`, а `cellPadding` по умолчанию
  `0.5` — визуально сетка получает «зазоры» между ячейками.
- `Geom.Point`, `Struct.Set/Map`, `setTintFill`, `Mesh`, `Plane`, `preFX/postFX`,
  `BitmapMask`, `RenderTexture`, `DynamicTexture`, `Math.PI2` в проекте не используются —
  правок не требуют (проверено grep по `src/` и `tests/`).
- `Phaser.GameObjects.Rectangle`/`Arc`, `this.add.grid/rectangle`, `this.add.existing`,
  `scene.physics.add.existing`, `physics.collide`, `physics.overlapRect`,
  `input.mouse.disableContextMenu`, `pointer.rightButtonDown`, `input.mousePointer` в v4
  сохранены.
- `phaser4-rex-plugins@4.2.0` содержит `plugins/moveto.js` с тем же `MoveTo` (событие
  `complete`, `isRunning`, `moveTo`, `stop`, `setSpeed`); пакет публикует исходники ESM и
  импортирует именованные экспорты из `phaser` (`Utils`, `Math`), поэтому в Jest нужен
  `transformIgnorePatterns` для него.

## Goals / Non-Goals

**Goals:**

- Обновить движок до Phaser 4.x так, чтобы сборка, тесты и рантайм-поведение сцены
  сохранились.
- Зафиксировать проверяемое поведение сцены в спеке `game-runtime` (сетка, объекты, выбор,
  движение, поиск пути, строительные задачи).
- Оставить ровно одну точку миграции для движения билдера — замена пакета rex на v4-версию
  без переписывания логики `MoveTo`.

**Non-Goals:**

- Переписывание `Level.findPath` (алгоритм остаётся прежним), исправление его существующих
  дефектов и рефакторинг `Level`/`Builder`.
- Обновление Vue 2, webpack, Jest до новых мажорных версий.
- Переход на фильтры/новый рендер-пайплайн, освещение, шейдеры: проект не использует FX,
  маски и кастомные пайплайны, поэтому миграция на `RenderNode`/`Filter` не требуется.
- Визуальный редизайн, новые игровые механики, добавление ассетов.

## Decisions

### 1. `phaser` → `^4.2.1`, сборка через ESM-сборку пакета

В `package.json` фиксируем `phaser` как `^4.2.1` (последняя стабильная на момент изменения).
Webpack уже резолвит `module`-поле и берёт `dist/phaser.esm.js`; отдельный алиас не нужен.
Jest-мэппинг `^phaser$ → node_modules/phaser/dist/phaser.js` остаётся, но теперь указывает на
UMD-сборку v4.

Альтернатива: подключать `phaser.esm.js` через CDN/`externals`. Отклонено — ломает сборку
офлайн и тесты.

### 2. `phaser3-rex-plugins` → `phaser4-rex-plugins@^4.2.0`

Плагин используется только как `MoveTo` в `Builder`. В v4-пакете путь импорта —
`phaser4-rex-plugins/plugins/moveto`. Пакет тянет зависимости (`i18next`, `graphology`,
`dagre`, `papaparse` и др.) независимо от того, что используется один модуль; это осознанный
компромисс ради сохранения текущего поведения и минимума правок. При желании позже можно
заменить на `scene.tweens` (вне рамок этой миграции).

Альтернативы (отклонены по решению пользователя): убрать rex и переписать движение на
твины или вручную в `update()`.

### 3. Правка `Grid`: `setStrokeStyle` вместо `setOutlineStyle`

В `Level.preload()` заменяем вызов на `.setStrokeStyle(1, 0x000000)`; при необходимости
`cellPadding = 0` чтобы сохранить сплошную сетку как в v3 (`cellPadding` появился в v4).
Цвет и шаг (25×25) не меняются.

### 4. Тестовая обвязка под v4

- `transformIgnorePatterns`: `node_modules/(?!(phaser4-rex-plugins)/)`.
- `tests/helpers/scene.js`: стаб `add.grid` отдаёт цепочку с `setStrokeStyle` вместо
  `setOutlineStyle`; остальные стабы (`physics.add.existing`, `collide`, `overlapRect`,
  `input.on/mouse/keyboard`) остаются, т.к. API v4 совместим.
- Проверка версии движка: тест/ассерт, что `Phaser.VERSION` начинается с `4.`
  (защита от отката на 3.x).
- Юнит-тесты не меняют ожиданий поведения — они проверяют `Builder`, `Wall`, `Level`,
  `ObjectFactory`, `Point`, `PriorityQueue`.

### 5. Конфиг игры остаётся `Phaser.AUTO`

Canvas-рендерер в v4 объявлен устаревшим, но `AUTO` выбирает WebGL там, где он есть; менять
на принудительный `Phaser.WEBGL` не нужно. `roundPixels` по умолчанию изменился на `false` —
для прямоугольных `Shape`-объектов это не влияет (они не текстурируемые), поведение не
меняем.

## Risks / Trade-offs

- **Визуальный сдвиг сетки** (`cellPadding`, переименование outline→stroke) → задаём
  `cellPadding = 0` и проверяем глазами; в спеке требование только про шаг и наличие
  обводки, поэтому допустимо.
- **Размер бандла** растёт (`phaser.esm.js` v4 ~7 МБ + транзитивные зависимости rex) →
  принимаем для dev-сборки; production-минификация вне рамок.
- **`MoveTo` из нового пакета ведёт себя иначе в деталях тайминга** → спайк с тестами прошёл,
  плюс ручная проверка движения по пути в браузере; при расхождении правим только настройку
  `MoveTo`, не архитектуру.
- **Jest 27 + ESM-исходники rex** → `transformIgnorePatterns` уже проверен в спайке; если
  появится новый ESM-модуль, добавляем его в исключения.
- **Проверка в реальном браузере не автоматизирована** (jsdom не запускает нормально
  игровой цикл Phaser) → ручной smoke-check по чек-листу в `tasks.md`; юнит-тесты
  страхуют API-совместимость.
- **Откат**: изменения изолированы в `package.json`/`package-lock.json` и двух строках кода
  (`Builder`-импорт, `Level`-сетка) плюс тестовая обвязка — откат = revert коммита.

## Migration Plan

1. Обновить зависимости (`phaser@^4.2.1`, `phaser4-rex-plugins@^4.2.0`, удалить
   `phaser3-rex-plugins`), обновить lock-файл.
2. Поправить импорт в `Builder` и `Grid` в `Level`.
3. Обновить Jest-конфиг и стабы сцены; прогнать `npm run tests`.
4. Прогнать `npm run build`, затем ручной smoke-check собранной игры.
5. Обновить `README.md`/`AGENTS.md` (версии и команды) и сверить спеку `game-runtime`.

Откат — revert всех правок; база данных/миграции не затрагиваются.

## Open Questions

Нет.
