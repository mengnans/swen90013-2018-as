# Ask Izzy

## SWEN90013 QUICKSTART

### Docker All-Inclusive Package

Please install [Docker Desktop](https://www.docker.com/products/docker-desktop). 
Clone the project from Bitbucket or use your existing repo; make sure to have an up-to-date repo.
Use the Makefile to build,

>make build

lint,
>make lint

and e.g. unit-test

>make unit-test

the project. 
You can change the ISS_URL or FEEDBACK_URL at the top of the Makefile.

This setup doesn't launch the mock ISS server and the Docker container has to be rebuilt and run upon code changes. 
It's a Work In Progress.

For questions/issues regarding Docker please consult with the [Docker documentation](https://docs.docker.com/) or Ferdinand.

Remaining bugs:
- the main stylesheet is not applied until it is edited in the style editor of your browser
- building an image probably takes longer than convenient
- the nodejs packages are downloaded over an insecure link
- you tell me ;)


### Windows Preparation

In order to get the project running you will need to install [Node.js](https://nodejs.org/en/).

For windows, you will need to install [Cygwin](https://cygwin.com/install.html).

__Note:__ During installation, you need to select the option to install the wget package (Search 'wget', choose 'Web', single click 'Skip'), you will also need to select dos2unix package (Search 'dos2unix').

You will need to the Cygwin terminal to run the project. Next, we git clone the repository (development branch) inside C:\cygwin64\home\<username>\year-long-project

Now you will now need to install `nodemon` and `windows-build-tools` like follows:

First open Cygwin as an administrator (right click top open it as administrator). Then run the following commands:

```bash
$ npm install -g nodemon
$ npm install -g windows-build-tools
```

Finally, you need to convert the script files from the windows format line-break format to the unix line-break format
(this won't affect the repository as line-breaks are merged automatically).

You need to run this command from the __root directory of this project__.

```bash
$ cd C:\cygwin64\home\<username>\year-long-project\ # or wherever you cloned the project
$ dos2unix ./script/*
```

See the [Project Installation](#markdown-header-project-installation) section below to continue.

### OSX Preparation

In order to get the project running you will need to install [Node.js](https://nodejs.org/en/).

You will need to install `gnu-sed` like follows (skip if using cygwin/msys/git-bash or linux):

The gnu-sed installation command required homebrew. If you don't have homebrew, you can install it [here](https://brew.sh/)

```bash
$ brew install gnu-sed
```

See the [Project Installation](#markdown-header-project-installation) section below to continue.

### Project Installation

Once you've followed the above preparation, you will also need to install [Bower](https://bower.io/#install-bower). You
can install it using npm like this:

```bash
$ npm install -g bower
```

After you've cloned __this__ repo locally, you can begin to install
the local dependencies for the project like so (run these commands from the root directory of this project):

```bash
$ npm install
$ bower install
```

### Running

For the sake of brevity, I have created a script that launches the project locally with a single command.
To run, issue this command from the __root directory of this project__.

```bash
$ ./script/launch
```

Congratulations, check [http://localhost:8000](http://localhost:8000).

My fear that this is an outdated version of the repository was indeed confirmed.
The layout is quite different from the version of AskIzzy that is running on
the production site.

## Dependencies

[![Dependency Status](https://gemnasium.com/badges/b91820f574d095d55ce62975008f0151.svg)](https://gemnasium.com/8f187dc904fea1417227ff718eb4200d)

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
    bower install

## Running the dev server

You will need API keys for [ISS](https://api.serviceseeker.com.au/) and
Google.

    ISS_URL=... GOOGLE_API_KEY=... ./script/dev-server

## Dealing with HTTP and browsers

Ask Izzy is a fully static site in production 
(see `conf/nginx.conf` for the rewrite rules that make this 
work - there is duplicated logic from `routes.js`).

Pages which do not require ISS data are pre-generated and generally work 
without javascript. 
See `HtmlDocument.js`, `server/render-static.js` (prod) and `server/render.js` (dev).

Once the page JS loads:

 * React attaches the react-router component to the document
 * react-router looks at the page url to decide which components to render (see `routes.js`)
 * component 'mount' hooks fire and start fetching data from ISS
 * components build a model of the DOM they expect (in `render`)
 * the page is updated with any differences between the expected DOM and actual DOM (usually none)
 * once any async data arrives from ISS, the page is updated again

## Ask Izzy Routes


Here are the explicit paths that AskIzzy supports:

````
/service/<service-id>
/service/<service-id>/

/search/<search-term>
/search/<search-term>/
/search/<search-term>/<personalise-path>
/search/<search-term>/<suburb>-<state>
/search/<search-term>/<suburb>-<state>/
/search/<search-term>/<suburb>-<state>/<personalise-path>
/search/<search-term>/in/<suburb>-<state>
/search/<search-term>/in/<suburb>-<state>/

/category/<category-name>
/category/<category-name>/
/category/<category-name>/in/<suburb>-<state>
/category/<category-name>/in/<suburb>-<state>/

/<category-name>
/<category-name>/
/<category-name>/<suburb>-<state>
/<category-name>/<suburb>-<state>/
/<category-name>/<suburb>-<state>/<personalise-path>
/<category-name>/<personalise-path>

/<static-pages>
/<static-pages>/
````

Examples for routes terms are given below:

````
<service-id> e.g. 820532-infoxchange
<personalise-path> e.g. personalise/, personalise/summary, personalise/page/location
<category-name> e.g. housing, food, money-help
<suburb> e.g. Melbourne, Richmond, Run-O-Waters
<state> e.g. VIC, NSW, Victoria
<static-pages> e.g. about, homeless-shelters
````

Note: Ask Izzy categories or static pages must NEVER be named "search", "static", "session", "service", "category" or "in".

### Building HTML pages
See `server/render-static.js`

### Building JS and CSS

Ask Izzy uses Webpack to organize building JS / CSS.

Webpack configuration is very powerful but unfortunately quite complex.
The current configuration compiles javascript files using babel (for JSX and flow) and CSS files using sass,
then writes the result to `public/static/main_<MD5>.<css|js>`. 
The file `server/webpack-stats.json` is also generated, so that our code can find the
path to the files.

By convention, we have one SCSS and one JS file per react component.
Each component renders an element with a `class` equal to the name of the component.
This class is used in the SCSS file to avoid rules applying to the wrong component.
`script/generate-component-index` is required to be manually run each time you introduce a new react component.

## Javascript features

The babel compiler and polyfill allows us to use advanced features 
which are not yet available in all browsers.

### Promises, async and await

We've used `async` and `await` extensively in Ask Izzy.
Under the hood these are syntactic sugar for promises 
(which are well documented online).

Any function defined as `async function foo()` will
have its return value converted to a promise (any 
exception will result in a promise error and the 
result is the promise result).

Within an `async function`, you can use `[my variable] = await [a promise]`
which will pause the function until the given promise
resolves to a value or an error. If it's a value it's 
returned, if the promise has an error an exception is 
raised.

Promises are part of the JS standard and are supported
natively in every browser except IE (where they are polyfilled),
but async and await are not yet standardized (see 
https://github.com/tc39/ecmascript-asyncawait 
for the in-progress standard)

## Type system (flowtype)

Flow is configured using the `.flowconfig` file.

All JS files in the repo either start with 
`/* @flow */` if they are typechecked 
or `/* flow:disable */` if they are not.

You can run flow on its own using `./node_modules/.bin/flow`.
It's also run as part of the precommit hooks and in CI.

Libraries which aren't part of the code have type definitions 
in the `interfaces` directory.

## Search query generation

When a `ResultsPage` is added to the page, it builds a query
by calling `issParams` which iterates through 
`personalisationComponents` (inherited from `BaseCategoriesPage`)
and calls `getSearch` to build up a search object which is 
passed to `search` in `iss.js`.

For category pages, `BaseCategoriesPage` checks `constants/categories.js`
to get the list of personalisation components.

If any personalisation component has not been answered, it
will return `null` from `getSearch`, and the `ResultsPage`
will redirect to the personalisation page to answer the question.

The whole personalisation space is a twisty mess of side effects
and inheritance. Changes which fit into the existing model are 
super easy but I would be very careful testing any changes to
the control code.

The question classes mostly derive from `BaseQuestion` or `BaseMultiQuestion`.

## Google services

### Analytics
All google analytics events are sent by calling the `push` method in `google-tag-manager.js`.

### Maps

We use the react-google-maps component to handle the maps integration.

The `removeOutliers` method in `ResultsMap.js` was implemented 
because results sometimes include e.g. a hotline which is headquartered
hundreds of km away. `removeOutliers` is reasonably well commented and 
tested (see `ResultsMapTest.js`) but it is quite complex.

### Directions / travel times

We use the google directions matrix API to fetch transit / walking times.
See `maps.js` for the implementation, called from `iss.js`

### Places autocomplete

We use the google places API to autocomplete place names. 
See `locationSuggestions.js` for implementation.

This approach means that we frequently have bugs where a location
is known to google but not ISS. The obvious fix would be to use ISS 
as the source of location autocomplete data.

## Outstanding issues

See confluence and JIRA

## Tests
All tests live in the `test` toplevel directory.

Unit tests live in `test/unit` and are invoked from `test/unit.js`. They use `mocha`.
BDD features live in `test/features` with step definitions in `test/steps` invoked from `test/feature.js`. They use `yadda`.
Maps features live in `test/maps` with step definitions in `test/steps` invoked from `test/maps.js`. They use `yadda`.
Personalisation features live in `test/personalisation` with step definitions in `test/steps` invoked from `test/personlisation.js`. They use `yadda`.
Search features live in `test/search` with step definitions in `test/search-steps` invoked from `test/search.js`. They use `yadda`.

### Adding new icons

 * Add your icon to https://github.com/ask-izzy/designs
 * Clone the designs repo. e.g. `git clone https://github.com/ask-izzy/designs.git ~/git/designs`
 * The Iconify script requires babel, install by running `sudo npm install -g babel-cli`
 * Run `.script/iconify <path_to_cloned_designs_repo>`. e.g. `./script/iconify ~/git/designs/icons/*.svg`

The icons/index.js file will be updated, and a new js file for the icon will be generated in /icons.

## Contributing

Link up the git hooks:

    ln -s ../.githooks .git/hooks

Add the git merge strategies to `.git/config`:

    [include]
        path = ../.gitmerge/strategies

Run the linters:

    ./script/typecheck

Running the tests:

    ./script/unit-test
    ./script/feature-test
    ./script/personalisation-test
    ./script/search-test

Pass `SELENIUM_BROWSER=firefox|phantomjs|chrome` to choose a 
browser to run the feature tests with (default is firefox)

You can pass `BROWSER_LOGS=yes` to dump logs from the browser. Be aware not
all browsers support this.

If you have issues running tests on Ubuntu, follow the steps here:
https://christopher.su/2015/selenium-chromedriver-ubuntu/

Then use Chrome as the selenium browser to run the tests.

If you're using a virtual machine open a terminal in the VM to run them.

## Attribution

Bits of the repo setup were based on
https://github.com/gpbl/isomorphic500 @ 413c6533ae23
under the MIT licence
