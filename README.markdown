Minit – the Montage Initializer
===============================

Minit helps you build a [Montage](http://montagejs.org/) application by creating template applications for you.

Usage
-----

Run `minit` with your chosen template inside the directory you wish to create the template in. Templates such as "component" will search for a `package.json` and place their generated files in the correct directory underneath it, in this case `ui/`

Run `./minit --help` for details of the templates available and their usages. The templates are defined in the [templates directory](https://github.com/Stuk/minit/tree/master/templates).

Example
-------

```bash
$ minit component user
user.reel created.
Template expansion successful!
$ ls ui/user.reel/
user.css   user.html  user.js
```
