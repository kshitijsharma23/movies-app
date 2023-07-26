# Movies App

Movies App built using React, MUI and TypeScript. Uses Vite's React + TypeScript template.

Production build deployed on [GitHub Pages](https://kshitijsharma23.github.io/movies-app/).

## Features

- Dark mode support (use theme toggle button on top right).
- MSW to mock REST APIs for getting movies and user data on development environment.
- Responsive UI.
- CI/CD setup using GitHub actions to deploy the production build to GitHub pages whenever changes are pushed to the `main` branch.
- Setup pre-commit and pre-push Git hooks using Husky for formatting, linting, type checking, etc.

## How to run the project on local?

1. Clone the repo.
2. `cd movies-app`
3. Install dependencies: `yarn`.
4. Run the project: `yarn dev`.
5. Create production build: `yarn build`.
6. Run production build on local: `yarn preview`.
