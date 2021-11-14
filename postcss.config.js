const glob = require('glob');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

function variableFiles() {
    return glob.sync('**/variables/*.css', {
        ignore: ['public/**'],
    });
}

let plugins = [];
if (process.env.HUGO_ENVIRONMENT === 'production') {
    plugins = [
        postcssPresetEnv({
            preserve: false,
            importFrom: variableFiles(),
        }),
        cssnano(),
    ];
}
module.exports = {
    plugins,
  }