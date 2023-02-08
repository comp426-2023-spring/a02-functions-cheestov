#!/usr/bin/env node

import minimist from 'minimist';
import process from 'process';
import moment from 'moment-timezone'


const timezone = moment.tz.guess();

var lattitude = 0;
var longitude = 0;

console.log(timezone);

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
        d: 1,
        z: null
    }, 
});

console.log(args);
if (args.d > 6 || args.d < 0) {
    console.log("ERROR: Day option -d must be 0-6.");
    process.exit(1);
}

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


if (args.n == null) {
    if (args.s != null) {
        lattitude = args.s * -1;
    }
} else if (args.s != null) {
    console.log("ERROR: cannot specify LATTITUDE twice.");
    process.exit(1);
} else {
    lattitude = args.n;
}

if (args.e == null) {
    if (args.w != null) {
        longitude = args.w * -1;
    }
} else if (args.w != null) {
    console.log("ERROR: cannot specify LONGITUDE twice.");
    process.exit(1);
} else {
    lattitude = args.e;
}

if (args.z != null) {
    timezone = args.z;
}

const country = timezone.substring(0, timezone.indexOf("/"));
const city = timezone.substring(timezone.indexOf('/') + 1, timezone.length);
console.log(country + '/' + city);

const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lattitude + '&longitude=' + longitude + '&hourly=temperature_2m,weathercode,windspeed_10m,winddirection_10m&daily=weathercode,precipitation_hours&temperature_unit=fahrenheit&timezone=' + country + '%2F' + city);

//https://api.open-meteo.com/v1/forecast?latitude=79.52&longitude=13.41&hourly=temperature_2m,weathercode,windspeed_10m,winddirection_10m&daily=weathercode,precipitation_hours&temperature_unit=fahrenheit&timezone=America%2FNew_York

const data = await response.json();


if (args.j == true) {
    console.log(data);
    process.exit(0);
}



const days = args.d 


if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}