# node-influx

An [InfluxDB](http://influxdb.org/) Node.js Client with the ability to batch requests based on timing and/or batch size

<!--[![npm](http://img.shields.io/npm/v/influx.svg?style=flat-square)](https://www.npmjs.org/package/influx)-->
<!--[![build](http://img.shields.io/travis/node-influx/node-influx/master.svg?style=flat-square)](https://travis-ci.org/node-influx/node-influx)-->
<!--[![coverage](http://img.shields.io/coveralls/node-influx/node-influx/master.svg?style=flat-square)](https://coveralls.io/r/node-influx/node-influx?branch=master)-->
<!--[![code climate](http://img.shields.io/codeclimate/github/node-influx/node-influx.svg?style=flat-square)](https://codeclimate.com/github/node-influx/node-influx)-->
<!--[![Dependency Status](https://img.shields.io/david/node-influx/node-influx.svg?style=flat-square)](https://david-dm.org/node-influx/node-influx)-->
<!--[![Github Releases](https://img.shields.io/npm/dm/influx.svg?style=flat-square)](https://github.com/node-influx/node-influx)-->
<!--[![Gitter](https://img.shields.io/gitter/room/node-influx/node-influx.js.svg?maxAge=2592000&style=flat-square)](https://gitter.im/node-influx/node-influx?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)-->



[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Installation

    $ npm install influx-timed-cargo

## Compatibility

Tested with InfluxDB 0.9.x

## Usage

Create a client instance (`database` not required for all methods):

```js
var influx = require('influx-timed-cargo')
var influxTimedCargo = require('influx-timed-cargo')

var client = influxTimedCargo({

  size: 1000,     // size that will trigger the cargo - in data points
  interval: 100,  // interval that will trigger the cargo - in milliseconds
  influx: influx({
      host: 'localhost',
      port: 8086, // optional, default 8086
      protocol: 'http', // optional, default 'http'
      username: 'dbuser',
      password: 'f4ncyp4ass',
      database: 'my_database'
  })
  
});

```

A list of all configuration values can be found below.


You can either pass a single hostname or an array of hostnames. Node-influx uses round-robin balancing to distribute
the requests across all configured hosts. When a host is unreachable, node-influx tries to resubmit the request to another
host and disables the failed host for 60 seconds (timeout value is configurable). If all servers fail to respond, node-influx raises an error.

You can also pass an URL or an array of URLs:

```js
var influx = require('influx')

var client = influx('http://dbuser:f4ncyp4ass@localhost:8060/my_database')
// or
client = influx({
  hosts: ['http://127.0.0.1', 'https://127.0.0.2'],
  username: 'dbuser',
  password: 'f4ncyp4ass',
  database: 'my_database'
 })
```


### Configuration options

| Option        | Description   |
|:------------- |:-------------|
| username      | username |
| password      | password      |
| database | database name |
| host | hostname, e.g. 'localhost' |
| port [optional] |  influxdb port, default: 8086 |
| protocol [optional] |  protocol, default: http |
| hosts [optional] | Array of hosts for cluster configuration, e.g. [ {host: 'localhost', port: 8086},...] Port is optional |
| depreciatedLogging [optional] | logging function for depreciated warnings, defaults to console.log |
| failoverTimeout [optional] |  number of ms node-influx will take a host out of the balancing after a request failed, default: 60000 |
| requestTimeout [optional] | number of ms to wait before a request times out. defaults to 'null' (waits until connection is closed). Use with caution! |
| maxRetries [options] | max number of retries until a request raises an error (e.g. 'no hosts available'), default: 2 |
| timePrecision [optional] |Time precision, default: ms |


## Testing

Either install InfluxDB or use a docker container to run the service:

    docker run -d -p 8083:8083 -p 8086:8086 --expose 8090 --expose 8099 tutum/influxdb:0.13

Then to run the test harness use `npm test`.

## Contributing

If you want to add features, fix bugs or improve `influx-timed-cargo`, please open a pull-request.
Please note, we are following [Javascript Standard Style](https://github.com/feross/standard).
Before opening a PR, your code should pass Standard:

    npm run lint


## License

MIT
