Backbone-Stories
================

Backbone Stories App - Backend python bottle



Getting Started
---------------

- Git must be available

- Nodejs must be available

- Install grunt with: `$ sudo npm install -g grunt-cli`

Then:

```
$ npm install
$ bower install
$ grunt serve
```

Project environment profiles
----------------------------

There are 3 supported profiles: `dev`, `localdev` and `prod`.

`dev` is used for front end development.

`localdev` is used for backend development.

`prod` is used for production environment.


By default, 'dev' env profile is configured.

To configure other environment, copy `stories/conf.tpl.js` to `stories/conf.js` (conf.js is
ignored by git and edit env there).
