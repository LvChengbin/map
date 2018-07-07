# Map

Polyfill of ES6 Map for old browsers. Tested on IE 9/10.

## Usage

```js
$ npm i @lvchengbin/map --save
```

```js
import Map from '@lvchengbin/map';
const map = new Map( [ [ 'x', 1 ], [ 'y', 2 ] ] );
map.set( {}, 3 );
```
If you want to use the library in browsers that loading with `<SCRIPT>` tag, you can git it from [map.js](https://raw.githubusercontent.com/LvChengbin/map/master/dist/map.js), and for browsers do not support ES6, please use [map.bc.js](https://raw.githubusercontent.com/LvChengbin/map/master/dist/map.bc.js).

```html
<script src="./map.bc.js"></script>
<script>
var map = new JMap( [ [ 'x', 1 ], [ 'y', 2 ] ] );
console.log( map.size );
</script>
```
