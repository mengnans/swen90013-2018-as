# Ask Izzy

## Dependencies

If you're working on this codebase, some understanding of the following will
help:

 * Node/npm
 * webpack
 * React
 * jsx (inline templating)
 * babel (es6 transpiler)
 * [flow typesystem](http://flowtype.org)
 * mocha (unit testing)
 * yadda (BDD testing)

## Getting the code

    git clone git@github.com:ask-izzy/ask-izzy.git
    cd ask-izzy
    npm install

## Running the dev server

    ./script/server


## Hacking

Link up the git hooks:

    ln -s ../.githooks .git/hooks

Run the linters:

    ./script/typecheck

Running the tests:

    ./script/test
