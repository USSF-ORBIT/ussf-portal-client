# Development

1. [Environment Setup](#environment-setup)
1. [yarn scripts](#yarn-scripts)
1. [Running the application](#running-the-application)
1. [Working on an issue](#working-on-an-issue)
1. [PR linting](#pr-linting)
1. [Testing](#testing)
1. [Releasing](#releasing)

## Environment Setup

1. **Set up [direnv](https://direnv.net/docs/hook.html)**

   - We're using direnv to manage environment variables.
   - You'll have to type `direnv allow` in your shell to load environment variables when they change, and when navigating into a project directory.

1. **Install [Docker](https://www.docker.com/products/docker-desktop)**

   - We're using Docker to build & run the application.
   - Since we are _not_ using Docker as a full development environment, you will still need to check your node version and install packages (in order to do things like run tests, linting, Storybook, etc. on your local machine).

1. **Check your node version: `node -v`**

   - Make sure you are using the version of node specified in `.node-version`.
   - We recommend using [nodenv](https://github.com/nodenv/nodenv) to install and manage node versions.

1. **Use [yarn v1](https://classic.yarnpkg.com/lang/en/) to manage JS packages**

   - [Install yarn](https://classic.yarnpkg.com/en/docs/install) if you do not already have it.
   - Type `yarn` or `yarn install` inside the project directory to install dependencies. You will need to do this once after cloning the project, and continuously if the dependencies in `package.json` change.

## yarn scripts

Most commonly used during development:

- `yarn dev`: Starts NextJS server in development mode and watches for changed files
- `yarn storybook`: Starts the Storybook component library on port 6006
- `yarn test:watch`: Run Jest tests in watch mode
- `yarn cypress:dev`: Start the Cypress test runner UI

To start the app server as it will run in production:

- `yarn build`: Builds the NextJS production asset bundle
- `yarn start`: Starts the NextJS server in production mode

Other:

- `yarn format`: Autoformat all code using Prettier
- `yarn lint`: Runs the TypeScript compiler and ESLint and outputs issues
- `yarn test`: Run Jest tests once
- `yarn storybook:build`: Build Storybook to a static site that can be deployed
- `yarn build:analyze`: Builds the asset bundle and generates webpack stats files

## Running the application

### Development Mode

The `yarn dev` command starts the NextJS dev server at `localhost:3000`. This command will automatically watch for changes to files, and re-compile/reload the browser window. This is usually what you'll have running during active development.

### Production Mode

_Not to be confused with the production environment!_

You can start the NextJS server in "production mode" (i.e., the server will run in the same way it will on a deployed environment with no recompilation or hot reloading) by running both:

- `yarn build` builds static assets that will be served by NextJS. This command must be used before `yarn serve`.
- `yarn serve` starts the NextJS server running at `localhost:3000` (the same port used by the dev server).

### Running in Docker (WIP)

To run the application stack in development mode (with hot reloading):

```
docker-compose up -d
```

This will also start a test SAML IDP (identity provider) at `localhost:8080, localhost:8443` for testing our authentication flow against. You can log in with the test user credentials:

```
username: user1
password: user1pass
```

Additional users can be configured in the `users.php` file.

## Working on an issue

To begin working on an issue, make sure you've assigned yourself to the issue in Github and marked it as "In Progress.".

Once you have an issue to work on, create a new branch off `main` using the naming convention:

`{issue #}-{short description}`

For example: `112-logo-component`

We have a pre-commit hook set up using Husky to run on staged files only. This will run [Prettier](https://prettier.io/), [TypeScript compilation](https://www.typescriptlang.org/) and [eslint](https://eslint.org/) and fail on errors. For an optimal developer experience, it's recommended that you configure your editor to run linting & formatting inline.

When your branch is ready, open a PR against `main`, fill out the description and request code reviews. The code must pass the same linting and formatting checks mentioned above, as well as [Jest tests](https://jestjs.io/) in order to merge.

## PR linting

In order to easily maintain a clear changelog, we require all PRs into the `main` branch to pass the [conventional commits spec](https://www.conventionalcommits.org/en/v1.0.0/#specification).

The format for PR commits is:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Allowed `type`s are:

- `build`: Changes that affect the build system or external dependencies (example scopes: webpack, npm)
- `chore`: Completing a task that has no effective code changes, such as updating the version and changelog for a release
- `ci`: Changes to our CI configuration files and scripts (example scopes: Circle, Github actions/workflows)
- `dev`: A code change that does not result in a user-facing feature (for example, a new component that is only visible in Storybook, or work that builds towards but does not complete a feature)
- `docs`: Documentation only changes
- `feat`: A new feature
- `fix`: A bug fix
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `revert`: If the commit reverts a previous commit, it should begin with `revert:` , followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `test`: Adding missing tests or correcting existing tests

### `scope` is optional, and can be used to provide additional context, especially if changes only encompass a specific area of the code. Some examples include:

- `deps`: Updating a package listed in dependencies
- `deps-dev`: Updating a package listed in devDependencies
- `jest`: Changes to Jest tests
- `cypress`: Changes to Cypress tests
- `storybook`: Changes to Storybook or stories files only

### `body`:

Will default to a list of included commits since PRs are all squashed when merging. You can choose to keep or remove this list, and also add additional context to the body if needed.

### `footer`:

Should link the PR to any issues it closes (see: ["Linking a pull request to an issue"](https://docs.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue)).

Example:

```
Closes #123
```

The footer should also include `BREAKING CHANGE:` if the commit includes any breaking changes. This will make sure the major version is automatically bumped when this commit is released.

## Testing

- Use [Jest](https://jestjs.io/) to write unit tests for JavaScript code & React components that will be run in [jsdom](https://github.com/jsdom/jsdom).
  - We are currently enforcing Jest test coverage across the codebase. You can find the minimum required % in [jest.config.js](../jest.config.js)
  - All Jest tests are run in Github CI and must pass before merging.
- Use [Cypress](https://www.cypress.io/) to write integration & end-to-end tests that can be run in a real browser. This allows testing certain browser behaviors that are not reproducible in jsdom.
  - All Cypress tests are run in Github CI and must pass before merging. You can test Cypress on your local machine, and by default it will test whatever is running at `http://localhost:3000` (whether it’s the dev server or production server).
  - To test against the production site on your local machine, run the following commands in order:
    - `yarn build` (build NextJS assets)
    - `yarn start` (start the NextJS server at localhost:3000)
    - `yarn cypress` (start the Cypress runner against the site)
  - You can also run Cypress against the dev server. Just note that the dev server does _not_ match the same behavior as when it is running in production, so Cypress tests should always also be verified against what is going to be deployed to production.
    - `yarn dev` (start the NextJS dev server at localhost:3000)
    - `yarn cypress` (start the Cypress runner against the site)

## Releasing

We are using a tool called [standard-version](https://github.com/conventional-changelog/standard-version) to facilitate version bumps and releases in order to maintain a clear history of this project. In order to tag a new release:

- Check out the `main` branch and make sure to pull down the latest changes
- Run `yarn release` -- this will add new entries to the changelog, and increase the version number based on the types of changes.
  - You can run `yarn release --dry-run` to preview the new version number and changelog.
  - You can also choose to release a specific version increment. See the [standard-version docs](https://github.com/conventional-changelog/standard-version#release-as-a-target-type-imperatively-npm-version-like) for more options.
- Commit these changes to a new branch called `release-x.y.z.` (where `x.y.z` is the new version number generated by the release script).
  - The commit message should follow the format: `chore(release): <VERSION NUMBER>`
  - Example: `chore(release): 1.2.0`
- Open a PR into `main` and merge once required checks have passed.
  - The PR body should include the new changelog entries.
- After merging the PR, [create a new release](https://github.com/USSF-ORBIT/ussf-portal-client/releases/new), tagging with the new version number and paste the new changelog entries into the description.
  - At this point, the tag is ready to deploy to production.
