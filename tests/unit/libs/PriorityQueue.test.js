import PriorityQueue from "@app/libs/PriorityQueue"
test("adding new element", function () {
    let queue = new PriorityQueue();
    queue.add("first", 2)
    queue.add("second", 1)
    expect(queue.shift()).toBe("second")
});

test("adding new element with the same priority will not break old order", function () {
    let queue = new PriorityQueue();
    queue.add("first", 1)
    queue.add("second", 2)
    queue.add("third", 2)
    expect(queue.shift()).toBe("first")
    expect(queue.shift()).toBe("second")
});