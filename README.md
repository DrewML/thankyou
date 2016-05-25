# Thank You!

If you're using [npm](https://www.npmjs.com/), then you're definitely building a project using the collective effort of a very large community. Why not thank some of the individuals that have helped your project the most!

This small CLI application will walk a projects entire `node_modules` directory, finding every `package.json` file along the way (including transitive dependencies). The names of each author, and the packages you depend on of theirs, will be printed at the end.

## Install

```shell
npm install -g thankyou
```

## Usage

1. Navigate to the root directory of a project (_not_ the `node_modules` directory).
2. Verify all packages have been installed (run `npm i` if you're not sure).
3. Run `thankyou`

## Options

Run `thankyou` with the `-e` or `--extended` flags to see a list of each module that an author has provided.

## Example

This is the output when you run `thankyou -e` on this project

```
$ thankyou -e
sindresorhus (sindresorhus@gmail.com): 10
    ansi-regex
    ansi-styles
    cli-cursor
    cli-spinners
    exit-hook
    has-ansi
    onetime
    ora
    restore-cursor
    supports-color
jbnicolai (jappelman@xebia.com): 2
    escape-string-regexp
    strip-ansi
qix (i.am.qix@gmail.com): 1
    chalk
substack (substack@gmail.com): 1
    minimist
spicyj (ben@benalpert.com): 1
    object-assign
soldair (soldair@gmail.com): 1
    walkdir
```

Many thanks to those people for making this tool so quick and easy to spin up.
