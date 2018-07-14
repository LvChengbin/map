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

    function isAsyncFunction (fn) { return ( {} ).toString.call( fn ) === '[object AsyncFunction]'; }

    function isFunction (fn) { return ({}).toString.call( fn ) === '[object Function]' || isAsyncFunction( fn ); }

    function isUndefined() {
        return arguments.length > 0 && typeof arguments[ 0 ] === 'undefined';
    }

    var defineProperty = Object.defineProperty;
    var methods = [ 'clear', 'delete', 'entries', 'forEach', 'get', 'has', 'keys', 'set', 'values' ];

    var supportNativeMap = function () {
        if( typeof Map === 'undefined' ) { return false; }
        for( var i = 0, list = methods; i < list.length; i += 1 ) {
            var method = list[i];

            if( !isFunction( Map.prototype[ method ] ) ) { return false; }
        }
        return true;
    };

    function find( haystack, key ) {
        for( var i = 0, list = haystack; i < list.length; i += 1 ) {
            var item = list[i];

            if( item[ 0 ] === key ) { return item; }
        }
        return false;
    }

    var M = function M( iterable, nativeMap ) {
        if ( iterable === void 0 ) iterable = [];
        if ( nativeMap === void 0 ) nativeMap = true;

        if( !( this instanceof M ) ) {
            throw new TypeError( 'Constructor Map requires \'new\'' );
        }

        if( nativeMap && supportNativeMap() ) {
            return new Map( iterable );
        }

        var map = iterable || [];

        defineProperty( map, 'size', {
            enumerable : false,
            get: function get() {
                return this.length;
            }
        } );

        defineProperty( map, 'get', {
            enumerable : false,
            value : function( key ) {
                var data = find( this, key );
                return data ? data[ 1 ] : undefined;
            }
        } );

        defineProperty( map, 'set', {
            enumerable : false,
            value : function( key, value ) {
                var data = find( this, key );
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
                var this$1 = this;

                for( var i = 0, l = this.length; i < l; i += 1 ) {
                    if( this$1[ i ][ 0 ] === key ) {
                        this$1.splice( i, 1 );
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
                var this$1 = this;

                isUndefined( thisArg ) && ( thisArg = this );
                for( var i = 0, list = this$1; i < list.length; i += 1 ) {
                    var item = list[i];

                    callback.call( thisArg, item[ 1 ], item[ 0 ], this$1 );
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
                var this$1 = this;

                var keys = [];
                for( var i = 0, list = this$1; i < list.length; i += 1 ) {
                    var item = list[i];

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
                var this$1 = this;

                var values = [];
                for( var i = 0, list = this$1; i < list.length; i += 1 ) {
                    var item = list[i];

                    values.push( item[ 1 ] );
                }
                return values;
            }
        } );
        return map;
    };

    return M;

})));
