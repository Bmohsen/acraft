#!/usr/bin/node
const fs = require('fs')
const { Command } = require('commander')
const chalk = require("chalk")
const Acraft = require("./includes/Acraft")


const program = new Command()
const app = new Acraft()

/**
 * get the flags from command line and parse it
 */
program
  .option("-f, --folder-name <value>", "site folder name")
  .option("-u, --url <value>", "vhost url (example.local , test.com and etc ...)")
  .option("-c, --change-hosts [value]","change the hosts path (you can change it in .env)")
  .option("-p, --http-path [value]", "www path to create folder (end with slash / or backslash \\ ex : home/www/)")
  .option("-f, --vhost-path [value]", "path of apache 2 virtual host config file")
  .parse(process.argv);



app.executeCraft(program)
