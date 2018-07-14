# Map
An implementation of Map in JavaScript for browsers. Supporting methods of Map in ES6.

## Usage

```js
$ npm i @lvchengbin/map --save
```

```js
import Map from '@lvchengbin/map';
const map = new Map( [ [ 'x', 1 ], [ 'y', 2 ] ] );
map.set( {}, 3 );
```
The native `Map` will be used if the client supports native `Map` and if the second argument of `Map` constructor is not false.

If you want to use the library in browsers that loading with `<SCRIPT>` tag, you can git it from [map.js](https://raw.githubusercontent.com/LvChengbin/map/master/dist/map.js), and for browsers do not support ES6, please use [map.bc.js](https://raw.githubusercontent.com/LvChengbin/map/master/dist/map.bc.js).

```html
<script src="./map.bc.js"></script>
<script>
var map = new Map( [ [ 'x', 1 ], [ 'y', 2 ] ] );
console.log( map.size );
</script>
```
