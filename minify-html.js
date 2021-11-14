const { minify } = require('html-minifier-terser');
const glob = require('glob');
const path = require('path');
const fs = require('fs/promises');
const os = require("os");

class PromisePool {
    constructor(tasks, concurrency) {
        this.tasks = tasks;
        this.inProgressTasks = 0;
        this.concurrency = concurrency < 1 ? 1 : concurrency;
    }

    runNext() {
        return this.inProgressTasks < this.concurrency && this.tasks.length > 0;
    }

    run() {
        while (this.tasks.length > 0 && this.inProgressTasks < this.concurrency) {
            console.log(`Starting new task, ${this.tasks.length} remaining...`);
            this.inProgressTasks++;
            const t = this.tasks.shift();
            const p = t();
            p.then(() => {
                this.inProgressTasks--;
                this.run();
            })
        }
    }
}

function minifyTask(f) {
    return async function() {
        console.log(`    Minifying ${f}`);
        const b = await fs.readFile(f);
        const mh = await minify(b.toString(), {
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            html5: true,
            removeScriptTypeAttributes: true,
            sortAttributes: true,
            sortClassName: true,
            useShortDoctype: true
        });
        await fs.writeFile(f, mh);
    }
}

async function run() {
    const files = glob.sync(path.join(__dirname, "public/**/*.html"), {
        absolute: true,
    });

    const tasks = [];
    for (const f of files) {
        tasks.push(minifyTask(f))
    }

    const cpuData = os.cpus();
    const pool = new PromisePool(tasks, cpuData.length - 1);
    await pool.run();
}

run();