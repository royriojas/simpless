
# simpless - Changelog
## v3.1.0
- **Build Scripts Changes**
  - Fix possible memory leak issue when using `process.on` - [762eec7]( https://github.com/royriojas/simpless/commit/762eec7 ), [Roy Riojas](https://github.com/Roy Riojas), 09/02/2016 23:14:39

    
## v3.0.16
- **Enhancements**
  - do not read from file if the content is provided - [9b2dfdc]( https://github.com/royriojas/simpless/commit/9b2dfdc ), [royriojas](https://github.com/royriojas), 20/11/2015 13:57:05

    
## v3.0.15
- **Bug Fixes**
  - grunt task cannot override generation of minimized file - [cce23f4]( https://github.com/royriojas/simpless/commit/cce23f4 ), [royriojas](https://github.com/royriojas), 15/09/2015 19:53:10

    
## v3.0.14
- **Bug Fixes**
  - properly throw errors during path rewriting - [7cd83ca]( https://github.com/royriojas/simpless/commit/7cd83ca ), [royriojas](https://github.com/royriojas), 28/08/2015 14:35:18

    
## v3.0.13
- **Bug Fixes**
  - make sure watcher honor the changes on imported files - [7515364]( https://github.com/royriojas/simpless/commit/7515364 ), [royriojas](https://github.com/royriojas), 25/08/2015 12:54:30

    
## v3.0.12
- **Enhancements**
  - Do not break the tasks if an error happen in one target - [0ac4f26]( https://github.com/royriojas/simpless/commit/0ac4f26 ), [royriojas](https://github.com/royriojas), 21/08/2015 17:36:37

    
## v3.0.11
- **Enhancements**
  - Properly handle errors thrown during parsing less file - [7a76f95]( https://github.com/royriojas/simpless/commit/7a76f95 ), [royriojas](https://github.com/royriojas), 21/08/2015 17:27:49

    
## v3.0.10
- **Build Scripts Changes**
  - Update clix to obtain `ext` and `rename` options - [f483153]( https://github.com/royriojas/simpless/commit/f483153 ), [Roy Riojas](https://github.com/Roy Riojas), 21/08/2015 01:42:40

    
## v3.0.9
- **Build Scripts Changes**
  - include latest clix to fix issue expanding mappings - [fe08d98]( https://github.com/royriojas/simpless/commit/fe08d98 ), [Roy Riojas](https://github.com/Roy Riojas), 20/08/2015 23:16:41

    
## v3.0.8
- **Bug Fixes**
  - Less noisy grunt task output - [11884c0]( https://github.com/royriojas/simpless/commit/11884c0 ), [royriojas](https://github.com/royriojas), 17/08/2015 15:40:23

    
## v3.0.7
- **Features**
  - allow to specify more than on task to run at a time - [7f3d7cf]( https://github.com/royriojas/simpless/commit/7f3d7cf ), [royriojas](https://github.com/royriojas), 17/08/2015 02:06:31

    
## v3.0.6
- **Refactoring**
  - Add support for grunt style configuration file - [2a7f697]( https://github.com/royriojas/simpless/commit/2a7f697 ), [royriojas](https://github.com/royriojas), 16/08/2015 19:57:21

    
## v3.0.5
- **Refactoring**
  - use more verbose logs - [0706879]( https://github.com/royriojas/simpless/commit/0706879 ), [royriojas](https://github.com/royriojas), 12/08/2015 23:30:25

    
## v3.0.4
- **Build Scripts Changes**
  - update clix dep to get nicer log output - [8533d35]( https://github.com/royriojas/simpless/commit/8533d35 ), [royriojas](https://github.com/royriojas), 11/08/2015 17:41:59

    
## v3.0.3
- **Bug Fixes**
  - missing clix-logger dep - [a901bfd]( https://github.com/royriojas/simpless/commit/a901bfd ), [royriojas](https://github.com/royriojas), 11/08/2015 11:53:39

    
## v3.0.2
- **Bug Fixes**
  - missing write dep - [931e89d]( https://github.com/royriojas/simpless/commit/931e89d ), [royriojas](https://github.com/royriojas), 09/08/2015 19:19:59

    
## v3.0.1
- **Bug Fixes**
  - remove missing read-file dependency - [23d94b6]( https://github.com/royriojas/simpless/commit/23d94b6 ), [royriojas](https://github.com/royriojas), 09/08/2015 19:13:57

    
## v3.0.0
- **Features**
  - Add grunt-task - [fed0b0e]( https://github.com/royriojas/simpless/commit/fed0b0e ), [royriojas](https://github.com/royriojas), 09/08/2015 17:57:58

    
- **Refactoring**
  - rename `copy-assets-to` option to `copy-assets` - [b3dbde1]( https://github.com/royriojas/simpless/commit/b3dbde1 ), [royriojas](https://github.com/royriojas), 09/08/2015 16:50:37

    
- **Build Scripts Changes**
  - Update clix dependency to get better log messages - [b89173d]( https://github.com/royriojas/simpless/commit/b89173d ), [royriojas](https://github.com/royriojas), 09/08/2015 16:49:31

    
## v2.0.7
- **Build Scripts Changes**
  - update dependencies and build script - [f33039e]( https://github.com/royriojas/simpless/commit/f33039e ), [royriojas](https://github.com/royriojas), 07/08/2015 15:09:02

    
  - remove modules that are `devDependencies` from the `dependencies` section - [0680caf]( https://github.com/royriojas/simpless/commit/0680caf ), [royriojas](https://github.com/royriojas), 07/08/2015 14:35:16

    
## v2.0.6
- **Build Scripts Changes**
  - attempt to use the beta version - [98dc7e4]( https://github.com/royriojas/simpless/commit/98dc7e4 ), [royriojas](https://github.com/royriojas), 22/07/2015 14:26:52

    
## v2.0.6-0
- **Build Scripts Changes**
  - Upgrade to 2.0.6-0 to try the less compiler from the branch with faster compile time - [a64f72f]( https://github.com/royriojas/simpless/commit/a64f72f ), [royriojas](https://github.com/royriojas), 22/07/2015 14:22:00

    
  - Add less from the branch to speed up compile time - [58ec719]( https://github.com/royriojas/simpless/commit/58ec719 ), [royriojas](https://github.com/royriojas), 22/07/2015 14:04:45

    
## v2.0.5
- **Build Scripts Changes**
  - Fix the description of the module - [ce10111]( https://github.com/royriojas/simpless/commit/ce10111 ), [royriojas](https://github.com/royriojas), 17/07/2015 20:23:54

    
## v2.0.4
- **Enhancements**
  - Improved log messages - [cbbc2ef]( https://github.com/royriojas/simpless/commit/cbbc2ef ), [royriojas](https://github.com/royriojas), 13/07/2015 01:04:47

    
## v2.0.3
- **Refactoring**
  - remove not needed call to util inspect - [eced4d1]( https://github.com/royriojas/simpless/commit/eced4d1 ), [royriojas](https://github.com/royriojas), 13/07/2015 00:10:44

    
- **Bug Fixes**
  - Proper error reporting of the file causing the parse issue from less - [c9eab6e]( https://github.com/royriojas/simpless/commit/c9eab6e ), [royriojas](https://github.com/royriojas), 13/07/2015 00:10:15

    
- **Build Scripts Changes**
  - Update deps - [f0b62f7]( https://github.com/royriojas/simpless/commit/f0b62f7 ), [royriojas](https://github.com/royriojas), 13/07/2015 00:09:29

    
  - Updated clix dep for the ability to set the colored output flag using an environment flag - [417dda0]( https://github.com/royriojas/simpless/commit/417dda0 ), [royriojas](https://github.com/royriojas), 12/07/2015 23:44:24

    In your profile add the following line to have the colored output back without having to specify the flag --colored-output
    
    ```bash
    export __CLIX_COLORED_OUTPUT__=true
    ```
    
## v2.0.2
- **Documentation**
  - fix issue with the style of the readme - [0c30c0a]( https://github.com/royriojas/simpless/commit/0c30c0a ), [royriojas](https://github.com/royriojas), 12/07/2015 01:55:35

    
## v2.0.1
- **Build Scripts Changes**
  - Include a script to automate the changelog generation - [cfb6cee]( https://github.com/royriojas/simpless/commit/cfb6cee ), [royriojas](https://github.com/royriojas), 12/07/2015 01:48:21

    
- **Bug Fixes**
  - include default user functions again, removed by mistake - [34e6b1a]( https://github.com/royriojas/simpless/commit/34e6b1a ), [royriojas](https://github.com/royriojas), 12/07/2015 01:47:58

    
- **Documentation**
  - Update changelog - [5e995c4]( https://github.com/royriojas/simpless/commit/5e995c4 ), [royriojas](https://github.com/royriojas), 12/07/2015 01:44:18

    
## v2.0.0
- **Documentation**
  - Add some notes about the lack of colored output - [d79bd27]( https://github.com/royriojas/simpless/commit/d79bd27 ), [royriojas](https://github.com/royriojas), 12/07/2015 01:43:39

    
  - Updated demo files - [25e8ebf]( https://github.com/royriojas/simpless/commit/25e8ebf ), [royriojas](https://github.com/royriojas), 12/07/2015 01:37:30

    
- **Features**
  - Add watch mode to simpless - [8fb4ca4]( https://github.com/royriojas/simpless/commit/8fb4ca4 ), [royriojas](https://github.com/royriojas), 12/07/2015 01:41:29

    The watch mode works by setting listeners on:
    
    - the entry file
    - the referenced files (by using `url()` in the css properties) this is
    currently done by using regular expressions, would be nice to changed
    it to use the parsed tree instead.
    - the imported files inside the first one and the ones in any imported
    less file (by using the imports property of the `less.render` method)
    
## v1.0.9
- **Build Scripts Changes**
  - remove demo files from the module - [1f0a40e]( https://github.com/royriojas/simpless/commit/1f0a40e ), [royriojas](https://github.com/royriojas), 09/06/2015 22:27:13

    
## v1.0.8
- **Enhancements**
  - Better error reporting on auto-prefix failure. Fixes [#1](https://github.com/royriojas/simpless/issues/1) - [6ca8864]( https://github.com/royriojas/simpless/commit/6ca8864 ), [royriojas](https://github.com/royriojas), 09/06/2015 19:31:56

    
## v1.0.7
- **Enhancements**
  - Better error reporting on less failure - [5efc53a]( https://github.com/royriojas/simpless/commit/5efc53a ), [royriojas](https://github.com/royriojas), 08/06/2015 02:09:25

    
## v1.0.6
- **Build Scripts Changes**
  - Add changelogx section to package.json - [c74747b]( https://github.com/royriojas/simpless/commit/c74747b ), [royriojas](https://github.com/royriojas), 08/06/2015 01:46:20

    
  - remove unused files in the module - [90e4a9a]( https://github.com/royriojas/simpless/commit/90e4a9a ), [royriojas](https://github.com/royriojas), 08/06/2015 01:42:32

    
## v1.0.5
- **Build Scripts Changes**
  - remove unused files in the module - [eaabd7b]( https://github.com/royriojas/simpless/commit/eaabd7b ), [royriojas](https://github.com/royriojas), 08/06/2015 01:40:45

    
## v1.0.4
- **Build Scripts Changes**
  - ignore IDE autogenerated files from npm package - [dde496c]( https://github.com/royriojas/simpless/commit/dde496c ), [royriojas](https://github.com/royriojas), 08/06/2015 01:37:01

    
## v1.0.3
- **Documentation**
  - Update the Readme with the latest changes - [4fb217a]( https://github.com/royriojas/simpless/commit/4fb217a ), [royriojas](https://github.com/royriojas), 08/06/2015 01:35:43

    
- **Features**
  - Implement the option to add user functions - [d850937]( https://github.com/royriojas/simpless/commit/d850937 ), [royriojas](https://github.com/royriojas), 08/06/2015 01:35:30

    
## v1.0.2
- **Features**
  - Add banner option - [6efe9a8]( https://github.com/royriojas/simpless/commit/6efe9a8 ), [royriojas](https://github.com/royriojas), 07/06/2015 20:56:22

    
## v1.0.1
- **Documentation**
  - Add documentation about simpless module - [792144d]( https://github.com/royriojas/simpless/commit/792144d ), [royriojas](https://github.com/royriojas), 01/06/2015 03:47:19

    
- **Features**
  - First working version - [aa4c19b]( https://github.com/royriojas/simpless/commit/aa4c19b ), [royriojas](https://github.com/royriojas), 29/05/2015 03:31:57

    
- **Other changes**
  - Initial commit - [d25f8a8]( https://github.com/royriojas/simpless/commit/d25f8a8 ), [Roy Riojas](https://github.com/Roy Riojas), 27/05/2015 20:01:05

    
