# Proposal: переход на Phaser 4

## Why

Проект работает на Phaser 3.90.0 (в `package.json` закреплён `^3.55.2`), а актуальная
мажорная ветка — Phaser 4 (4.2.1). Phaser 3 больше не развивается, а обновление до 4 даёт
новый WebGL-рендерер, актуальный API и совместимость с текущими версиями плагинов. Сейчас
в коде нет ничего, что требовало бы переписывания под старый рендер, поэтому миграция
дешевле всего делается именно сейчас — до появления нового геймплея.

## What Changes

- Обновление зависимости `phaser` с 3.x до `^4.2.1` (**BREAKING** для API рендеринга,
  но не для игрового поведения).
- Замена плагина `phaser3-rex-plugins` на `phaser4-rex-plugins@^4.2.0`; используется только
  `MoveTo`, импорт меняется на `phaser4-rex-plugins/plugins/moveto`.
- Приведение кода к API Phaser 4:
  - `Grid`: `setOutlineStyle()` заменяется на `setStrokeStyle()` (в v4 outline переименован
    в stroke).
  - Явное подключение WebGL-совместимой конфигурации игры (`type: Phaser.AUTO`), проверка
    отсутствия использований удалённого API (`Geom.Point`, `Struct.Set/Map`, `setTintFill`,
    `Mesh`/`Plane`, `preFX`/`postFX`, `BitmapMask`, `RenderTexture`/`DynamicTexture`).
- Обновление тестовой обвязки: Jest-мэппинг `phaser` на `dist/phaser.js` v4 и
  `transformIgnorePatterns` под `phaser4-rex-plugins`; стабы сцены в `tests/helpers/scene.js`
  приводятся к API v4 (`setStrokeStyle`, `overlapRect`, `pointer.rightButtonDown`).
- Обновление документации (`README.md`, `AGENTS.md`): версия движка, команды сборки/тестов.

Игровое поведение сохраняется: сетка уровня, билдер, стены, ворота, башни, фабрика роботов,
поиск пути по клику правой кнопкой и перемещение курсором работают как раньше.

## Capabilities

### New Capabilities

- `game-runtime`: требование к среде исполнения игры — запуск на Phaser 4 с аркадной
  физикой, отрисовка сцены уровня и её объектов, движение билдера по найденному пути и
  базовое управление (выбор билдера, движение стрелками, клик правой кнопкой). Капабилити
  фиксирует поведение, которое миграция обязана сохранить, и остаётся точкой расширения для
  будущих требований к геймплею.

### Modified Capabilities

Нет: `openspec/specs/` пока пуст, ранее поведение не было зафиксировано в спеках.

## Impact

- `package.json` / `package-lock.json`: версия `phaser`, замена `phaser3-rex-plugins` на
  `phaser4-rex-plugins`, настройки Jest.
- `src/Builder.js`: импорт `MoveTo` из нового пакета.
- `src/Level.js`: `setStrokeStyle()` вместо `setOutlineStyle()`.
- `src/*.js` (`Destination`, `Gate`, `Tower`, `Wall`, `RobotFactory`): проверка и, при
  необходимости, минимальные правки под API v4.
- `src/components/Game.vue`: конфиг `Phaser.Game`, доступ к указателю мыши.
- `tests/helpers/scene.js` и unit-тесты: обвязка под v4.
- `webpack.config.js`, `babel.config.js`: правки только если потребуются новым форматом
  пакетов (ESM `phaser.esm.js` уже используется).
- Риски: Canvas-рендерер в v4 устарел (на нём меняется вид сетки), плагин rex v4 —
  отдельный пакет с иной структурой путей; поведение `MoveTo.complete` требует проверки.
