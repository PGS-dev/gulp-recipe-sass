'use strict';

module.exports = function ($, config) {
    var _ = $.lodash;

    $.utils.checkMandatory(config, ['sources.sass']);

    if(_.isUndefined(config.paths.tmp)) {
        config.paths.tmp = 'tmp/';
    }

    if(_.isUndefined(config.paths.app)) {
        config.paths.app = 'app/';
    }

    config.sass = _.defaults(config.sass || {}, {
        style: 'expanded',
        errLogToConsole: true,
        includePaths: [config.paths.app]
    });

    config.tasks = _.defaults(config.tasks || {}, {
        sass: 'sass',
        watchSass: 'watch:sass'
    });

    config.sources = _.pick(config.sources, 'sass');
    return config;
};