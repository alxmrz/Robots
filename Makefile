NPM := npm
JEST := npx jest

.PHONY: init up build tests tests-unit tests-coverage

## init: установить зависимости, собрать проект, прогнать тесты и запустить
init: install build tests up

## install: установить зависимости
install:
	$(NPM) install

## up: запустить проект (раздаёт dist/)
up:
	$(NPM) start

## build: собрать проект в dist/
build:
	$(NPM) run build

## tests: запустить все тесты
tests:
	$(NPM) run tests

## tests-unit: запустить только модульные тесты
tests-unit:
	$(JEST) tests/unit

## tests-coverage: запустить тесты с отчётом о покрытии
tests-coverage:
	$(JEST) --coverage
