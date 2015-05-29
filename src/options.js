var path = require( 'path' );

module.exports = {
  pkgJSONPath: path.resolve( __dirname, '../package.json' ),
  configFile: {
    defaultName: 'package.json',
    pathToLocalConfig: path.resolve( __dirname, '../configs/simpless.json' ),
    description: 'Path to your `simpless` config, if not provided will try to use the `package.json` file in your current working directory, expecting an entry called `simpless`, if not found will use the one provided with this package'
  },
  //useDefaultOptions: true,
  optionator: {
    prepend: 'Usage: simpless [options] glob [glob1] [glob2]..[globN]',
    options: [
      {
        heading: 'Options'
      },
      {
        option: 'output',
        alias: 'o',
        type: 'String',
        description: 'The name of the output file'
      }
    ]
  }
};
