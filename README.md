every time i wanted to create new project when using apache as my server i had to do all things manually like creating site folder , editing apache virtual host config and hosts file and then restart apache service , acraft will do this for you and save time.
# Acraft
create apache site (virtual host) with command line    
help command:
```sh
$ Acraft -h
```

# install
```sh
$ npm i acraft
```
then link the package for shell to use with npm link(you may need to use sudo):
```sh
$ npm link acraft
```
# example

```sh
$ sudo acraft --folder-name mysite --url mysite.local
```

### options
hint: [value] is optional , <value> is required
```
Options:
  -f, --folder-name <value>   site folder name
  -u, --url <value>           vhost url (example.local , test.com and etc ...)
  -c, --change-hosts [value]  change the hosts path (you can change it in .env)
  -p, --http-path [value]     www path to create folder (end with slash / or backslash \ ex : home/www/)
  -f, --vhost-path [value]    path of apache 2 virtual host config file
  -h, --help                  display help for command
  ```
  you can change default http path , vhost path and hosts file in .env file
