# Bending Time with RxJS
### __*Schedulers*__ & __*Testing*__


---

# [fit] Schedulers

Every time you use Rx, you're using a __**Scheduler**__. 

If you don't set one, you're using a _Default Scheduler_


> A Scheduler controls when a subscription starts and when notifications are published

---
# [fit] A Scheduler is 


- Data Structures _How To store_
- Execution Context _Where & When to execute_
- Virtual Clock

---

```javascript
const observable = Rx.Observable.create(
    proxyObserver => {
      proxyObserver.next(2);
      proxyObserver.next(3);
      proxyObserver.next(4);
      proxyObserver.complete();
    }
);

const finalObserver = {
    next: x => console.log(x),
    error: err => console.error(':( ' + err),
    complete: () => console.log('done'),
};

console.log(1);

observable.subscribe(finalObserver);

console.log(5);
```
# _No Scheduler:_ What's the output?

---

```javascript
const observable = Rx.Observable.create(
    proxyObserver => {
      proxyObserver.next(2);
      proxyObserver.next(3);
      proxyObserver.next(4);
      proxyObserver.complete();
    }
);

const finalObserver = {
    next: x => console.log(x),
    error: err => console.error('something wrong occurred: ' + err),
    complete: () => console.log('done'),
};

console.log(1);

observable.subscribe(finalObserver);

console.log(5);
```
# __**Output:**__ 1, 2, 3, 4, done, 5

---

```javascript, [.highlight: 8]
const observable = Rx.Observable.create(
    proxyObserver => {
      proxyObserver.next(2);
      proxyObserver.next(3);
      proxyObserver.next(4);
      proxyObserver.complete();
    }
).observeOn(Rx.Scheduler.async);


const finalObserver = {
    next: x => console.log(x),
    error: err => console.error('something wrong occurred: ' + err),
    complete: () => console.log('done'),
};

console.log(1);

observable.subscribe(finalObserver);

console.log(5);
```
# _With Scheduler:_What's the output?
---

```javascript, [.highlight: 8]
const observable = Rx.Observable.create(
    proxyObserver => {
      proxyObserver.next(2);
      proxyObserver.next(3);
      proxyObserver.next(4);
      proxyObserver.complete();
    }
).observeOn(Rx.Scheduler.async);


const finalObserver = {
    next: x => console.log(x),
    error: err => console.error('something wrong occurred: ' + err),
    complete: () => console.log('done'),
};

console.log(1);

observable.subscribe(finalObserver);

console.log(5);
```
# __**Output:**__ 1, 5, 2, 3, 4, done

---

# Scheduler Types


| _Type_ | _Execution_ | _Under the hood_ |
| --- | --- | --- |
| queue | Sync | `scheduler.schedule(task, delay)`|
| asap | Async (micro) | `Promise.resolve().then(() => task)` |
| async | Async (macro) | `id = setInterval(task, delay)` |
| animationFrame	 | Async | `id = requestAnimationFrame(task)` |

---

# What about testing?