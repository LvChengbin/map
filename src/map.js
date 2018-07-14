import isUndefined from '@lvchengbin/is/src/undefined';

function find( haystack, key ) {
    for( let item of haystack ) {
        if( item[ 0 ] === key ) return item;
    }
    return false;
}

class Map {
    constructor( iterable = [] ) {
        if( !( this instanceof Map ) ) {
            throw new TypeError( 'Constructor Map requires \'new\'' );
        }
        const map = iterable || [];

        Object.defineProperty( map, 'size', {
            get() {
                return this.length;
            }
        } );

        map.get = key => {
            const data = find( map, key );
            return data ? data[ 1 ] : undefined;
        };

        map.set = ( key, value ) => {
            const data = find( map, key );
            if( data ) {
                data[ 1 ] = value;
            } else {
                map.push( [ key, value ] );
            }
            return map;
        };

        map.delete = key => {
            for( let i = 0, l = map.length; i < l; i += 1 ) {
                if( map[ i ][ 0 ] === key ) {
                    map.splice( i, 1 );
                    return true;
                }
                
            }
            return false;
        }

        map.clear = () => {
            map.length = 0;
        }

        map.forEach = ( callback, thisArg ) => {
            isUndefined( thisArg ) && ( thisArg = map );
            for( let item of map ) {
                callback.call( thisArg, item[ 1 ], item[ 0 ], map );
            }
        };

        map.has = key => !!find( map, key );

        map.keys = () => {
            const keys = [];
            for( let item of map ) {
                keys.push( item[ 0 ] );
            }
            return keys;
        };

        map.entries = () => map;

        map.values = () => {
            const values = [];
            for( let item of map ) {
                values.push( item[ 1 ] );
            }
            return values;
        };
        return map;
    }
}
export default Map;
