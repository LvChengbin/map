(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Map = factory());
}(this, (function () { 'use strict';

    function isUndefined() {
        return arguments.length > 0 && typeof arguments[ 0 ] === 'undefined';
    }

    const g = typeof global === 'undefined' ? window : global;

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
            if( g.Map ) return new g.Map( iterable );
            this.map = iterable || [];
        }
    }

    const instance = new Map();

    if( isUndefined( instance.size ) ) {
        Object.defineProperty( Map.prototype, 'size', {
            enumerable : true,
            configurable : true,
            get() {
                return this.map.length;
            }
        } );
    }

    if( !instance.get )  {
        Map.prototype.get = function( key ) {
            const data = find( this.map, key );
            return data ? data[ 1 ] : undefined;
        };
    }

    if( !instance.set ) {
        Map.prototype.set = function( key, value ) {
            const data = find( this.map, key );
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
            for( let i = 0, l = this.map.length; i < l; i += 1 ) {
                const item = this.map[ i ];
                if( item[ 0 ] === key ) {
                    this.map.splice( i, 1 );
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
            isUndefined( thisArg ) && ( this.Arg = this );
            for( let item of this.map ) {
                callback.call( thisArg, item[ 1 ], item[ 0 ], this );
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
            const keys = [];
            for( let item of this.map ) {
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
            const values = [];
            for( let item of this.map ) {
                values.push( item[ 1 ] );
            }
            return values;
        };
    }

    return Map;

})));
