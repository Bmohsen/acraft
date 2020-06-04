require("dotenv").config()
const fs = require("fs")
const chalk = require("chalk")
/**
 * main Acraft class
 * @param httpPath
 * apache 2 http path 
 * @default "/var/www" Ubuntu
 * @param vhostPath
 * apache 2 vhost file path 
 * @default "/etc/apache2/sites-available/000-default.conf" Ubuntu
 * 
 */
module.exports = class Acraft {
    constructor(httpPath = process.env.HTTP_PATH, vhostPath = process.env.VHOST_PATH) {
        this.httpPath = httpPath
        this.vhostPath = vhostPath
    }
    /**
     * flags logic
     * @param {*} flags 
     */
    executeCraft(flags) {
        /**
        * check for --folder-name and --url flags
        */
        if (flags.folderName == undefined || flags.url == undefined) {
            console.log(chalk.red("please enter the folder name with -f or --folder-name parameter"))
            console.log(chalk.red("please enter the site url with -u or --url"))
            return
        }
        /**
         * Check for --http-path
         */
        if (flags.httpPath == undefined) {
            this.httpPath += flags.folderName
            this.createSite(this.httpPath, flags.url)

        } else {
            this.httpPath = flags.httpPath + flags.folderName
            this.createSite(this.httpPath,flags.url)
        }
    }

    createSite(folderName, url) {
        
    }
}
