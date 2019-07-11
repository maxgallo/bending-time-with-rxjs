const { of, scheduled, asapScheduler } = require('rxjs');

const observer = {
    next(value) {
        console.log(value);
    },
}

scheduled(of(1, 2, 3, 4), asapScheduler)
  .subscribe(observer);

console.log('subscribe');
