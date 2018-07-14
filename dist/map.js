(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Map = factory());
}(this, (function () { 'use strict';

    /**
     * async function
     *
     * @syntax: 
     *  async function() {}
     *  async () => {}
     *  async x() => {}
     *
     * @compatibility
     * IE: no
     * Edge: >= 15
     * Android: >= 5.0
     *
     */

    var isAsyncFunction = fn => ( {} ).toString.call( fn ) === '[object AsyncFunction]';

    var isFunction = fn => ({}).toString.call( fn ) === '[object Function]' || isAsyncFunction( fn );

    function isUndefined() {
        return arguments.length > 0 && typeof arguments[ 0 ] === 'undefined';
    }

    const defineProperty = Object.defineProperty;
    const methods = [ 'clear', 'delete', 'entries', 'forEach', 'get', 'has', 'keys', 'set', 'values' ];

    const supportNativeMap = () => {
        if( typeof Map === 'undefined' ) return false;
        for( const method of methods ) {
            if( !isFunction( Map.prototype[ method ] ) ) return false;
        }
        return true;
    };

    function find( haystack, key ) {
        for( let item of haystack ) {
            if( item[ 0 ] === key ) return item;
        }
        return false;
    }

    class M {
        constructor( iterable = [], nativeMap = true ) {
            if( !( this instanceof M ) ) {
                throw new TypeError( 'Constructor Map requires \'new\'' );
            }

            if( nativeMap && supportNativeMap() ) {
                return new Map( iterable );
            }

            const map = iterable || [];

            defineProperty( map, 'size', {
                enumerable : false,
                get() {
                    return this.length;
                }
            } );

            defineProperty( map, 'get', {
                enumerable : false,
                value : function( key ) {
                    const data = find( this, key );
                    return data ? data[ 1 ] : undefined;
                }
            } );

            defineProperty( map, 'set', {
                enumerable : false,
                value : function( key, value ) {
                    const data = find( this, key );
                    if( data ) {
                        data[ 1 ] = value;
                    } else {
                        this.push( [ key, value ] );
                    }
                    return this;
                }
            } );

            defineProperty( map, 'delete', {
                enumerable : false,
                value : function( key ) {
                    for( let i = 0, l = this.length; i < l; i += 1 ) {
                        if( this[ i ][ 0 ] === key ) {
                            this.splice( i, 1 );
                            return true;
                        }
                    }
                    return false;
                }
            } );

            defineProperty( map, 'clear', {
                enumerable : false,
                value : function() {
                    this.length = 0;
                }
            } );

            defineProperty( map, 'forEach', {
                enumerable : false,
                value : function( callback, thisArg ) {
                    isUndefined( thisArg ) && ( thisArg = this );
                    for( let item of this ) {
                        callback.call( thisArg, item[ 1 ], item[ 0 ], this );
                    }
                }
            } );

            defineProperty( map, 'has', {
                enumerable : false,
                value : function( key ) {
                    return !!find( this, key );
                }
            } );

            defineProperty( map, 'keys', {
                enumerable : false,
                value : function() {
                    const keys = [];
                    for( let item of this ) {
                        keys.push( item[ 0 ] );
                    }
                    return keys;
                }
            } );

            defineProperty( map, 'entries', {
                enumerable : false,
                value : function() {
                    return this;
                }
            } );

            defineProperty( map, 'values', {
                enumerable : false,
                value : function() {
                    const values = [];
                    for( let item of this ) {
                        values.push( item[ 1 ] );
                    }
                    return values;
                }
            } );
            return map;
        }
    }

    return M;

})));
