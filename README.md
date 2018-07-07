# Map

Polyfill of ES6 Map for old browsers. Tested on IE 9/10. The native Map class will be used if the browser supports native Map.

## Usage

```js
$ npm i @lvchengbin/map --save
```

```js
import Map from '@lvchengbin/map';

const map = new Map( [ [ 'x', 1 ], [ 'y', 2 ] ] );
map.set( {}, 3 );
```
