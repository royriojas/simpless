module.exports = function ( str ) {
  var re = /(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm;
  return str.replace( re, '' );
};
