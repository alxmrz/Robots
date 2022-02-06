import Point from "@app/Point";

test("Check setting point x and y coords", function () {
    let point = createPoint(1, 2);

    expect(point.getX()).toBe( 1);
    expect(point.getY()).toBe( 2);
});

test("Check changing x value", function () {
    let point = createPoint();

    point.setX(5);

    expect(point.getX()).toBe( 5);
});

test("Check changing y value", function () {
  let point = createPoint();

  point.setY(55);

  expect(point.getY()).toBe( 55);
});

/**
 * @param {int} x
 * @param {int} y
 *
 * @returns {Point}
 */
function createPoint(x = 10, y = 20) {
  return new Point(x, y);
}