# [Sage](https://roots.io/sage/) Fork Starter Project
[![devDependency Status](https://david-dm.org/roots/sage/dev-status.svg)](https://david-dm.org/roots/sage#info=devDependencies)

## To-do

* Include Bootstrap-Select as .js dependency into assets/manifest.json
* Include Slick.js as .js build dependency into assets/manifest.json
* Create hero unit slide template (using Slick.js)

## Developer Quick Start

### Theme Setup

1. If you have not yet done so, setup a [Design-Collective/DCWP](https://github.com/Design-Collective/dcwp) project and remote repo.
2. Install this starter theme:
  * Go to your project's folder `cd myproject`
  * Go to the themes folder: `cd web/app/themes`
  * Clone this starter theme:
    `curl https://github.com/Design-Collective/sage mytheme`
3. Setup versioning of theme folder within main repo:
  * Go to the theme's folder: `cd mytheme`
  * Remove the `.git` folder from the theme: `rm -rf .git`
  * Add the entire theme folder to your repository: `git add .`
4. Set theme name and screenshot:
  * Update the theme name and information in the `style.css`
  * Update the `screenshot.png` file (880px x 660px)
5. Commit your changes: `git commit -am "Added theme"`
6. Push your local repo to the remote repository: `git push origin master`

### Install local dependecies

  * Run `npm install`
  * Run `bower install`

See [Theme development](#theme-development) for more information

### Install local dependecies

Develop your theme with `gulp watch`.
Build with `gulp build`


## Requirements

| Prerequisite    | How to check | How to install
| --------------- | ------------ | ------------- |
| PHP >= 5.4.x    | `php -v`     | [php.net](http://php.net/manual/en/install.php) |
| Node.js 0.12.x  | `node -v`    | [nodejs.org](http://nodejs.org/) |
| gulp >= 3.8.10  | `gulp -v`    | `npm install -g gulp` |
| Bower >= 1.3.12 | `bower -v`   | `npm install -g bower` |

For more installation notes, refer to the [Install gulp and Bower](#install-gulp-and-bower) section in this document.

## Features

Custom features:
* [Responsive-Alignment-for-Bootstrap](https://github.com/calebzahnd/Responsive-Alignment-for-Bootstrap) Responsive align classes for Bootstrap
* [Advanced Custom Fields](http://www.advancedcustomfields.com/resources) (Plugin)
* [Bootstrap-Sass-Official](http://badge.fury.io/bo/bootstrap-sass) (Bower)
* [Bourbon](https://github.com/thoughtbot/bourbon) (Bower) Slim awesome bunch of mixins. For documentation, see [http://bourbon.io/docs/](http://bourbon.io/docs/)
* [Slick](https://github.com/kenwheeler/slick/) (Bower) JS slider
* [Bootstrap-Select](https://github.com/silviomoreto/bootstrap-select) (Bower)

Features inherited from Sage:
* [gulp](http://gulpjs.com/) build script that compiles both Less and Sass, checks for JavaScript errors, optimizes images, and concatenates and minifies files
* [BrowserSync](http://www.browsersync.io/) for keeping multiple browsers and devices synchronized while testing, along with injecting updated CSS and JS into your browser while you're developing
* [Bower](http://bower.io/) for front-end package management
* [asset-builder](https://github.com/austinpray/asset-builder) for the JSON file based asset pipeline
* [Bootstrap](http://getbootstrap.com/)
* [Theme wrapper](https://roots.io/sage/docs/theme-wrapper/)
* [HTML5 Boilerplate](http://html5boilerplate.com/)
  * The latest [jQuery](http://jquery.com/) via Google CDN, with a local fallback
  * The latest [Modernizr](http://modernizr.com/) build for feature detection
* ARIA roles and microformats
* Cleaner HTML output of navigation menus
* Posts use the [hNews](http://microformats.org/wiki/hnews) microformat
* [Multilingual ready](https://roots.io/wpml/) and over 30 available [community translations](https://github.com/roots/sage-translations)

## Important files

* `assets/styles/_variables.scss` Main bootstrap / theme SCSS variables
* `assets/mainfest.json` Use with Manifest Builder
* `functions.php` To add your own PHP script file (under `/lib`)


## Configuration

Edit `lib/config.php` to enable or disable theme features

Edit `lib/init.php` to setup navigation menus, post thumbnail sizes, post formats, and sidebars.

## Theme development

Sage uses [gulp](http://gulpjs.com/) as its build system and [Bower](http://bower.io/) to manage front-end packages.

### Install gulp and Bower

Building the theme requires [node.js](http://nodejs.org/download/). We recommend you update to the latest version of npm: `npm install -g npm@latest`.

From the command line:

1. Install [gulp](http://gulpjs.com) and [Bower](http://bower.io/) globally with `npm install -g gulp bower`
2. Navigate to the theme directory, then run `npm install`
3. Run `bower install`

You now have all the necessary dependencies to run the build process.

### Available gulp commands

* `gulp` — Compile and optimize the files in your assets directory
* `gulp watch` — Compile assets when file changes are made
* `gulp --production` — Compile assets for production (no source maps).

### Using BrowserSync

To use BrowserSync during `gulp watch` you need to update `devUrl` at the bottom of `assets/manifest.json` to reflect your local development hostname.

For example, if your local development URL is `http://project-name.dev` you would update the file to read:
```json
...
  "config": {
    "devUrl": "http://project-name.dev"
  }
...
```
If your local develoment URL looks like `http://localhost:8888/project-name/` you would update the file to read:
```json
...
  "config": {
    "devUrl": "http://localhost:8888/project-name/"
  }
...
```

## Documentation

Sage documentation is available at [https://roots.io/sage/docs/](https://roots.io/sage/docs/).

## Updates to starter theme (core only)

If you plan to merge/update this repo from [Roots/Sage](https://roots.io/sage/), you will need to setup the `upstream` remote in order to merge/update from upstream.

Run the following commands:
  * `git remote add upstream https://github.com/roots/sage`
  * `git fetch upstream`
  Commits to the remote master will be stored in a local branch, upstream/master.
  * Checkout local master branch: `git checkout master`
  * Merge upstream/master branch to sync with upstream: `git merge upstream/master`