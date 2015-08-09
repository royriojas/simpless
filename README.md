[![NPM Version](http://img.shields.io/npm/v/simpless.svg?style=flat)](https://npmjs.org/package/simpless)
[![Build Status](http://img.shields.io/travis/royriojas/simpless.svg?style=flat)](https://travis-ci.org/royriojas/simpless)

# simpless
`simpless` is yet another less wrapper. This one will:
- parse your `less` files
- allow you to include several files using `less-plugin-glob`
- inline small url files into the output css file
- copy the urls that cannot be inlined to a folder relative to the output
- provide the option to include a banner
- provide the option to pass a revision number
- generate the minimized version if required
- provide the option to include custom functions. `calc-em`, `calc-rem` and `rel-val` are included as an example of how to
  add custom functions. the code is `simpless/lib/default-user-fns.js`. It is intented to be a guidance of how to add this
  functions to `less`.

**TODO: Add a cache mode for incremental builds**

**NOTE**:
The module used to have colored output. It has being removed because not all terminals use the same color scheme. `--colored-ouput` can be used to get the colored output back

## Motivation
Just wanted to have a good wrapper to process my less resources, without having to manually install all of the dependencies.
Also the watch mode was something I really need to have. **All the other solutions were only listening on the main entry file**
but if an imported file changed, then I was lost. I know I can use `gulp-progeny` or something similar to achieve the same, but
I didn't wanted to depend on a task runner. I'm trying to embrace the [npm as build tool approach](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/). This module is helping now to get some sanity to my building process and hope it can help others as well.

## Install

```bash
npm i -g simpless
```

## Usage

here is the output of the `--help` option

```
`simpless` is yet another less wrapper. This one will:

- parse your `less` files
- allow you to include several files using `less-plugin-glob` `@import "some/glob/**/*.less"
- inline small url files into the output css file
- copy the urls that cannot be inlined to a folder relative to the output
- provide a watch mode to rebuild the css on any change of the entry file and any of its dependencies
- will make you happy!. Well maybe, at least I hope it will do its best effort!

========================================================
Usage: simpless [options] glob [glob1] [glob2]..[globN]
========================================================

Options:
  -b, --browsers [String]      the browsers to autoprefix. Default is `last 2 browsers`
  -a, --advance-min            Whether or not to apply more risky structural optimizations for CSS. By Default is `false`. Use it with care. Requires
                               --minimize
  -c, --copy-assets            Copy the assets to the destination folder. By default is `true` - default: true
  -p, --assets-path-format String  The format of the assets rewrite path. By default is `assets/{REVISION}_{GUID}_{FNAME}` where {REVISION} is the revision
                                   passed to the command, {GUID} the unique indetifier or the resource and {FNAME} the filename.
  -m, --minimize               Whether to minimize or not the output or not. By default is `false`. When the flag is set both the non minimified and
                               minified versions will be created
  -w, --watch                  wait for changes on the files and dependencies to rebuild the target
  -d, --watch-delay Number     Amount of time in milliseconds to wait before emitting an "update" event after a change - default: 600
  -o, --output String          The path and name for the output file
  -r, --revision String        The revision to use in the file names and assets, for example the build number or other number to identify this resource
  --banner String              The banner to put at the top of the compiled files
  -u, --user-functions String  the path to the user functions module. A simple object where each key is the name of the function and the value is the custom
                               function itself
  -h, --help                   Show this help
  -v, --version                Outputs the version number
  -q, --quiet                  Show only the summary info - default: false
  --colored-output             Use colored output in logs
```

## Examples

```bash
# this will compile demo.less and other-file.less into out.css
simpless src/demo.less src/other-file.less -o dest/out.css

# this will compile demo.less and other-file.less into out.css
# and generate out.min.css also
simpless src/demo.less src/other-file.less -o dest/out.css -m

# this will compile demo.less and other-file.less into out.css
# and generate out.min.css using structure modifications. Use it with care.
simpless src/demo.less src/other-file.less -o dest/out.css -ma

# this will compile demo.less and other-file.less into out.1.5.3.css
# and generate out.1.5.3.min.css using structure modifications and a revision value
simpless src/demo.less src/other-file.less -o dest/out.css -ma -r 1.5.3

# this will compile demo.less and other-file.less into out.1.5.3.css
# and generate out.1.5.3.min.css using structure modifications and a
# revision value and set the browsers to use autoprefix to `last 1 version`
simpless src/demo.less src/other-file.less -o dest/out.css -ma -r 1.5.3 -b 'last 1 version'

# generate a file with a banner, both normal and minified.
simpless -o demo/dest/demo.css demo/src/demo-with-fns.less --banner="/*! some license info for the generated file */" -ma

# use some custom functions defined in an external module
simpless -o demo/dest/demo.css demo/src/demo-with-fns.less -ma -u './path/to/custom-functions';

# generate the combined output of demo.css and demo-with-fns.less using --colored-ouput and a delay of 250ms
simpless -w -o demo/dest/demo.css demo/src/demo.less demo/src/demo-with-fns.less --colored-output -d 250

# Same as above but include customFunctions js file
simpless -u lib/default-user-fns.js -w -o demo/dest/demo.css demo/src/demo.less demo/src/demo-with-fns.less --colored-output -d 250
```

## [Changelog](./changelog.md)
