import Rx from 'rxjs/Rx';

const observable = Rx.Observable.create(
    proxyObserver => {
      proxyObserver.next(2);
      proxyObserver.next(3);
      proxyObserver.next(4);
      proxyObserver.complete();
    }
    //);
).observeOn(Rx.Scheduler.async);

const finalObserver = {
    next: x => console.log(x),
    error: err => console.error('something wrong occurred: ' + err),
    complete: () => console.log('done'),
};

console.log(1);

observable.subscribe(finalObserver);

console.log(5);
