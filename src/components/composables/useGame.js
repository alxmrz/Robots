import { onBeforeUnmount, onMounted, ref, unref } from 'vue';
import Phaser from 'phaser';
import Level from "@app/Level";

/**
 * Runs the Phaser game inside a Vue component and bridges the scene state to
 * reactive refs. The scene owns Phaser objects, the composable only receives
 * plain data, so Vue never proxies game objects.
 *
 * @param {import('vue').Ref<HTMLElement|null>|HTMLElement} containerRef
 */
export default function useGame(containerRef) {
    const playerInfo = ref(null);
    const mouseX = ref(0);
    const mouseY = ref(0);

    let game = null;
    let level = null;

    function handlePlayerChange(info) {
        playerInfo.value = info;
    }

    onMounted(() => {
        level = new Level();
        level.setPlayerChangeHandler(handlePlayerChange);
        game = createGame(unref(containerRef), level);
    });

    onBeforeUnmount(() => {
        if (level) {
            level.setPlayerChangeHandler(null);
        }
        if (game) {
            game.destroy(true);
        }
        game = null;
        level = null;
    });

    function onMouseMove() {
        if (!game || !game.input || !game.input.mousePointer) return;
        mouseX.value = Math.round(game.input.mousePointer.x);
        mouseY.value = Math.round(game.input.mousePointer.y);
    }

    function onPointerLeave() {
        mouseX.value = 0;
        mouseY.value = 0;
    }

    return {
        playerInfo,
        mouseX,
        mouseY,
        onMouseMove,
        onPointerLeave
    };
}

function createGame(parent, scene) {
    return new Phaser.Game({
        type: Phaser.AUTO,
        parent: parent,
        width: 1075,
        height: 625,
        physics: {
            default: 'arcade',
            arcade: {
                fps: 60,
                gravity: { y: 0 }
            }
        },
        backgroundColor: 0xf4a460,
        scene: scene
    });
}
