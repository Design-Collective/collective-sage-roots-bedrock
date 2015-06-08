#DC Roots Base Template

Wordpress development starter theme based on [roots/bedrock](https://github.com/roots/bedrock) and Bootstrap. Uses [Grunt-Libsass](https://www.npmjs.com/package/grunt-libsass) for ultra-fast parsing (with Compass mixins bautifully supplied by [Compass-Mixins](https://github.com/Igosuki/compass-mixins)) and includes Icomoon webfont.
 
##1. Prepare site directory

Clone this repo

Enter your local development variables (database. A MAMP example has been added to make it easier.

```
$ copy .env.example .env

$ nano .env
```

##2. Install PHP and front-end dependencies
This installs Wordpress and some awesome plugins we've added.

```
$ composer install
```

Then, install the development dependencies into your theme folder.


```
$ cd web/app/themes/mytheme
$ npm install
$ bower install
```

##3. Compile JS and CSS

Run `gulp` for the first time to generate the initial CSS and JS files, or run ```grunt watch```.


##4. Install WP

Set your local apache to yourproject.dev/web

##5. Install WP

Visit the local domain name of you project i.e. yourproject.dev


# [Bedrock](https://roots.io/bedrock/)
[![Build Status](https://travis-ci.org/roots/bedrock.svg)](https://travis-ci.org/roots/bedrock)

Bedrock is a modern WordPress stack that helps you get started with the best development tools and project structure.

Much of the philosophy behind Bedrock is inspired by the [Twelve-Factor App](http://12factor.net/) methodology including the [WordPress specific version](https://roots.io/twelve-factor-wordpress/).

## Features

* Better folder structure
* Dependency management with [Composer](http://getcomposer.org)
* Easy WordPress configuration with environment specific files
* Environment variables with [Dotenv](https://github.com/vlucas/phpdotenv)
* Autoloader for mu-plugins (use regular plugins as mu-plugins)

Use [bedrock-ansible](https://github.com/roots/bedrock-ansible) for additional features:

* Easy development environments with [Vagrant](http://www.vagrantup.com/)
* Easy server provisioning with [Ansible](http://www.ansible.com/) (Ubuntu 14.04, PHP 5.6 or HHVM, MariaDB)
* One-command deploys

## Requirements

* PHP >= 5.4
* Composer - [Install](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx)

## Installation

1. Clone the git repo - `git clone https://github.com/roots/bedrock.git`
2. Run `composer install`
3. Copy `.env.example` to `.env` and update environment variables:
  * `DB_NAME` - Database name
  * `DB_USER` - Database user
  * `DB_PASSWORD` - Database password
  * `DB_HOST` - Database host
  * `WP_ENV` - Set to environment (`development`, `staging`, `production`)
  * `WP_HOME` - Full URL to WordPress home (http://example.com)
  * `WP_SITEURL` - Full URL to WordPress including subdirectory (http://example.com/wp)
4. Add theme(s) in `web/app/themes` as you would for a normal WordPress site.
4. Set your site vhost document root to `/path/to/site/web/` (`/path/to/site/current/web/` if using deploys)
5. Access WP admin at `http://example.com/wp/wp-admin`

## Deploys

There are two methods to deploy Bedrock sites out of the box:

* [bedrock-ansible](https://github.com/roots/bedrock-ansible)
* [bedrock-capistrano](https://github.com/roots/bedrock-capistrano)

Any other deployment method can be used as well with one requirement:

`composer install` must be run as part of the deploy process.

## Documentation

* [Folder structure](https://github.com/roots/bedrock/wiki/Folder-structure)
* [Configuration files](https://github.com/roots/bedrock/wiki/Configuration-files)
* [Environment variables](https://github.com/roots/bedrock/wiki/Environment-variables)
* [Composer](https://github.com/roots/bedrock/wiki/Composer)
* [wp-cron](https://github.com/roots/bedrock/wiki/wp-cron)
* [mu-plugins autoloader](https://github.com/roots/bedrock/wiki/mu-plugins-autoloader)

## Contributing

Contributions are welcome from everyone. We have [contributing guidelines](CONTRIBUTING.md) to help you get started.

## Community

Keep track of development and community news.

* Participate on the [Roots Discourse](https://discourse.roots.io/)
* Follow [@rootswp on Twitter](https://twitter.com/rootswp)
* Read and subscribe to the [Roots Blog](https://roots.io/blog/)
* Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
