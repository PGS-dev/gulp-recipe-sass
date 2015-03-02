'use strict';

module.exports = function ($, config) {
    var _ = $.lodash;
    config.sass = _.defaults(config.sass || {}, {
        style: 'expanded',
        errLogToConsole: true,
        includePaths: [config.paths.app]
    });

    config.tasks = _.defaults(config.tasks || {}, {
        sass: 'sass',
        watchSass: 'watch:sass'
    });

    config.sources.sass = config.sources.sass || [];

    return config;
};