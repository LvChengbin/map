import resolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';

export default [ {
    input : 'src/map.js',
    plugins : [
        resolve( {
            module : true,
            jsnext : true
        } )
    ],
    output : [
        { file : 'dist/map.cjs.js', format : 'cjs' },
        { file : 'dist/map.js', format : 'umd', name : 'Map' }
    ]
}, {
    input : 'src/map.js',
    plugins : [
        resolve( {
            module : true,
            jsnext : true
        } ),
        buble( {
            transforms : {
                arrow : true,
                dangerousForOf : true
            }
        } )
    ],
    output : [
        { file : 'dist/map.bc.js', format : 'umd', name : 'Map' }
    ]
} ];
