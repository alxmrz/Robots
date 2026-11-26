import Phaser from "phaser";

test("Engine version belongs to the Phaser 4 major branch", function () {
    expect(Phaser.VERSION.startsWith("4.")).toBe(true);
});
