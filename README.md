# ussf-portal-client

This is the client application for the new USSF portal website. It is a static site built on [NextJS](https://nextjs.org/). We're also using [Storybook](https://storybook.js.org/) for building and reviewing components.

## Development

### Environment Setup

- Make sure you are using the version of node specified in `.node-version`.
  - We recommend using [nodenv](https://github.com/nodenv/nodenv) to install and manage node versions.
- Use [yarn v1](https://yarnpkg.com) to manage JS packages.
  - [Install yarn](https://yarnpkg.com/en/docs/install) if you do not already have it.
  - Type `yarn` or `yarn install` inside the project directory to install dependencies. You will need to do this once after cloning the project, and continuously if the dependencies in `package.json` change.

### yarn scripts

Most commonly used during development:

- `yarn dev`: Starts NextJS server in development mode and watches for changed files
- `yarn storybook`: Starts the Storybook component library on port 6006
- `yarn test:watch`: Run Jest tests in watch mode

Other (you won't use these often):

- `yarn format`: Autoformat all code using Prettier
- `yarn lint`: Runs the TypeScript compiler and ESLint and outputs issues
- `yarn test`: Run Jest tests once
- `yarn storybook:build`: Build Storybook to a static site that can be deployed
- `yarn build`: Builds the NextJS production asset bundle
- `yarn start`: Starts the NextJS server in production mode
- `yarn build:static`: Build the static site asset bundle for deploy
- `yarn build:analyze`: Builds the asset bundle and generates webpack stats files

### Working on an issue

To begin working on an issue, make sure you've assigned yourself to the issue in Github and marked it as "In Progress.".

Once you have an issue to work on, create a new branch off `main` using the naming convention:

`{issue #}-{short description}`

For example: `112-logo-component`

We have a pre-commit hook set up using Husky to run on staged files only. This will run [Prettier](https://prettier.io/), [TypeScript compilation](https://www.typescriptlang.org/) and [eslint](https://eslint.org/) and fail on errors. For an optimal developer experience, it's recommended that you configure your editor to run linting & formatting inline.

When your branch is ready, open a PR against `main`, fill out the description and request code reviews. The code must pass the same linting and formatting checks mentioned above, as well as [Jest tests](https://jestjs.io/) in order to merge.

### PR Linting

In order to easily maintain a clear changelog, we require all PRs into the `main` branch to pass the [conventional commits spec](https://www.conventionalcommits.org/en/v1.0.0/#specification).

The format for PR commits is:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Allowed `type`s are:

- `build`: Changes that affect the build system or external dependencies (example scopes: webpack, npm)
- `chore`: Completing a task that has no effective code changes, such as updating the version and changelog for a release
- `ci`: Changes to our CI configuration files and scripts (example scopes: Circle, Github actions/workflows)
- `docs`: Documentation only changes
- `feat`: A new feature
- `fix`: A bug fix
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `revert`: If the commit reverts a previous commit, it should begin with `revert:` , followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `test`: Adding missing tests or correcting existing tests

#### `scope` is optional, can be used to provide additional context, and may be one of the following (this list is not exhaustive):

- `deps`: Updating a package listed in dependencies
- `deps-dev`: Updating a package listed in devDependencies
- `ci`: Changes to Github Actions, CI config and/or scripts
- `storybook`: Changes to Storybook or stories files only

#### `body`:

Will default to a list of included commits since PRs are all squashed when merging. You can choose to keep or remove this list, and also add additional context to the body if needed.

#### `footer`:

Should link the PR to any issues it closes (see: ["Linking a pull request to an issue"](https://docs.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue)).

Example:

```
Closes #123
```

The footer should also include `BREAKING CHANGE:` if the commit includes any breaking changes. This will make sure the major version is automatically bumped when this commit is released.
