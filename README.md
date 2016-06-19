# [halfstaff](https://halfstaff.co)

Is the flag at half staff?  [Half Staff](https://halfstaff.co) displays the current US flag status in a clean, simple format and allows for browsing past flag notices.

[![Build Status](https://travis-ci.org/jacobwgillespie/halfstaff.svg?branch=master)](https://travis-ci.org/jacobwgillespie/halfstaff)
[![Dependency Status](https://david-dm.org/jacobwgillespie/halfstaff.svg)](https://david-dm.org/jacobwgillespie/halfstaff)
[![devDependency Status](https://david-dm.org/jacobwgillespie/halfstaff/dev-status.svg)](https://david-dm.org/jacobwgillespie/halfstaff#info=devDependencies)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jacobwgillespie/halfstaff/blob/master/LICENSE)

Table of Contents
-----------------

  * [Architecture](#architecture)
  * [Requirements](#requirements)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [License](#license)

Architecture
------------

Half Staff scrapes the contents of [Presidential Proclamations](https://www.whitehouse.gov/briefing-room/presidential-actions/proclamations) looking for presidential orders to fly the American flag at half-staff.  Those proclamations are then processed to understand duration and details surrounding the flag lowering, and all the information is saved into JSON files.  Those JSON files are then transformed into static HTML files with [`ect`](http://ectjs.com/) templates, processed with [`gulp`](http://gulpjs.com/), and then deployed to [GitHub Pages](https://pages.github.com/).  [CloudFlare](https://www.cloudflare.com) operates as a CDN and provides SSL for the final site.

The website is automatically updated and rebuild with Travis CI on any changes.

The project directory structure is as follows:

* `app` - application files that will end up being web-accessible.
  - `generatedPages` - this directory is ignored by `git` and is the destination for the initial HTML pages generated from the JSON data.
  - `images` - images and icons used to build things like the favicon.
  - `scripts` - application JavaScript, mainly used to set up the ServiceWorker for offline access.
  - `styles` - CSS, written in SCSS and transpiled by gulp.
  - `templates` - the ect templates, used to transform the JSON data into HTML pages.
* `data` - JSON data storage.
  - `potus` - this directory contains JSON files that each relate to an individual flag proclamation, used for individual proclamation pages and historical records.
  - `potus.json` - this is a git-ignored temporary file containing all the recently-fetched flag proclamations before they are processed and stored in `data/potus`.
  - `recent.json` - a JSON array of recent proclamations, used to build the recent list on the homepage.
* `support` - support scripts used to fetch data, build HTML, and deploy the website.
  - `build-data.js` - processes recent proclamations for meaningful content.
  - `build-pages.js` - builds HTML pages from `data/potus`.
  - `deploy.sh` - deploys the website to GitHub pages for the main site and the CDN.
  - `fetch-potus.js` - fetches recent proclamations from WhiteHouse.gov

The various scripts can be run via `npm`:

`npm run [script]` | description
------------ | -----------
`fetch-potus` | fetches the recent flag proclamations
`build-data` | processes the recent flag proclamations and stores them in `data/potus`
`build-pages` | builds the initial HTML structure from `data/potus` and stores the files in `app/generatedPages`
`build-site` | processes all the `app` files with gulp, compiling CSS, JS, and images, adding asset hashes for long-term caching, and building the ServiceWorker configuration.

The JSON data files in `data/potus` are checked into the repository because they need to be retained for historical URLs, i.e. as more presidential proclamations are issued, they will no longer be automatically fetched, hence why they are saved in the repository itself rather than re-calculated on each site build.

Requirements
------------

Half Staff requires the following to run:

  * Node.js 4+
  * npm (normally comes with Node.js)

Usage
-----

First, install the dependencies:

```sh
npm install
```

Next, fetch the most recent presidential proclamations:

```sh
npm run fetch-potus
```

Next, build the new data:

```sh
npm run build-data
```

Next, regenerate the HTML pages:

```sh
npm run build-pages
```

Next, prepare the final site distribution:

```sh
npm run build-site
```

The final site will be located in `dist`.

Typically, `build-pages`, `build-site`, and `./support/deploy.sh` are run by the CI.

Contributing
------------

Your contributions are welcome!  Feel free to open an issue or pull request.

License
-------

Half Staff is licensed under the [MIT](https://github.com/jacobwgillespie/halfstaff/blob/master/LICENSE) license.  
Copyright &copy; 2016, Jacob Gillespie
