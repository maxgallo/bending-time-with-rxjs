import test from 'ava';
import Rx from 'rxjs/Rx';

function getIsNotNullAssetId(player$) {
    const isNotNull = a => a !== null;

    return player$
        .pluck('assetId')
        .filter(isNotNull)
        .distinctUntilChanged();
}

test('pluck', t => {
    const mockPlayer$ = Rx.Observable.of(
        { assetId: 1},
        { assetId: 2},
        { assetId: 3},
        { assetId: 3},
        { assetId: 4},
    );

    const notNullAssetId$ = getIsNotNullAssetId(mockPlayer$);

    const expected = [1, 2, 3, 4];

    return notNullAssetId$
        .bufferCount(100)
        .map(
            x => t.deepEqual(expected, x)
        );
});
