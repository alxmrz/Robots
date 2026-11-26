import Level from "@app/Level";
import Point from "@app/Point";
import Wall from "@app/Wall";
import { withSceneStubs } from "../helpers/scene";

/**
 * Pathfinding is driven by the Arcade physics queries, so these tests wire a
 * tiny AABB implementation into the scene doubles instead of mocking the
 * algorithm's collaborators one call at a time.
 */
test("findPath builds a path that stops at the overlapping target cell", function () {
    let level = createPathLevel();
    let path = level.findPath(new Point(0, 0), new Point(110, 10));

    expect(path.length).toBeGreaterThan(0);
    expect(path[path.length - 1]).toStrictEqual(new Point(110, 10));
    expect(path[0].y).toBe(0);
    expect(path[0].x).toBeGreaterThan(0);
});

test("findPath routes around a wall", function () {
    let level = createPathLevel([new Point(50, 0)]);

    let path = level.findPath(new Point(0, 0), new Point(100, 50));

    expect(path.some((point) => point.x === 50 && point.y === 0)).toBe(false);
    expect(path[path.length - 1]).toStrictEqual(new Point(100, 50));
});

test("findPath ends with the target when the start already overlaps it", function () {
    let level = createPathLevel();

    expect(level.findPath(new Point(0, 0), new Point(10, 10))).toStrictEqual([new Point(10, 10)]);
});

test("findPath skips nodes outside the map", function () {
    let level = createPathLevel();

    let path = level.findPath(new Point(0, 0), new Point(60, 10));

    expect(path.every((point) => point.x >= 0 && point.y >= 0)).toBe(true);
});

test("isOutOfMap rejects negative and oversized coordinates", function () {
    let level = createPathLevel();

    expect(level.isOutOfMap(new Point(-1, 0))).toBe(true);
    expect(level.isOutOfMap(new Point(801, 0))).toBe(true);
    expect(level.isOutOfMap(new Point(0, -1))).toBe(true);
    expect(level.isOutOfMap(new Point(0, 601))).toBe(true);
    expect(level.isOutOfMap(new Point(0, 0))).toBe(false);
});

test("find returns an empty path when the target has no parent", function () {
    let level = createPathLevel();

    expect(level.find(new Map(), new Point(5, 5))).toStrictEqual([]);
});

test("find walks the parents chain", function () {
    let level = createPathLevel();
    let parents = new Map();
    parents.set(JSON.stringify(new Point(5, 5)), new Point(0, 0));

    expect(level.find(parents, new Point(5, 5))).toStrictEqual([new Point(5, 5)]);
});

test("wall helper points match the scene wall size", function () {
    let scene = withSceneStubs(new Level());
    let wall = new Wall(new Point(50, 0), scene);

    expect(wall.width).toBe(25);
    expect(wall.height).toBe(25);
});

function createPathLevel(walls = []) {
    let level = withSceneStubs(new Level());
    let wallRects = walls.map(toRect);

    level.canvas = level.sys.game.canvas;
    level.add.rectangle = function (x, y, width, height) {
        return {
            x: x,
            y: y,
            width: width,
            height: height,
            destroy: function () {
                this.destroyed = true;
            }
        };
    };
    level.physics.add.existing = function () {};
    level.physics.collide = function (first, second) {
        return overlaps(first, second);
    };
    level.physics.overlapRect = function (x, y, width, height) {
        return wallRects.filter((rect) => overlaps({ x, y, width, height }, rect));
    };

    return level;
}

function toRect(point) {
    return { x: point.x, y: point.y, width: 25, height: 25 };
}

/**
 * Phaser rectangles are positioned by their center, so the double mirrors that
 * convention instead of treating `x`/`y` as a top-left corner.
 */
function overlaps(first, second) {
    return Math.abs(first.x - second.x) * 2 < first.width + second.width
        && Math.abs(first.y - second.y) * 2 < first.height + second.height;
}
