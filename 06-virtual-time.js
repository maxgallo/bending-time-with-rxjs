const {
    interval,
    VirtualTimeScheduler
} = require('rxjs');
const { take } = require('rxjs/operators');

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

