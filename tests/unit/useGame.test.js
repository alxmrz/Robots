const mockOnMounted = jest.fn();
const mockOnBeforeUnmount = jest.fn();
const mockDestroy = jest.fn();
const mockSetPlayerChangeHandler = jest.fn();

jest.mock('vue', () => {
    const actual = jest.requireActual('vue');
    return {
        ...actual,
        onMounted: (...args) => mockOnMounted(...args),
        onBeforeUnmount: (...args) => mockOnBeforeUnmount(...args)
    };
});

jest.mock('phaser', () => {
    const Game = jest.fn().mockImplementation(function () {
        this.input = { mousePointer: { x: 10.4, y: 20.6 } };
        this.destroy = mockDestroy;
    });
    return {
        __esModule: true,
        default: {
            AUTO: 'AUTO',
            Game: Game
        }
    };
});

jest.mock('@app/Level', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(function () {
        this.setPlayerChangeHandler = mockSetPlayerChangeHandler;
    })
}));

import useGame from '@app/components/composables/useGame';
import Phaser from 'phaser';

function mountedCallback() {
    return mockOnMounted.mock.calls[mockOnMounted.mock.calls.length - 1][0];
}

function unmountedCallback() {
    return mockOnBeforeUnmount.mock.calls[mockOnBeforeUnmount.mock.calls.length - 1][0];
}

beforeEach(function () {
    mockOnMounted.mockClear();
    mockOnBeforeUnmount.mockClear();
    mockDestroy.mockClear();
    mockSetPlayerChangeHandler.mockClear();
});

test("mounted creates a Phaser game and wires the player handler", function () {
    useGame({ current: null });

    mountedCallback()();

    expect(Phaser.Game).toHaveBeenCalledTimes(1);
    expect(Phaser.Game.mock.calls[0][0]).toMatchObject({
        type: 'AUTO',
        width: 1075,
        height: 625,
        scene: expect.any(Object)
    });
    expect(mockSetPlayerChangeHandler).toHaveBeenCalledWith(expect.any(Function));
});

test("player updates are exposed through a reactive ref", function () {
    let game = useGame({ current: null });
    mountedCallback()();
    let handler = mockSetPlayerChangeHandler.mock.calls[0][0];

    handler({ name: 'Builder', x: 1, y: 2 });

    expect(game.playerInfo.value).toStrictEqual({ name: 'Builder', x: 1, y: 2 });
});

test("mouse movement rounds the pointer coordinates", function () {
    let game = useGame({ current: null });
    mountedCallback()();

    game.onMouseMove();

    expect(game.mouseX.value).toBe(10);
    expect(game.mouseY.value).toBe(21);
});

test("mouse movement before the game starts leaves coordinates untouched", function () {
    let game = useGame({ current: null });

    expect(() => game.onMouseMove()).not.toThrow();
    expect(game.mouseX.value).toBe(0);
});

test("mouse movement without a mouse pointer leaves coordinates untouched", function () {
    let game = useGame({ current: null });
    mountedCallback()();
    let created = Phaser.Game.mock.instances[Phaser.Game.mock.instances.length - 1];
    created.input = {};

    game.mouseX.value = 5;
    game.onMouseMove();

    expect(game.mouseX.value).toBe(5);
});

test("mouse movement without an input manager leaves coordinates untouched", function () {
    let game = useGame({ current: null });
    mountedCallback()();
    let created = Phaser.Game.mock.instances[Phaser.Game.mock.instances.length - 1];
    created.input = null;

    game.mouseX.value = 5;
    game.onMouseMove();

    expect(game.mouseX.value).toBe(5);
});

test("pointer leave resets the mouse coordinates", function () {
    let game = useGame({ current: null });
    mountedCallback()();
    game.onMouseMove();

    game.onPointerLeave();

    expect(game.mouseX.value).toBe(0);
    expect(game.mouseY.value).toBe(0);
});

test("unmounting destroys the game and detaches the handler", function () {
    useGame({ current: null });
    mountedCallback()();

    unmountedCallback()();

    expect(mockSetPlayerChangeHandler).toHaveBeenLastCalledWith(null);
    expect(mockDestroy).toHaveBeenCalledWith(true);
});

test("unmounting before mount is a no-op", function () {
    useGame({ current: null });

    expect(() => unmountedCallback()()).not.toThrow();

    expect(mockDestroy).not.toHaveBeenCalled();
    expect(mockSetPlayerChangeHandler).not.toHaveBeenCalled();
});

test("unmounting twice only destroys the game once", function () {
    useGame({ current: null });
    mountedCallback()();

    unmountedCallback()();
    unmountedCallback()();

    expect(mockDestroy).toHaveBeenCalledTimes(1);
});
