const { interval } = require('rxjs');
const { take } = require('rxjs/operators');
const { VirtualTimeScheduler } = require('rxjs');

const scheduler = new VirtualTimeScheduler();

const observer = {
    next(value) {
        console.log(value);
    }
}

interval(1000, scheduler)
    .pipe(take(3600))
    .subscribe(observer);

scheduler.flush();
