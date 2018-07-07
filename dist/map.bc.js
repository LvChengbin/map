(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.JMap = factory());
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

    var JMap = function JMap( iterable ) {
        if ( iterable === void 0 ) iterable = [];

        if( !( this instanceof JMap ) ) {
            throw new TypeError( 'Constructor Map requires \'new\'' );
        }
        if( g.Map ) { return new g.Map( iterable ); }
        this.map = iterable;
    };

    var prototypeAccessors = { size: { configurable: true } };
    prototypeAccessors.size.get = function () {
        return this.map.length;
    };

    JMap.prototype.get = function get ( key ) {
        var data = find( this.map, key );
        return data ? data[ 1 ] : undefined;
    };

    JMap.prototype.set = function set ( key, value ) {
        var data = find( this.map, key );
        if( data ) {
            data[ 1 ] = value;
        } else {
            this.map.push( [ key, value ] );
        }
        return this;
    };

    JMap.prototype.delete = function delete$1 ( key ) {
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

    JMap.prototype.clear = function clear () {
        this.map= [];
    };

    JMap.prototype.forEach = function forEach ( callback, thisArg ) {
            var this$1 = this;

        isUndefined( thisArg ) && ( this.Arg = this );
        for( var i = 0, list = this$1.map; i < list.length; i += 1 ) {
            var item = list[i];

                callback.call( thisArg, item[ 1 ], item[ 0 ], this$1 );
        }
    };

    JMap.prototype.has = function has ( key ) {
        return !!find( this.map, key );
    };

    JMap.prototype.keys = function keys () {
            var this$1 = this;

        var keys = [];
        for( var i = 0, list = this$1.map; i < list.length; i += 1 ) {
            var item = list[i];

                keys.push( item[ 0 ] );
        }
        return keys;
    };

    JMap.prototype.entries = function entries () {
        return this.map;
    };

    JMap.prototype.values = function values () {
            var this$1 = this;

        var values = [];
        for( var i = 0, list = this$1.map; i < list.length; i += 1 ) {
            var item = list[i];

                values.push( item[ 1 ] );
        }
        return values;
    };

    Object.defineProperties( JMap.prototype, prototypeAccessors );

    return JMap;

})));
