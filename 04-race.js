const {
    of, merge, scheduled,
    asapScheduler,
    asyncScheduler,
    queueScheduler,
} = require('rxjs');

const observer = {
    next(value) {
        console.log(value);
    },
}

const asapObs = scheduled(of('ASAP'), asapScheduler)
const asyncObs = scheduled(of('ASYNC'), asyncScheduler)
const queueObs = scheduled(of('QUEUE'), queueScheduler)

merge(asapObs, asyncObs, queueObs)
  .subscribe(observer);

console.log('SUBSCRIBE');
