Minimal grunt setup that provides
* templated HTML
* auto reloading of css/js/html
* jshint

##Requirements

* [node 0.10.+](http://nodejs.org/)
* [grunt-cli](https://github.com/gruntjs/grunt-cli)


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

File structure looks like this
```
|-- src
|   |-- site
|   |       |-- index.html
|   |-- js
|   |       |-- script.js
|   |       |-- lib.js
|   |-- css
|   |       |-- style.css
```


###Distribute
Minify and concatenate js/css/html
```
grunt build
```
Resulting files are sent to output/ directory.