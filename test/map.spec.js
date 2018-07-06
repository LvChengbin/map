import Map from '../src/map';

describe( 'Map', () => {
    it( 'should throw an TypeError is using Map without a "new"', () => {
        expect( function() { Map() } ).toThrowError( TypeError );
    } );

    it( 'constructor without arguments', () => {
        const map = new Map();
        expect( map.size ).toEqual( 0 );
    } );

    it( 'constructor with an NULL as argument', () => {
        const map = new Map( null );
        expect( map.size ).toEqual( 0 );
    } );

    it( 'constructor with an iterable argument', () => {
        const map = new Map( [ [ 'x', 1 ] ] );
        expect( map.size ).toEqual( 1 );
    } );
} );

describe( 'Map.prototype.size', () => {
    it( 'after initializion', () => {
        const map = new Map( [ [ 'x', 1 ], [ 'y', 1 ] ] );
        expect( map.size ).toEqual( 2 );
    } );

    it( 'after deleting', () => {
        const map = new Map( [ [ 'x', 1 ], [ 'y', 1 ] ] );
        map.delete( 'x' );
        expect( map.size ).toEqual( 1 );
    } );

    it( 'after inserting new data', () => {
        const map = new Map( [ [ 'x', 1 ], [ 'y', 1 ] ] );
        map.set( 'z', 3 );
        expect( map.size ).toEqual( 3 );
    } );
} );

describe( 'Map.prototype.get', () => {
    it( 'get an exists key', () => {
        const map = new Map( [ [ 'x', 1 ], [ 'y', 1 ] ] );
        expect( map.get( 'x' ) ).toEqual( 1 );
    } );

    it( 'get a non-exists key', () => {
        const map = new Map( [ [ 'x', 1 ], [ 'y', 1 ] ] );
        expect( map.get( 'z' ) ).toEqual( undefined );
    } );

    it( '1 does not equal to "1"', () => {
        const map = new Map( [ [ '1', 'b' ], [ 1, 'a' ] ] );
        expect( map.get( '1' ) ).toEqual( 'b' );
        expect( map.get( 1 ) ).toEqual( 'a' );
    } );

    it( 'to get value with an object key', () => {
        const obj = {};
        const map = new Map( [ [ obj, 'b' ] ] );
        expect( map.get( obj ) ).toEqual( 'b' );
    } );
} );

describe( 'Map.prototype.set', () => {
    it( 'to set a new value', () => {
        const obj = () => {};
        const map = new Map();
        map.set( 'x', 1 );
        map.set(  obj, 2 );
        expect( map.get( 'x' ) ).toEqual( 1 );
        expect( map.get( obj ) ).toBeTruthy( 2 );
    } );

    it( 'to replace an existing value', () => {
        const obj = () => {};
        const map = new Map( [ [ 'x', 0 ], [ obj, 0 ] ] );
        map.set( 'x', 1 );
        map.set(  obj, 2 );
        expect( map.get( 'x' ) ).toEqual( 1 );
        expect( map.get( obj ) ).toBeTruthy( 2 );
    } );
    
} );

describe( 'Map.prototype.delete', () => {
    it( 'to delete an existing value', () => {
        const obj = () => {};
        const map = new Map( [ [ 'x', 0 ], [ obj, 0 ] ] );
        expect( map.delete( 'x' ) ).toBeTruthy();
        expect( map.delete( obj ) ).toBeTruthy();
    } );

    it( 'to delete a non-existing value', () => {
        const map = new Map();
        expect( map.delete( 'x' ) ).toBeFalsy();
    } );
} );

describe( 'Map.prototyp.clear', () => {
    it( 'clear all data', () => {
        const obj = () => {};
        const map = new Map( [ [ 'x', 0 ], [ obj, 0 ] ] );
        map.clear();
        expect( map.size ).toEqual( 0 );
    } );
    
} );

describe( 'Map.prototype.forEach', () => {
    it( 'callback', () => {
        const obj = () => {};
        const map = new Map( [ [ obj, 0 ] ] );
        map.forEach( ( value, key, m ) => {
            expect( value ).toEqual( 0 );
            expect( key ).toEqual( obj );
            expect( m ).toEqual( map );
        } );
    } );

    it( 'specifying an this arguments', () => {
        const that = {};
        const obj = () => {};
        const map = new Map( [ [ obj, 0 ] ] );
        map.forEach( function() {
            expect( this ).toEqual( that );
        }, that );
    } );
} );

describe( 'Map.prototype.has', () => {
    it( 'the try with an existing value', () => {
        const obj = () => {};
        const map = new Map( [ [ obj, 0 ] ] );
        expect( map.has( obj ) ).toBeTruthy();
    } );

    it( 'to try with an non-existing value', () => {
        const map = new Map();
        expect( map.has( 'x' ) ).toBeFalsy();
    } );
} );

describe( 'Map.prototype.keys', () => {
    it( 'iterate keys', () => {
        const obj = () => {};
        const map = new Map( [ [ obj, 0 ] ] );
        for( let item of map.keys() ) {
           expect( item ).toEqual( obj ); 
        }
    } );
} );

describe( 'Map.prototype.values', () => {
    it( 'iterate values', () => {
        const obj = () => {};
        const map = new Map( [ [ obj, 0 ] ] );
        for( let item of map.values() ) {
           expect( item ).toEqual( 0 ); 
        }
    } );
} );

describe( 'Map.prototype.entries', () => {
    it( 'iterate values', () => {
        const obj = () => {};
        const map = new Map( [ [ obj, 0 ] ] );
        for( let item of map.entries() ) {
           expect( item ).toEqual( [ obj, 0 ] ); 
        }
    } );
} );
