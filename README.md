# Musala Jobs App

Musala Jobs is a Platform for project management. The main mission of this platform is to manage projects in a clean and simple way. Just by entering a name and description You can manage your projects, from the "dashboard/profile" screen only with a name, description and type of project you will be ready to publish your project.

As a user you can “Ask” a project and you can manage the projects you are working on in the "Worked On" tab on the same "dashboard/profile" screen and update the completed tasks in it. 
The system will receive new customers with a landing page with our plans and a project finder that will list the projects to users, to access the most detailed information of the projects must be registered in our system.

Only projects that don't have any users working will be available.
To speed up adoption and simplify user registration on the system, we've added sign-up/login functionality with a Google account. 

At startup the system will have an administrator user who can manage the users of the platform, the roles that users will have, the administrator will also be able to manage all the projects in the system.

The Administrator Role will have access to the entire system, while users will only have access to project information. Unauthenticated users on the system will only be able to list projects from the landing page, only a project owner will be able to handle project information, while a user working on a project will only have access to modify the tasks Completed.

Each user will have a profile where their projects and projects will be listed on what they are working on, as well as the ability to edit their data.

## Architecture

The system is designed to store all user and project data in a database using mongoDB, a [backend](https://github.com/ydroid/musala-jobs-api) where business logic is focused and exposed through a REST service interface using NodeJS and the Loopback framework and a user interface or FrontEnd built in Angular 9+. Each layer is independent and interacts with each other.

## Deployment

The system is currently deployed and ready for operation. It can be accessed from this [address](https://musala-52db9.web.app/). The distribution of the systems was done in this way. The database is located in the [cloud of mongoDB](https://cloud.mongodb.com/), the Backend running on a Heroku dyno and rest services can be accessed by this [address](https://musala-jobs.herokuapp.com/explorer/), and the FrontEnd is deployed using Firebase and is accessible from this [address](https://musala-52db9.web.app/) already mentioned above. To store users' images, we use Firebase's cloud storage feature. 

The system is kept up to date by a series of continues integration operations. We configured those actions in the different clouds and which I explain below.

The backend takes care of it only to keep the database schema up-to-date, and to keep the Backend system up-to-date we integrate Heroku into the repository on GitHub and it will be built and deployed whenever there are new changes to the master branch.

For the FrontEnd we configured a CI/CD using GitHub Actions, we had to enter in the secret information vault of the repo the Firebase API key so that it was safe so that it could deploy for Firebase automatically and securely.


This project was generated with [ngX-Rocket](https://github.com/ngx-rocket/generator-ngx-rocket/)
version 7.1.0

# Getting started

1. Go to project folder and install dependencies:

```sh
npm install
```

2. Launch development server, and open `localhost:4200` in your browser:

```sh
npm start
```

# Project structure

```
dist/                        web app production build
docs/                        project docs and coding guides
e2e/                         end-to-end tests
src/                         project source code
|- animations                animations files
|- app/                      app components
|  |- about                  About Page
|  |- admin-panel            Admin Panel Page    
|  |- core/                  core module (singleton services and single-use components)
|  |- dashboard              DashBoard Page
|  |- errors                 Errors Page
|  |- home                   Home Page
|  |- login                  Login Page
|  |- profile                User Profile Page
|  |- project                Project Details Page
|  |- projects               Projects List Page on public area
|  |- register               User Sign in Page
|  |- shared/                shared module  (common components, directives and pipes)
|  |- shell                  Scafold of the private area
|  |- app.component.*        app root component (shell)
|  |- app.module.ts          app root module definition
|  |- app-routing.module.ts  app routes
|  +- ...                    additional modules and components
|- assets/                   app assets (images, fonts, sounds...)
|- environments/             values for various build environments
|- theme/                    app global scss variables and theme
|- translations/             translations files
|- index.html                html entry point
|- main.scss                 global style entry point
|- main.ts                   app entry point
|- polyfills.ts              polyfills needed by Angular
+- test.ts                   unit tests entry point
reports/                     test and coverage reports
proxy.conf.js                backend proxy configuration
```

# Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

| Task                                            | Description                                                                                                      |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `npm start`                                     | Run development server on `http://localhost:4200/`                                                               |
| `npm run serve:sw`                              | Run test server on `http://localhost:4200/` with service worker enabled                                          |
| `npm run build [-- --configuration=production]` | Lint code and build web app for production (with [AOT](https://angular.io/guide/aot-compiler)) in `dist/` folder |
| `npm test`                                      | Run unit tests via [Karma](https://karma-runner.github.io) in watch mode                                         |
| `npm run test:ci`                               | Lint code and run unit tests once for continuous integration                                                     |                                                  |
| `npm run lint`                                  | Lint code                                                                                                        |
| `npm run translations:extract`                  | Extract strings from code and templates to `src/app/translations/template.json`                                  |
| `npm run docs`                                  | Display project documentation and coding guides                                                                  |
| `npm run prettier`                              | Automatically format all `.ts`, `.js` & `.scss` files                                                            |

When building the application, you can specify the target configuration using the additional flag
`--configuration <name>` (do not forget to prepend `--` to pass arguments to npm scripts).

The default build configuration is `prod`.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.
You should not use `ng serve` directly, as it does not use the backend proxy configuration by default.

## Code scaffolding

Run `npm run generate -- component <name>` to generate a new component. You can also use
`npm run generate -- directive|pipe|service|class|module`.

If you have installed [angular-cli](https://github.com/angular/angular-cli) globally with `npm install -g @angular/cli`,
you can also use the command `ng generate` directly.

## Additional tools

Tasks are mostly based on the `angular-cli` tool. Use `ng help` to get more help or go check out the
[Angular-CLI README](https://github.com/angular/angular-cli).

## Code formatting

All `.ts`, `.js` & `.scss` files in this project are formatted automatically using [Prettier](https://prettier.io),
and enforced via the `test:ci` script.

A pre-commit git hook has been configured on this project to automatically format staged files, using
(pretty-quick)[https://github.com/azz/pretty-quick], so you don't have to care for it.

You can also force code formatting by running the command `npm run prettier`.

# What's in the box

The app template is based on [HTML5](http://whatwg.org/html), [TypeScript](http://www.typescriptlang.org) and
[Sass](http://sass-lang.com). The translation files use the common [JSON](http://www.json.org) format.

#### Tools

Development, build and quality processes are based on [angular-cli](https://github.com/angular/angular-cli) and
[NPM scripts](https://docs.npmjs.com/misc/scripts), which includes:

- Optimized build and bundling process with [Webpack](https://webpack.github.io)
- [Development server](https://webpack.github.io/docs/webpack-dev-server.html) with backend proxy and live reload
- Cross-browser CSS with [autoprefixer](https://github.com/postcss/autoprefixer) and
  [browserslist](https://github.com/ai/browserslist)
- Asset revisioning for [better cache management](https://webpack.github.io/docs/long-term-caching.html)
- Unit tests using [Jasmine](http://jasmine.github.io) and [Karma](https://karma-runner.github.io)
- End-to-end tests using [Protractor](https://github.com/angular/protractor)
- Static code analysis: [TSLint](https://github.com/palantir/tslint), [Codelyzer](https://github.com/mgechev/codelyzer),
  [Stylelint](http://stylelint.io) and [HTMLHint](http://htmlhint.com/)
- Local knowledgebase server using [Hads](https://github.com/sinedied/hads)
- Automatic code formatting with [Prettier](https://prettier.io)

#### Libraries

- [Angular](https://angular.io)
- [Angular Material](https://material.angular.io)
- [Angular Flex Layout](https://github.com/angular/flex-layout)
- [Material Icons](https://material.io/icons/)
- [RxJS](http://reactivex.io/rxjs)
- [ngx-translate](https://github.com/ngx-translate/core)

#### Coding guides

- [Angular](docs/coding-guides/angular.md)
- [TypeScript](docs/coding-guides/typescript.md)
- [Sass](docs/coding-guides/sass.md)
- [HTML](docs/coding-guides/html.md)
- [Unit tests](docs/coding-guides/unit-tests.md)
- [End-to-end tests](docs/coding-guides/e2e-tests.md)

#### Other documentation

- [I18n guide](docs/i18n.md)
- [Working behind a corporate proxy](docs/corporate-proxy.md)
- [Updating dependencies and tools](docs/updating.md)
- [Using a backend proxy for development](docs/backend-proxy.md)
- [Browser routing](docs/routing.md)
