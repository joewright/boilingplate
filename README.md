Minimal grunt setup that provides
* templated HTML using [grunt-includes](https://github.com/vanetix/grunt-includes)
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
|-- output
...
```
You make changes in src, files are copied to and served from output/.

###Distribute
Minify and concatenate js/css/html
```
grunt build
```
Resulting files are sent to output/ directory.