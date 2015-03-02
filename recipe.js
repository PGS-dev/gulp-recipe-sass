'use strict';
var path = require('path');

/**
 * Sass files compilation and watcher
 *
 * @param $
 * @param config
 * @param sources
 * @config paths.pipeminTmp destination temp directory
 * @config paths.tmp
 * @sequential preDevBuild Preprocess index file before it hits pipemin
 * @sequential postDevBuild Post-process index before writing to fs
 * @sequential postDevAssets Hook just after dev assets source pipe
 * @returns {*} postDevAssetsSort
 */
module.exports = function ($, config, sources) {
    var _ = $.lodash;

    var sassProcess = $.lazypipe()
        .pipe($.sass, config.sass);

    var sassSource = $.lazypipe()
        .pipe(sources.sass)
        .pipe($.sourcemaps.init)
        .pipe(sassProcess);

    /**
     * Compile all sass files and store in temp directory
     *
     * @task sass
     * @config tasks.sass
     * @config sources.sass sourcess for sass compilation
     * @config paths.tmp temp folder location
     * @sequential devProcessCss runs css processors on compiled sass files
     */
    $.gulp.task(config.tasks.sass, function () {
        var processCssPipe = $.utils.sequentialLazypipe($.utils.getPipes('devProcessCss'));

        return sassSource
            .pipe(processCssPipe)
            .pipe($.sourcemaps.write)
            .pipe($.gulp.dest, config.paths.tmp)();
    });

    /**
     * Runs sass watcher, compile only changed main file or all files when partial is changed
     *
     * @task watch:sass
     * @config tasks.watchSass
     * @deps sass
     */
    $.gulp.task(config.tasks.watchSass, [config.tasks.sass], function () {
        var processCssPipe = $.utils.sequentialLazypipe($.utils.getPipes('devProcessCss'));

        var process = $.lazypipe()
            .pipe($.sourcemaps.init)
            .pipe(sassProcess)
            .pipe(processCssPipe)
            .pipe($.sourcemaps.write)
            .pipe($.gulp.dest, config.paths.tmp);

        $.utils.watchSource(sources.sass, {name: config.tasks.watchSass}, function (vinyl) {
            var filename = path.basename(vinyl.path);
            if(filename.charAt(0) === '_') {
                // run total sass recompilation when partial file is changed
                $.utils.runSubtasks(config.tasks.sass);
            }
            else {
                // run sass compilation only for changed non-partial file
                var stream = $.through2.obj();
                stream.push(vinyl);
                stream.push(null); // end
                stream.pipe(process());
            }
        })();
    });

    return {
        /**
         * @hooks pipes.asset* provide compiled sass files
         */
        pipes: {
            assetSass: sassSource
        },

        watch: config.tasks.watchSass
    };
};