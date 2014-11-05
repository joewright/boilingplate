#Requirements

* node 0.10.x
* grunt-cli


###First run
Install dependencies
```
npm install
```

###Develop
Run the local server, open your web browser
```
grunt
```
Grunt copies js/css/html to output/ and reloads web browser on file changes.

###Distribute
Minify and concatenate js/css/html
```
grunt build
```
Resulting files are sent to output/ directory.