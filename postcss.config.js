const glob = require('glob');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

let plugins = [];

if (process.env.HUGO_ENVIRONMENT === 'production') {
    const varFiles = glob.sync('**/variables/*.css', {
        ignore: ['public/**'],
    });

    plugins = [
        postcssPresetEnv({
            preserve: false,
            importFrom: varFiles,
        }),
        cssnano(),
    ];
}

module.exports = {
    plugins,
}