# Express Boillerplate RestfullApi With MongoDB
[![Maintainability](https://api.codeclimate.com/v1/badges/fa5c8e5f0ea3bdf82fa6/maintainability)](https://codeclimate.com/github/firmanJS/express-boillerplate-restfullapi/maintainability)

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
## Project Structure
```
.
├── config/           * all configuration file here
|   ├── db.js         * configuration database
|   └── route.js      * register all route
├── controllers/      * all controllers file here
├── helpers/          * all helper or middleware file here
├── models/           * all models schema file here
|   └── attributes    * custom your attribute if line is to long
|   └── function      * custom function mongose schema
├── routes/           * all file route here
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
