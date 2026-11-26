# Tasks

## 1. Зависимости

- [x] 1.1 Заменить в `package.json` `phaser` на `^4.2.1`, удалить `phaser3-rex-plugins`, добавить `phaser4-rex-plugins: ^4.2.0`; обновить `package-lock.json` (`npm install`) и проверить, что `node -e "console.log(require('phaser/package.json').version)"` печатает версию 4.x, а `npm ls phaser3-rex-plugins` не находит пакет.

## 2. Код игры

- [x] 2.1 Перевести импорт в `src/Builder.js` на `phaser4-rex-plugins/plugins/moveto`, сохранив настройки `MoveTo` (`speed: 200`, `rotateToTarget: false`) и обработчик `complete`; проверить, что `npm run build` собирает бандл без ошибок резолва.
- [x] 2.2 Заменить в `src/Level.js` вызов `setOutlineStyle(0x000000)` у сетки на `setStrokeStyle(1, 0x000000)` и выставить `cellPadding = 0`, чтобы сетка осталась сплошной как в v3; проверить сборку и отсутствие обращений к удалённому API (`grep -rn "setOutlineStyle\|phaser3-rex\|Geom.Point\|Struct\.\|setTintFill\|BitmapMask" src` не даёт совпадений).
- [x] 2.3 Проверить остальные игровые объекты (`Destination`, `Gate`, `Tower`, `Wall`, `RobotFactory`) и `src/components/Game.vue` на совместимость с API v4; при необходимости внести минимальные правки так, чтобы объектовые конструкторы и доступ к указателю (`game.input.mousePointer`) работали без изменений поведения.

## 3. Тесты

- [x] 3.1 Обновить Jest-конфиг в `package.json`: `transformIgnorePatterns` на `node_modules/(?!(phaser4-rex-plugins)/)`, оставить мэппинг `^phaser$` на `node_modules/phaser/dist/phaser.js`; проверить `npm run tests` — все существующие тесты проходят.
- [x] 3.2 Обновить `tests/helpers/scene.js`: стаб сетки предоставляет `setStrokeStyle` вместо `setOutlineStyle`; добавить в тот же helper (или отдельный тест) ассерт `Phaser.VERSION` начинается с `4.` и убедиться, что `npm run tests` зелёный.
- [x] 3.3 Прогнать `npx jest` с `--coverage` или без и убедиться, что тесты `Builder`, `Level`, `ObjectFactory`, `Wall`, `Point`, `PriorityQueue` покрывают сохранённое поведение (инструкции билдера, состав объектов уровня, точку билдера, три стены) и не требуют правки ожиданий.

## 4. Документация

- [x] 4.1 Обновить `README.md` и `AGENTS.md`: указать Phaser 4 как стек, актуальные команды `npm run build` / `npm run tests` и версию `phaser4-rex-plugins`; проверить, что команды из README выполняются в проекте (`npm run build`, `npm run tests`).

## 5. Интеграционная проверка

- [x] 5.1 Собрать игру (`npm run build`) и вручную проверить в браузере (`npm start`): сетка уровня, билдер и три стены отрисованы, выбор билдера кликом подсвечивает его, стрелки двигают выбранный объект, клик правой кнопкой строит путь и билдер доезжает до цели, столкновение со стеной останавливает движение.
- [x] 5.2 Сверить ручной прогон с требованиями спеки `game-runtime` (запуск, отрисовка, выбор, движение, поиск пути, строительные задачи) и зафиксировать расхождения; при расхождениях вернуться к задаче соответствующей группы.

## Workflow follow-up

- Заархивировать изменение после прохождения ревью и проверок.
