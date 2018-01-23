import test from 'ava';
import Rx from 'rxjs/Rx';

function getCountdownObservable(
    player$,
    interval = 1000,
    scheduler
) {
    const maxTimeIsAvailable = event => event.maxTime && event.maxTime > 0;
    const getTimeToEnd = event => Math.floor(event.maxTime - event.currentTime);

    return player$
        .sampleTime(interval, scheduler)
        .filter(maxTimeIsAvailable)
        .map(getTimeToEnd);
}

function emitsArrayValuesAtInterval(
    arrayToEmit,
    interval,
    scheduler
) {
    return Rx.Observable
        .zip(
            Rx.Observable.from(arrayToEmit),
            Rx.Observable.timer(0, interval, scheduler),
            item => item
        );
}

test('03 sample time', t => {
    const values = [
        { currentTime: 0, maxTime: null},
        { currentTime: 0, maxTime: 10},
        { currentTime: 1, maxTime: 10},
        { currentTime: 2, maxTime: 10},
    ];

    const scheduler = new Rx.VirtualTimeScheduler();

    const mockPlayer$ = emitsArrayValuesAtInterval(
        values,
        1000,
        scheduler
    );

    const countdown$ = getCountdownObservable(
        mockPlayer$,
        1000,
        scheduler
    );

    const expected = [10, 9];

    countdown$
        .bufferTime(10000, scheduler)
        .subscribe(
            x => t.deepEqual(expected, x)
        );

    scheduler.flush();
});
