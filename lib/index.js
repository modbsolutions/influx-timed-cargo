/**
 * Generic stats collection service
 * @param options
 */

const microtime = require('microtime');
const _ = require('lodash');
const timedCargo = require('async-timed-cargo');
const influx = require('influx');

var client = influx({
    host : config.get('influx.host'),
    port : config.get('influx.port'), // optional, default 8086
    username : '',
    password : '',
    database : 'hw_stats',
    timePrecision: 'u'
});


var cargo = timedCargo(function(dataPoints, callback) {

    const data = _(dataPoints)
        .groupBy('series')
        .mapValues(function(v) {
            return _.map(v, function(dp) {
                return [dp.values, dp.tags];
            })
        })
        .value();

    client.writeSeries(data, function(err){
        err && console.error('InfluxDB: '+err);
        callback(null, null);
    });

}, 1000, 100); // Every 1000 data points or every 1/10 of a second, whatever comes first


module.writeStats = function(args, done) {

    const dataPoint = {
        series: args.event,
        values: {
            time: microtime.now(),
            count: 1
        },
        tags: {
            tenant: args.account.tenant
            //, account: args.account.name
        }
    };

    cargo.push(dataPoint, done(err, result));
};