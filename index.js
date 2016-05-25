const fs = require('fs');
const walk = require('walkdir');
const { basename, join } = require('path');

function collectPackageFiles(rootDir) {
    return new Promise((res, rej) => {
        const walker = walk(rootDir);
        const packages = [];

        const emitter = walk(rootDir);

        emitter.on('file', path => {
            if (basename(path) === 'package.json') packages.push(path);
        });

        emitter.on('end', () => res(packages));
    });
}

function readAllPackages(paths) {
    return paths.map(path => {
        try {
            // Safeguard against malformed package.json's.
            // Found in the test suite of npmconf
            return require(path)
        } catch(err) {
            return false;
        }
    }).filter(path => path);
}

function aggregateAuthors(packages) {
    return packages.reduce((authors, pkg) => {
        if (!pkg.user) return authors;

        const prior = authors[pkg.user.email];
        const pkgName = pkg.packageName;

        authors[pkg.user.email] = prior ? [...prior, pkgName] : [pkgName];
        return authors;
    }, {});
}

function sortAuthorsDesc(authors) {
    return Object.keys(authors).map(author => ({
        author,
        packages: authors[author]
    })).sort((a, b) => b.packages.length - a.packages.length);
}

module.exports = function(rootNodeModules) {
    return collectPackageFiles(rootNodeModules).then(readAllPackages).then(files => {
        const authorList = files.map(file => ({
            user: file._npmUser,
            packageName: file.name
        }));
        
        return sortAuthorsDesc(aggregateAuthors(authorList));
    });
};
