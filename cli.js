#!/usr/bin/env node

const minimist = require('minimist');



var args = minimist(process.argv.slice(2), {
    boolean: "h",
    default: {h: false}, 
});

console.log(args.h);