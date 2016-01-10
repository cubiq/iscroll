
#Development notes


## Package

All tasks are described in package.json and running by `npm`.
Task uses only local packages, no global packages required.

#### General task
 - To develop awesomeness `npm start`
 - To test things `npm run test`
 - To build awesomeness `npm run build`

#### Full task list:
 - `npm start` - start dev-server, which build files and watching for changes
 - `npm run build` - build a production build, minified and optimized
 - `npm run analyse` -generate `analyse.json` file for webpack discover tool: http://webpack.github.io/analyse/
 - `npm run test` - run tests
 - `npm run test:watch` - unit tests with watcher (use for develop tests)
 - `npm run test:unit` - unit test itself
 - `npm run test:coverage` - unit tests with coverage

## File structure

#### Folders
 - `src/` -  folder, contain sources
 - `src/libs/` - folder, contains helper libs
 - `src/mixins/` - folder, contains mixins, which extend prototype
 - `src/dev/` - folder, contains dev components
 - `dist/` -  folder, contain build
 - `dist/examples/` - folder, contain html of examples
 - `test/` - folder, contain tests (runners, integration test *in near future*)
 - `coverage/` - autogeneric folder, contains test coverage reports.

#### Files
Each component file have unit test file with `*.spec.js` prefix.

#### Code splitting
 - `src/iscroll.js` - entry point.
 - `src/iscroll.options.js` - default options object
 - `src/iscroll.detects.js` - detects, runs on runtime, extend prototype
 - `src/mixins/EventEmitter.js` - methods for events manipulations (subscribe/unsubscribe/emmit)
 - `src/mixins/EventProcessor.js` - main part for proccess pointer layer events.
 - `src/libs/fps.js` - collection of utilities to work with read/write frame cycle
 - `src/dev/StatePanel.js` - red box, contain readable json with application state.
 - `srv/dev/debug.js` - debug tool (unused yet)


## NPM modules

#### cli modules:
 - `webpack` - build files into package
 - `webpack-dev-server` - watching changes, serve static, hot module replacement
 - `mocha` - test runner and assertion libriary
 - `istanbul`, `isparta` - code coverage tool and es6 wrapper
 
#### dev modules:
 - `debug` - control debug flow 
 - `chai` - assert framework for tests
 - `jsdom` - virtual dom, for cli tests


## HOWTO section

#### How to develop
run `npm start` to starting develop. 
This command runs static server, which watch on all files and reloading data.
Also, server supports brand new **hot module replacement** feature.
This [video shows how it works](https://www.youtube.com/watch?v=hHDS9qn7fiE).

#### How to debug
All source data available in devtoolp -> sources:
![Source maps](https://photos-6.dropbox.com/t/2/AABWkzNljPpOXInfemITMlrNlSTcf8YLlqDEln6dN81Itg/12/9827882/png/32x32/1/_/1/2/sourcemaps.png/EOD3qQcY6IscIAcoBw/1s6XMnPL5a15IbIkS6t4rm5mzZGjq_FPaVJBMF7Agcg?size_mode=5)
All brakpoints, state and other features also works there. ES6 transpiled code debug the same as es5.

#### How to test
Test something better than don't test anything. 
All modules should have tests, even if it works like blackbox.
This is my responsibility zone, but i would be honored to share with you)


## .DOTFILES

Here is a list of files, with descriptions
 - `.babelrc` - contains babel settings
 - `.jscsrc` - *Javascript Code Styles* for keep developers calm and code looks good.
 - `.jshint` - Watch on code quality
 - `.travis.yml` - Options for [Travis](travis-ci.org)


