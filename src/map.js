import isUndefined from '@lvchengbin/is/src/undefined';

const g = typeof global === 'undefined' ? window : global;

function find( haystack, key ) {
    for( let item of haystack ) {
        if( item[ 0 ] === key ) return item;
    }
    return false;
}

class JMap {
    constructor( iterable = [] ) {
        if( !( this instanceof JMap ) ) {
            throw new TypeError( 'Constructor Map requires \'new\'' );
        }
        if( g.Map ) return new g.Map( iterable );
        this.map = iterable;
    }
    get size() {
        return this.map.length;
    }

    get( key ) {
        const data = find( this.map, key );
        return data ? data[ 1 ] : undefined;
    }

    set( key, value ) {
        const data = find( this.map, key );
        if( data ) {
            data[ 1 ] = value;
        } else {
            this.map.push( [ key, value ] );
        }
        return this;
    }

    delete( key ) {
        for( let i = 0, l = this.map.length; i < l; i += 1 ) {
            const item = this.map[ i ];
            if( item[ 0 ] === key ) {
                this.map.splice( i, 1 );
                return true;
            }
            
        }
        return false;
    }

    clear() {
        this.map= [];
    }

    forEach( callback, thisArg ) {
        isUndefined( thisArg ) && ( this.Arg = this );
        for( let item of this.map ) {
            callback.call( thisArg, item[ 1 ], item[ 0 ], this );
        }
    }

    has( key ) {
        return !!find( this.map, key );
    }

    keys() {
        const keys = [];
        for( let item of this.map ) {
            keys.push( item[ 0 ] );
        }
        return keys;
    }

    entries() {
        return this.map;
    }

    values() {
        const values = [];
        for( let item of this.map ) {
            values.push( item[ 1 ] );
        }
        return values;
    }
}

export default JMap;
