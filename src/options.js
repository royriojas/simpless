var path = require( 'path' );

module.exports = {
  pkgJSONPath: path.resolve( __dirname, '../package.json' ),
  configFile: {
    // defaultName: 'package.json',
    //   pathToLocalConfig: path.resolve( __dirname, '../configs/simpless.json' ),
    description: 'Path to your `simpless.conf.js` config, if provided all the other parameters will be ignored'
  },
  //useDefaultOptions: true,
  optionator: {
    prepend: '`simpless` is yet another less wrapper. This one will:\n\n- parse your `less` files\n- allow you to include several files using `less-plugin-glob` `@import "some/glob/**/*.less"\n- inline small url files into the output css file\n- copy the urls that cannot be inlined to a folder relative to the output\n- provide a watch mode to rebuild the css on any change of the entry file and any of its dependencies\n- will make you happy!. Well maybe, at least I hope it will do its best effort!\n\n========================================================\nUsage: simpless [options] glob [glob1] [glob2]..[globN]\n========================================================',
    options: [
      {
        heading: 'Options'
      },
      // {
      //   config: 'config',
      //   alias: 'c',
      //   type: 'String',
      //   description: 'Path to your `simpless.conf.js`'
      // },
      {
        option: 'browsers',
        alias: 'b',
        type: '[String]',
        description: 'the browsers to autoprefix. Default is `last 2 browsers`',
        example: 'simpless src/in.less -b "last 2 versions" -o dest/out.css'
      },
      {
        option: 'advance-min',
        alias: 'a',
        dependsOn: 'minimize',
        type: 'Boolean',
        description: 'Whether or not to apply more risky structural optimizations for CSS. By Default is `false`. Use it with care. Requires --minimize'
      },
      {
        option: 'copy-assets',
        alias: 'k',
        type: 'Boolean',
        'default': 'true',
        description: 'Copy the assets to the destination folder. By default is `true`'
      },
      {
        option: 'assets-path-format',
        alias: 'p',
        type: 'String',
        dependsOn: 'copyAssetsToDestFolder',
        description: 'The format of the assets rewrite path. By default is `assets/{REVISION}_{GUID}_{FNAME}` where {REVISION} is the revision passed to the command, {GUID} the unique indetifier or the resource and {FNAME} the filename.'
      },
      {
        option: 'minimize',
        alias: 'm',
        type: 'Boolean',
        description: 'Whether to minimize or not the output or not. By default is `false`. When the flag is set both the non minimified and minified versions will be created'
      },
      {
        option: 'watch',
        alias: 'w',
        type: 'Boolean',
        description: 'wait for changes on the files and dependencies to rebuild the target'
      },
      {
        option: 'watch-delay',
        alias: 'd',
        type: 'Number',
        default: '600',
        description: 'Amount of time in milliseconds to wait before emitting an "update" event after a change'
      },
      {
        option: 'output',
        alias: 'o',
        type: 'String',
        description: 'The path and name for the output file'
      },
      {
        option: 'revision',
        alias: 'r',
        type: 'String',
        description: 'The revision to use in the file names and assets, for example the build number or other number to identify this resource'
      },
      {
        option: 'banner',
        type: 'String',
        description: 'The banner to put at the top of the compiled files'
      },
      {
        option: 'user-functions',
        alias: 'u',
        type: 'String',
        description: 'the path to the user functions module. A simple object where each key is the name of the function and the value is the custom function itself'
      },
      {
        option: 'target',
        alias: 't',
        type: 'String',
        dependsOn: 'config',
        description: 'The name of the target to execute from all the posible targets'
      }
    ]
  }
};
