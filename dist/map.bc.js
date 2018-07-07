(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Map = factory());
}(this, (function () { 'use strict';

    function isUndefined() {
        return arguments.length > 0 && typeof arguments[ 0 ] === 'undefined';
    }

    var g = typeof global === 'undefined' ? window : global;

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
        if( g.Map ) { return new g.Map( iterable ); }
        this.map = iterable || [];
    };

    var prototypeAccessors = { size: { configurable: true } };
    prototypeAccessors.size.get = function () {
        return this.map.length;
    };

    Map.prototype.get = function get ( key ) {
        var data = find( this.map, key );
        return data ? data[ 1 ] : undefined;
    };

    Map.prototype.set = function set ( key, value ) {
        var data = find( this.map, key );
        if( data ) {
            data[ 1 ] = value;
        } else {
            this.map.push( [ key, value ] );
        }
        return this;
    };

    Map.prototype.delete = function delete$1 ( key ) {
            var this$1 = this;

        for( var i = 0, l = this.map.length; i < l; i += 1 ) {
            var item = this$1.map[ i ];
            if( item[ 0 ] === key ) {
                this$1.map.splice( i, 1 );
                return true;
            }
                
        }
        return false;
    };

    Map.prototype.clear = function clear () {
        this.map= [];
    };

    Map.prototype.forEach = function forEach ( callback, thisArg ) {
            var this$1 = this;

        isUndefined( thisArg ) && ( this.Arg = this );
        for( var i = 0, list = this$1.map; i < list.length; i += 1 ) {
            var item = list[i];

                callback.call( thisArg, item[ 1 ], item[ 0 ], this$1 );
        }
    };

    Map.prototype.has = function has ( key ) {
        return !!find( this.map, key );
    };

    Map.prototype.keys = function keys () {
            var this$1 = this;

        var keys = [];
        for( var i = 0, list = this$1.map; i < list.length; i += 1 ) {
            var item = list[i];

                keys.push( item[ 0 ] );
        }
        return keys;
    };

    Map.prototype.entries = function entries () {
        return this.map;
    };

    Map.prototype.values = function values () {
            var this$1 = this;

        var values = [];
        for( var i = 0, list = this$1.map; i < list.length; i += 1 ) {
            var item = list[i];

                values.push( item[ 1 ] );
        }
        return values;
    };

    Object.defineProperties( Map.prototype, prototypeAccessors );

    return Map;

})));
