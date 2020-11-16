# Express Boillerplate RestfullApi With MongoDB
[![Maintainability](https://api.codeclimate.com/v1/badges/fa5c8e5f0ea3bdf82fa6/maintainability)](https://codeclimate.com/github/firmanJS/express-boillerplate-restfullapi/maintainability)
[![made-with-nodejs](https://img.shields.io/badge/Made%20with-Nodejs-1f425f.svg)](https://nodejs.org)
[![made-with-expressjs](https://img.shields.io/badge/Made%20with-Expressjs-1f425f.svg)](https://expressjs.com/)
[![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://github.com/firmanJS)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/firmanJS/express-boillerplate-restfullapi/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/firmanjs/express-boillerplate-restfullapi.svg)](https://github.com/firmanJS/express-boillerplate-restfullapi/releases)
[![Github all releases](https://img.shields.io/github/downloads/firmanjs/express-boillerplate-restfullapi/total.svg)](https://github.com/firmanJS/express-boillerplate-restfullapi/releases)
[![GitHub issues](https://img.shields.io/github/issues/firmanjs/express-boillerplate-restfullapi.svg)](https://gitHub.com/firmanJS/express-boillerplate-restfullapi/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/firmanjs/express-boillerplate-restfullapi.svg)](https://gitHub.com/firmanjs/express-boillerplate-restfullapi/pulls/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Core Stack
- **Node.js** - [http://nodejs.org/](http://nodejs.org/)
- **Express** - [http://expressjs.com/](http://expressjs.com/)
- **Mongo DB** - [https://www.mongodb.com/](https://www.mongodb.com/)
- **Mongoose** - [https://mongoosejs.com/](https://mongoosejs.com/)
- **nodemon** - [https://www.npmjs.com/package/nodemon](https://www.npmjs.com/package/nodemon)
- **pm2** - [https://www.npmjs.com/package/pm2](https://www.npmjs.com/package/pm2)
<!-- - **chai** - [https://www.npmjs.com/package/chai](https://www.npmjs.com/package/chai)
- **chai-http** - [https://mongoosejs.com/](https://mongoosejs.com/)
- **compression** - [https://mongoosejs.com/](https://mongoosejs.com/)
- **dotenv** - [https://mongoosejs.com/](https://mongoosejs.com/)
- **express-validator** - [https://mongoosejs.com/](https://mongoosejs.com/)
- **helmet** - [https://mongoosejs.com/](https://mongoosejs.com/)
- **jsonwebtoken** - [https://mongoosejs.com/](https://mongoosejs.com/)
- **method-override** - [https://mongoosejs.com/](https://mongoosejs.com/)
- **mocha** - [https://mongoosejs.com/](https://mongoosejs.com/)
- **moment** - [https://mongoosejs.com/](https://mongoosejs.com/)
- **mongoose** - [https://mongoosejs.com/](https://mongoosejs.com/)
- **nodemon** - [https://mongoosejs.com/](https://mongoosejs.com/)
- **nyc** - [https://mongoosejs.com/](https://mongoosejs.com/)
- **password-hash** - [https://mongoosejs.com/](https://mongoosejs.com/) -->

## feature

1. authentication with jwt, login, logout, register, blacklist token, logout jwt
1. verifiy route with jwt
1. crud example
1. error handling
1. database use no sql mongodb mongoose
1. testing with mocha and chai
1. coverage use istanbull
1. with docker example
1. validiation, use express-valdator
1. pagination example
1. custom message api response
1. [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

## unit testing
<h1 align=center>
 <img src="https://cldup.com/xFVFxOioAU.svg" alt="Mocha test framework"/>
 <img alt="ChaiJS" width="160px" src="http://chaijs.com/img/chai-logo.png">
</h1>

## How To run

#### copy environment variable

```sh
cp .env-sample .env
```

#### run manualy

```sh
# install package
npm install

#  running app
npm run start

# running unit tetsing
npm run test 
```

#### fill in the copied environment earlier

```sh
APP_PORT=2000
TZ=Asia/Jakarta
MONGO_SERVICE=# uri mongodb
AUTH_SOURCE= #auth service
SECRET_KEY= #jwt secret key here

#Mongodb config
MONGO_PORT=27017
MONGO_INITDB_ROOT_USERNAME= #username
MONGO_INITDB_ROOT_PASSWORD= #password
MONGO_INITDB_DATABASE= #db name
```

#### run with docker-compose

```sh
docker-compose up --build
```

#### or run with background process

```sh
docker-compose up --build -d
```
#### execution npm with container docker
```sh
# install package
docker-compose exec boillerplate npm install

# running unit testing
docker-compose exec boillerplate npm run test
```

## Documentation API 
in file `documentation.json` export to your postman

## Project Structure
```
.
├── config/           * all configuration file here
|   └── db.js         * configuration database
├── controllers/      * all controllers file here
├── helpers/          * all helper or middleware file here
├── models/           * all models schema file here
|   └── attributes    * custom your attribute if line is to long
|   └── function      * custom function mongose schema
├── routes/           * all file route here
|   └── index.js      * register all route
├── test/             * all test file here
|   └── index.js      * test apps

```

## Code Style Guides
* Guideline:
  * Use camelCase for variable name, naming function, load module or other functions
  * Use UpperCase for Constant Variable
  * Use PascalCase for class name, models, controller, route, load module model
  * Use snake_case for file name as variable
  * Function name use Verb
  * Variable name use Noun
