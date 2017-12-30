# TinyPlayer

I personally made this project to play English listening comprehension on classroom TV, while making all player information available on TV.

## Create config file

Create `/src/assets/sound.json`, and build this project with `ng build`. Here's an example:

```json
[
  { "name": "My Fault", "url": "/assets/My fault.mp3" },
  { "name": "On The Wing", "url": "/assets/On the wing.mp3" },
  { "name": "What About Us", "url": "/assets/What about us.mp3" }
]
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
