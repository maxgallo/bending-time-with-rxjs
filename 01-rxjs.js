const { of } = require('rxjs');

const observer = {
    next(value) {
        console.log(value);
    }
}

of(1, 2, 3, 4)
    .subscribe(observer);

console.log('subscribe');
