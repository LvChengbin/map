(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Map = factory());
}(this, (function () { 'use strict';

    function isUndefined() {
        return arguments.length > 0 && typeof arguments[ 0 ] === 'undefined';
    }

    function find( haystack, key ) {
        for( var i = 0, list = haystack; i < list.length; i += 1 ) {
            var item = list[i];

            if( item[ 0 ] === key ) { return item; }
        }
        return false;
    }

    var Map = function Map( iterable ) {
        if ( iterable === void 0 ) iterable = [];

        if( !( this instanceof Map ) ) {
            throw new TypeError( 'Constructor Map requires \'new\'' );
        }
        var map = iterable || [];

        Object.defineProperty( map, 'size', {
            get: function get() {
                return this.length;
            }
        } );

        map.get = function (key) {
            var data = find( map, key );
            return data ? data[ 1 ] : undefined;
        };

        map.set = function ( key, value ) {
            var data = find( map, key );
            if( data ) {
                data[ 1 ] = value;
            } else {
                map.push( [ key, value ] );
            }
            return map;
        };

        map.delete = function (key) {
            for( var i = 0, l = map.length; i < l; i += 1 ) {
                if( map[ i ][ 0 ] === key ) {
                    map.splice( i, 1 );
                    return true;
                }
                    
            }
            return false;
        };

        map.clear = function () {
            map.length = 0;
        };

        map.forEach = function ( callback, thisArg ) {
            isUndefined( thisArg ) && ( thisArg = map );
            for( var i = 0, list = map; i < list.length; i += 1 ) {
                var item = list[i];

                callback.call( thisArg, item[ 1 ], item[ 0 ], map );
            }
        };

        map.has = function (key) { return !!find( map, key ); };

        map.keys = function () {
            var keys = [];
            for( var i = 0, list = map; i < list.length; i += 1 ) {
                var item = list[i];

                keys.push( item[ 0 ] );
            }
            return keys;
        };

        map.entries = function () { return map; };

        map.values = function () {
            var values = [];
            for( var i = 0, list = map; i < list.length; i += 1 ) {
                var item = list[i];

                values.push( item[ 1 ] );
            }
            return values;
        };
        return map;
    };

    return Map;

})));
