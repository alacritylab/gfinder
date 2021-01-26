<p align="center">
  <img src="./.readme/readme_cover.png"/>
</p>

# gFinder

gFinder is a website wich shows the best offers of buckwheet in Ukraine.
To achieve this goal we are searching thru the offers of different stores and,
calculating the price for kilo, showing you best deals for your buck.

Project using in core [NestJS](https://github.com/nestjs/nest) made with ❤️ by [💡AlacrityLab💡](https://www.alacritylab.io).


## Task

- [x] The product shoud be buckwheet, not any other.

- [x] Searching for offers should be done minimum in 3 stores.

- [x] Updating data on page reload.

- [x] Serving using cloud services (Heroku, Azure, etc).

### Additional:

- [x] Using Docker.

- [x] Display all found offers sorted by price

- [x] Implement serching for other products

- [x] Implement serach filters (weight, producent, etc).

### Hardcore:

- [x] Display a chart of prices of buckwheet on a some time period in different stores or overall chart of buckwheet cost.

## Build with
<p align="left"> <a href="https://babeljs.io/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/babeljs/babeljs-icon.svg" alt="babel" width="40" height="40"/> </a> <a href="https://www.gnu.org/software/bash/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/gnu_bash/gnu_bash-icon.svg" alt="bash" width="40" height="40"/> </a> <a href="https://www.chartjs.org" target="_blank"> <img src="https://www.chartjs.org/media/logo-title.svg" alt="chartjs" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://www.docker.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.figma.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://heroku.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> <a href="https://jestjs.io" target="_blank"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/> </a> <a href="https://www.linux.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" alt="linux" width="40" height="40"/> </a> <a href="https://nextjs.org/" target="_blank"> <img src="https://cdn.worldvectorlogo.com/logos/nextjs-3.svg" alt="nextjs" width="40" height="40"/> </a> <a href="https://www.nginx.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg" alt="nginx" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://redis.io" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg" alt="redis" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a><a href="https://nestjs.com/" target="blank">
  <img src="https://nestjs.com/img/logo_text.svg" height="16" alt="Nest Logo" />
</a> </p>

## Design
### All design is done in [Figma](https://www.figma.com/file/lAlaSovXYQLq1yOaV3sYHH/GFinder?node-id=0%3A1)

<p align="center">
  <img src=".readme/readme_design.png"/>
</p>

## Start Guide

### Outside Docker containers
- Create .env file `cp .env.example .env` and replace existing env variables
  (mysql/mariadb connection params)
- Install dependencies `yarn`
- Start the app `yarn start` (app will be exposed through the port 3000)

### Inside Docker containers

Just run already prepared docker-compose:
```bash
$ docker-compose build
$ docker-compose up
```
It will setup the project for you (building the Docker images, starting docker-compose stack).
The NestJS app running in dev mode will be exposed on `http://localhost` (port 80)

For IDE autocompletion to work, run `yarn` on the host machine.

## Test

```bash
# unit tests
$ docker exec -it gfinder-server yarn test

# e2e tests
$ docker exec -it gfinder-server yarn test:e2e

# test coverage
$ docker exec -it gfinder-server yarn test:cov
```

## Environment Configuration

Integrated Configuration Module so you can just inject `ConfigService`
and read all environment variables from `.env` file, which is created automatically by the init script from `.env.example`.

## Documentation

To generate documentation of source code use following npm script:

```bash
#generate documentation
yarn docs
```

and find documentation in folder `./documentation`

## Contact

<p>
<a href="https://alacritylab.io/" target="blank" >
  <img src="https://alacritylab.io/alacritylab-logo-black.svg" height="16" alt="Alacrity Logo"/>
</a>
 or in 
<a href="t.me/@noname_vs" target="blank" >
    Telegram
    <img src="https://telegram.org/img/t_logo.svg" height="16" alt="Telegram logo"/>
</a>
</p>

## LICENSE

This project is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a><a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
  <img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" />
</a>
