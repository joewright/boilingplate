#Requirements

* node 0.10.x
* grunt-cli


###First run

```
npm i
```

###Develop

```
grunt
```
Runs the server, copies js/css/html to output/ and reloads web browser on file changes.

###Distribute
```
grunt build
```
Minify and concatenate js/css/html, resulting files are sent to output/ directory.