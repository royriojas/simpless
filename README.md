[![NPM Version](http://img.shields.io/npm/v/simpless.svg?style=flat)](https://npmjs.org/package/simpless)
[![Build Status](http://img.shields.io/travis/royriojas/simpless.svg?style=flat)](https://travis-ci.org/royriojas/simpless)

# simpless
`simpless` is yet another less wrapper. This one will:
- parse your `less` files
- allow you to include several files using `less-plugin-glob`
- inline small url files into the output css file
- copy the urls that cannot be inlined to a folder relative to the output

## Motivation
Just wanted to have a good wrapper to process my less resources, without having to manually install
all of the dependencies. 

## Install

```bash
npm i -g simpless
```

## Usage

```
========================================================
Usage: simpless [options] glob [glob1] [glob2]..[globN]
========================================================

Options:
  -b, --browsers [String]        the browsers to autoprefix. Default is `last 2 browsers`
  -a, --advanceMin               Whether or not to apply more risky structural optimizations for CSS. By Default is `false`. Use it with care. Requires
                                 --minimize
  -c, --copyAssetsToDestFolder   Copy the assets to the destination folder. By default is `true` - default: true
  -p, --assetsPathFormat String  The format of the assets rewrite path. By default is `assets/{REVISION}_{GUID}_{FNAME}` where {REVISION} is the revision
                                 passed to the command, {GUID} the unique indetifier or the resource and {FNAME} the filename.
  -m, --minimize                 Whether to minimize or not the output or not. By default is `false`. When the flag is set both the non minimified and
                                 minified versions will be created
  -o, --output String            The path and name for the output file
  -r, --revision String          The revision to use in the file names and assets, for example the build number or other number to identify this resource
  -h, --help                     Show this help
  -v, --version                  Outputs the version number
  -q, --quiet                    Show only the summary info

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
```

**Note**



## [Changelog](./changelog.md)