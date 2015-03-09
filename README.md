# [gulp-recipe](https://github.com/PGS-dev/gulp-recipe-loader)-sass [![Dependency Status][depstat-image]][depstat-url]
[![NPM][npm-image]][npm-url]

Recipe for sass files compilation and css transforms application.

## Task
### sass

Compile all sass files into temp folder.

### watch:sass
> deps: 'sass'

Watch for changes on all sass files and compile them.
Source file change trigger recompilation of only that changed file.
Partial file change triggers full project recompilation.

## Configuration
### Recipe specific
#### config.sass
> default:
``` javascript
{
    style: 'expanded',
    errLogToConsole: true,
    includePaths: [config.paths.app]
}
```

Configure sass task

### Paths
#### paths.app
> default: 'app/'

Default sass include path.

### Tasks
#### tasks.sass
> default: 'sass'

_sass_ task name.

#### tasks.watchSass
> default: 'watch:sass'

_watch:sass_ task name.

## Api
### Provided Hooks
#### pipes.devProcessCss*
> type: sequence

Process css files, the sass compiler output.

### Used Hooks
#### pipes.assetSass

Provide compiled sass files into build as assets.

[npm-url]: https://npmjs.org/package/gulp-recipe-sass
[npm-image]: https://nodei.co/npm/gulp-recipe-sass.png?downloads=true
[depstat-url]: https://david-dm.org/PGS-dev/gulp-recipe-sass
[depstat-image]: https://img.shields.io/david/PGS-dev/gulp-recipe-sass.svg?style=flat