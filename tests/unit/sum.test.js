import Scene from '../../src/Scene'
import Application from '../../src/Application'

jest.mock('../../src/Scene');

test('adds 1 + 2 to equal 3', () => {
    expect(1+1).toBe(2);
});

test('dddd', () => {
    expect(new Application(new Scene)).toBeInstanceOf(Application);
});