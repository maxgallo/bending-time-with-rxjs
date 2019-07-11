const { of, scheduled, asyncScheduler } = require('rxjs');

const observer = {
    next(value) {
        console.log(value);
    },
}

scheduled(of(1, 2, 3, 4), asyncScheduler)
  .subscribe(observer);

console.log('subscribe');
