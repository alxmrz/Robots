import Phaser from "phaser";

/**
 * Minimal Phaser scene doubles used by unit tests.
 *
 * Phaser game objects expect a scene with `sys`, `add`, `physics` and
 * `input` services. Real Phaser scenes only receive them from the scene
 * manager, so tests have to provide them explicitly.
 */
function sceneStubs() {
    return {
        sys: {
            queueDepthSort: function () {},
            input: {
                enable: function () {}
            },
            events: new Phaser.Events.EventEmitter(),
            game: {
                canvas: {
                    clientWidth: 800,
                    clientHeight: 600
                }
            }
        },
        add: {
            existing: function () {},
            grid: function () {
                return {
                    setOrigin: function () {
                        return this;
                    },
                    setStrokeStyle: function () {
                        return this;
                    },
                    setCellPadding: function () {
                        return this;
                    }
                };
            },
            rectangle: function () {
                return { destroy: function () {} };
            }
        },
        physics: {
            add: {
                existing: function (gameObject) {
                    gameObject.body = {
                        setImmovable: function () {},
                        setSize: function () {},
                        position: { x: gameObject.x, y: gameObject.y }
                    };
                }
            },
            collide: function () {
                return false;
            },
            overlapRect: function () {
                return [];
            }
        },
        input: {
            on: function () {},
            mouse: {
                disableContextMenu: function () {}
            },
            keyboard: {
                createCursorKeys: function () {
                    return {};
                }
            }
        }
    };
}

export function createScene(overrides = {}) {
    return Object.assign(sceneStubs(), overrides);
}

export function withSceneStubs(scene) {
    return Object.assign(scene, sceneStubs());
}

export default createScene;
