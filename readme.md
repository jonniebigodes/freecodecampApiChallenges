# freecodecampApiChallenges



This repository contains the implementation of the api challenges for freecodecamp.
The challenges are the following
  - Timestamp Microservice
  - Request Header Parser Microservice
  - URL Shortener Microservice
  - Image Search Abstraction Layer
  - File Metadata Microservice

# Methodology used
Instead of creating a single repo for each challenge and as i'm familiar with github i condensed the api challenges in one package/repo.
As it's not in direct contradiction of the rules and/or objective.
In terms of development methodology i used the following:
  - /Challenges/
    - This folder contains the logic bits for the challenges that required some extra logic used.
  - /src/
    - this folder contains all the view implementation and also the routing logic used. 
  - /src/components
    - Inside this folder are the components i.e views used for the challenges
  - /dist/
    - This folder contains the release(aka build files).
  - /uploads/
    - This folder contains the placeholder for the File Metadata challenge upload info



### Tech

this set of challenges uses a number of open source projects to work properly:
* [React] - Great Javascript library for Building user interfaces
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework 
* [Webpack] - fast packaging framework for deployment
* [Mongodb] - Best of relational with the innovations of NOSQL
* [Unirest] - Simple http request package
* [Async] - Async pattern package



And of course the implementation of the challenges themselves are open source with a [git-repo-url]
 on GitHub.

### Installation from source

freecodecamp api  requires [Node.js](https://nodejs.org/) v4+ to run.

Download and extract the [latest pre-built release](https://github.com/jonniebigodes/freecodecampApiChallenges/releases).

Install the dependencies and devDependencies and start the server.

```sh
$ cd folder to contain the app
$ npm install 
$ npm start

Open url http://localhost:5000
```


License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   
   [git-repo-url]: <https://github.com/jonniebigodes/freecodecampApiChallenges.git>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [React]: <https://facebook.github.io/react/>
   [Webpack]: <https://webpack.github.io/>
   [Mongodb]: <https://www.mongodb.com/>
   [PlGh]:  <https://github.com/jonniebigodes/freecodecampApiChallenges/tree/master/plugins/github/readme.md>
   [Unirest]: <http://unirest.io/nodejs.html>
   [Async]: <https://github.com/caolan/async>