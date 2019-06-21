[![Build Status](https://travis-ci.com/agseco/ievj.svg?branch=master)](https://travis-ci.com/agseco/ievj)
[![npm version](https://badge.fury.io/js/%40agseco%2Fievj.svg)](https://badge.fury.io/js/%40agseco%2Fievj)

# ievj
Interpolation or replacement of environment variables in a JSON.

## Why

Because this is just what I needed and I could not find a library that did just this - as opposed using a library that does 1192820282 other things and brings other transitive dependencies.

I decided to publish it in case someone else finds it useful.

## How

`npm add @agseco/ievj`

or

`yarn add @agseco/ievj`

And then something like this:

```
const interpolateEnvVars = require('@agseco/ievj');

const myObject = {
  path: '${env.BASE_PATH}/shared/path'
};

process.env.BASE_PATH = '/dev/path';
const interpolated = interpolateEnvVars(myObject);

console.log(interpolated);
```

Result:

```
{ path: '/dev/path/shared/path' }
```

See unit tests for more examples.

## How I use it

In case this is what you are looking for. I'm combining it with:

* [dotenv](https://github.com/motdotla/dotenv) - to automatically populate `process.env`
* [node-config](https://github.com/lorenwest/node-config) - to replace some environment variables in my configuration files
