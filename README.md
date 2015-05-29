[![NPM Version](http://img.shields.io/npm/v/esbeautifier.svg?style=flat)](https://npmjs.org/package/esbeautifier)
[![Build Status](http://img.shields.io/travis/royriojas/esbeautifier.svg?style=flat)](https://travis-ci.org/royriojas/esbeautifier)

# esbeautifier
Simple wrapper around esformatter to beautify javascript files overriding the content of the files

## Motivation

`esformatter` only format the output to the stdout. This **tool will overwrite your files**. **Use it under your own risk**. 

## Install

```bash
npm i -g esbeautifier
```

## Usage

```
Usage: esbeautifier [options] glob [glob1] [glob2]..[globN]

Options:
  -k, --checkOnly      Will just run the beautifier and report which files need to be beautified
  -u, --useCache       If true, this module will remember the `mtime` and `size` of the beatufied files and only
                       operate on the ones that changed. If false, the cache will be destroyed. Cache will only be kept
                       between executions with the useCache flag set to true.
  -h, --help           Show this help
  -v, --version        Outputs the version number
  -q, --quiet          Show only the summary info
  -c, --config String  Path to your `esformatter` config, if not provided will try to use the `.esformatter` file in
                       your current working directory, if not found will use the one provided with the package
```

## Examples

```bash
# this will overwrite your files! this is usually what you want thought
esbeautifier src/**/*.js specs/**/*.js

# check only which files need beautification
# if at least one file require beautification the command will throw an exception
esbeautifier src/**/*.js -k

# use cache
esbeautifier -u src/**/*.js 
```

**Note**

The cache is only kept if the executions of the beautifying command is done with the `-u` flag. If any execution omit this flag
The cache will be destroyed and created again from scratch the next time the `-u` flag is provided

## [Changelog](./changelog.md)