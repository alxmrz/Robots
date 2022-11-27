export default class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    add(elem, priority) {
        this.queue.push({item: elem, priority: priority});
        this.queue.sort(function(a, b) {
            return a.priority < b.priority ? -1 : 1;
        })
    }

    shift() {
        return this.queue.shift().item
    }
}

