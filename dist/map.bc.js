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

    var instance = new Map();

    if( isUndefined( instance.size ) ) {
        Object.defineProperty( Map.prototype, 'size', {
            enumerable : true,
            configurable : true,
            get: function get() {
                return this.map.length;
            }
        } );
    }

    if( !instance.get )  {
        Map.prototype.get = function( key ) {
            var data = find( this.map, key );
            return data ? data[ 1 ] : undefined;
        };
    }

    if( !instance.set ) {
        Map.prototype.set = function( key, value ) {
            var data = find( this.map, key );
            if( data ) {
                data[ 1 ] = value;
            } else {
                this.map.push( [ key, value ] );
            }
            return this;
        };
    }

    if( !instance.delete ) {
        Map.prototype.delete = function( key ) {
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
    }

    if( !instance.clear ) {
        Map.prototype.clear = function() {
            this.map= [];
        };
    }

    if( !instance.forEach ) {
        Map.prototype.forEach = function( callback, thisArg ) {
            var this$1 = this;

            isUndefined( thisArg ) && ( this.Arg = this );
            for( var i = 0, list = this$1.map; i < list.length; i += 1 ) {
                var item = list[i];

                callback.call( thisArg, item[ 1 ], item[ 0 ], this$1 );
            }
        };
    }

    if( !instance.has ) {
        Map.prototype.has = function( key ) {
            return !!find( this.map, key );
        };
    }

    if( !instance.keys ) {
        Map.prototype.keys = function() {
            var this$1 = this;

            var keys = [];
            for( var i = 0, list = this$1.map; i < list.length; i += 1 ) {
                var item = list[i];

                keys.push( item[ 0 ] );
            }
            return keys;
        };
    }

    if( !instance.entries ) {
        Map.prototype.entries = function() {
            return this.map;
        };
    }

    if( !instance.values ) {
        Map.prototype.values = function() {
            var this$1 = this;

            var values = [];
            for( var i = 0, list = this$1.map; i < list.length; i += 1 ) {
                var item = list[i];

                values.push( item[ 1 ] );
            }
            return values;
        };
    }

    return Map;

})));
