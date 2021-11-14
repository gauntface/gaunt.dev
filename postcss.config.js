const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
// const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

/* function themeAssetDirs() {
    const assetDirs = [];

    const root = path.join(__dirname);
    const themeDir = path.join(root, 'themes');
    const files = fs.readdirSync(themeDir);
    for (const f of files) {
        const assetsDir = path.join(themeDir, f, 'assets');
        if (!fs.existsSync(assetsDir)) {
            continue;
        }

        const s = fs.statSync(assetsDir);
        if (!s.isDirectory) {
            continue;
        }

        assetDirs.push(assetsDir);
    }
    return assetDirs;
}*/

function variableFiles() {
    return glob.sync('**/variables/*.css', {
        ignore: ['public/**'],
    });
}

let plugins = [];
if (process.env.HUGO_ENVIRONMENT === 'production') {
    plugins = [
        /*postcssImport({
            path: themeAssetDirs(),
        }),*/
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