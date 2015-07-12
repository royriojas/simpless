// code for `typeOf` and `isPlainObject` borrowed from `jQuery.type`
// to avoid including jquery only to have this
var class2type = { };

var types = [
  'Boolean',
  'Number',
  'String',
  'Function',
  'Array',
  'Date',
  'RegExp',
  'Object'
];

var toStr = Object.prototype.toString;

types.forEach( function ( name ) {
  class2type[ '[object ' + name + ']' ] = name.toLowerCase();
} );

module.exports = function ( obj ) {
  return obj === null ?
    String( obj ) :
    class2type[ toStr.call( obj ) ] || 'object';
};
