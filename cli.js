#!/usr/bin/env node

import minimist from 'minimist';
import process from 'process';
import moment from 'moment-timezone'


const timezone = moment.tz.guess();


var args = minimist(process.argv.slice(2), {
    boolean: "h",
    integer: "n",
    integer: "s",
    integer: "e",
    integer: "w",
    string: "z",
    integer: "d",
    boolean: "j",
    default: {
        h: false,
        n: null,
        s: null,
        e: null,
        w: null,
        d: null,
        z: null
    }, 
});

console.log(args);

if (args.h) {
    console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE");
    console.log("    -h            Show this help message and exit.");
    console.log("    -n, -s        Latitude: N positive; S negative.");
    console.log("    -e, -w        Longitude: E positive; W negative.");
    console.log("    -z            Time zone: uses tz.guess() from moment-timezone by default.");
    console.log("    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.");
    console.log("    -j            Echo pretty JSON from open-meteo API and exit.");
    process.exit(0)
}

