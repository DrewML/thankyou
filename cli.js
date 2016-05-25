#!/usr/bin/env node

const ora = require('ora');
const minimist = require('minimist');
const { join } = require('path');
const { cyan, yellow, bold } = require('chalk');
const getContributors = require('./');

const modulesFolder = join(process.cwd(), 'node_modules');
const argv = minimist(process.argv);
const isExtended = !!['extended', 'e'].find(flag => argv[flag]);

const spinner = ora('Crawling node_modules').start();
getContributors(modulesFolder).then(authors => {
    spinner.stop();
    if (isExtended) printExtended(authors);
    else printMinimal(authors);
}).catch(err => {
    spinner.stop();
    console.error(err);
    process.exit(1);
});

function printMinimal(authors) {
    authors.forEach(({ author, packages }) => {
        const packageCount = packages.length;
        console.log(`${prettyName(author)}: ${prettyCount(packageCount)}`);
    });
}

function printExtended(authors) {
    authors.forEach(({ author, packages }) => {
        const packageCount = packages.length;
        const packagesList = packages.map(pkg => `\t${pkg}`).join('\n');
        console.log(`${prettyName(author)}: ${prettyCount(packageCount)}`);
        console.log(packagesList);
    });
}

function prettyName(author) {
    return bold(cyan(author));
}

function prettyCount(count) {
    return yellow(count);
}
