const { interval } = require('rxjs');
const { take } = require('rxjs/operators');

const observer = {
    next(value) {
        console.log(value);
    }
}

interval(1000)
    .pipe(take(3600))
    .subscribe(observer);
