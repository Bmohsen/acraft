const path = require('path')
const fs = require("fs")
const {exec} = require("child_process")
const chalk = require("chalk")
const appDir = path.dirname(require.main.filename)
require("dotenv").config({path: appDir + '/.env'})

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
    constructor(httpPath = process.env.HTTP_PATH, vhostPath = process.env.VHOST_PATH , hosts = process.env.HOSTS) {
        this.httpPath = httpPath
        this.vhostPath = vhostPath
        this.hosts = hosts
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
         * check for hosts flag
         */
        if (flags.changeHosts != undefined) {
            this.hosts = flags.changeHosts
        }
        /**
         * Check for --http-path
         */
        if (flags.httpPath == undefined) {
            this.httpPath += flags.folderName
            
            this.createSite(this.httpPath, flags.url)

        } else {
            this.httpPath = flags.httpPath + flags.folderName
            this.createSite(this.httpPath, flags.url)
        }
    }

    createSite(folderName, url) {
        try {
            if (!fs.existsSync(folderName)) {
                console.log(chalk.greenBright("creating directory : " + folderName))
                fs.mkdirSync(folderName)

                const config = `
<VirtualHost *:80>
ServerName ${url}
DocumentRoot ${folderName}
ErrorLog \${APACHE_LOG_DIR}/error.log
CustomLog \${APACHE_LOG_DIR}/access.log combined
<Directory ${folderName}/>
Options Indexes FollowSymLinks
AllowOverride All
Require all granted
</Directory>
</VirtualHost> \n
                `
                const hostsConfig = `\n127.0.0.1   ${url}`
                fs.appendFileSync(this.vhostPath,config)
                console.log(chalk.greenBright("writing apache config..."))
                fs.appendFileSync(this.hosts,hostsConfig)
                console.log(chalk.greenBright("Editing hosts file..."))


                console.log(chalk.greenBright("changing folder permission..."))
                exec("sudo chown -R $USER " + folderName,(error,stdout,stderr) => {
                    if (error) {
                        console.log(chalk.red(`error ${error.message}`))
                    }
                    if (stderr) {
                        console.log(chalk.redBright(`error ${error.message}`))
                        return
                    }
                    console.log(chalk.greenBright(stdout))
                })


                console.log(chalk.greenBright("restarting apache 2 service..."))
                exec("sudo systemctl restart apache2",(error,stdout,stderr) => {
                    if (error) {
                        console.log(chalk.red(`error ${error.message}`))
                    }
                    if (stderr) {
                        console.log(chalk.redBright(`error ${error.message}`))
                        return
                    }
                    console.log(chalk.greenBright(stdout))
                })
                console.log(chalk.greenBright("All good! go make somthing amazing :)"))


            } else {
                console.log(chalk.yellow("Directory already Exist! try a diffrent name for directory"))
                return
            }

        } catch (error) {
            console.log(chalk.red(error))
        }
    }
}
