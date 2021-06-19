class EventBus {
    constructor() {
        this.eventMap = new Map();
    }

    on(name, callback) {
        if (this.eventMap.has(name)) {
            this.eventMap.get(name).add(callback)
        } else {
            this.eventMap.set(name, new Set([callback]))
        }
    }

    emit(name, ...args) {
        const callbackSet = this.eventMap.get(name);
        if (callbackSet) {
            for (const callback of callbackSet) {
                callback(...args);
            }
        }
    }

    off(name, callback) {
        const callbackSet = this.eventMap.get(name);
        if (!callbackSet) return false;
        if (callback) {
            callbackSet.delete(callback)
        } else {
            this.eventMap.delete(name)
        }
    }

    once(name, callback) {
        const handle = (...args) => {
            callback(...args);
            this.off(name, handle)
        }
        this.on(name, handle);
    }
}

module.exports = EventBus;