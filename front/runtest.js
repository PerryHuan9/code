// timeout_vs_immediate.js
// setTimeout(() => {
//     console.log('timeout');
// }, 5);

// setImmediate(() => {
//     console.log('immediate');
// });


// process.nextTick(() => {
//     console.log('nextTick')
// })


const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
    EventEmitter.call(this);
    setImmediate(() => {
        this.emit('event');
    })
    // setTimeout(() => {
    //     this.emit('event');
    // })
    // process.nextTick(() => {
    //     this.emit('event');
    // });
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
    console.log('an event occurred!');
});