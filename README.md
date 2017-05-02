# [react-accessible-modal](https://springload.github.io/react-accessible-modal/) [![npm](https://img.shields.io/npm/v/react-accessible-modal.svg?style=flat-square)](https://www.npmjs.com/package/react-accessible-modal) [![Build Status](https://travis-ci.org/springload/react-accessible-modal.svg?branch=master)](https://travis-ci.org/springload/react-accessible-modal) [![Coverage Status](https://coveralls.io/repos/github/springload/react-accessible-modal/badge.svg)]

> Accessible modal dialog component for React. Originally a fork of [reactjs/react-modal](https://github.com/reactjs/react-modal).

Check out the [online demo](https://springload.github.io/react-accessible-modal/)!

## Usage

```sh
npm install --save react-accessible-modal
```

## Include your modal component

```js
import Modal from 'react-accessible-modal';

<Modal
    isOpen={true}
    label="Hello modal!"
    onRequestClose={this.closeModal}
    onAfterClose={this.destroyModal}
>
    <div>
        Hello!
    </div>
</Modal>
```

## Development

### Install


> Clone the project on your computer, and install [Node](https://nodejs.org). This project also uses [nvm](https://github.com/creationix/nvm).

```sh
nvm install
# Then, install all project dependencies.
npm install
# Install the git hooks.
./.githooks/deploy
```

### Working on the project

> Everything mentioned in the installation process should already be done.

```sh
# Make sure you use the right node version.
nvm use
# Start the server and the development tools.
npm run start
# Runs linting.
npm run lint
# Runs tests.
npm run test
# View other available commands with:
npm run
```

### Releases

- Make a new branch for the release of the new version.
- Update the [CHANGELOG](CHANGELOG.md).
- Update the version number in `package.json`, following semver.
- Make a PR and squash merge it.
- Back on master with the PR merged, follow the instructions below.

```sh
npm run dist
# Use irish-pub to check the package content. Install w/ npm install -g first.
irish-pub
npm publish
```

- Finally, go to GitHub and create a release and a tag for the new version.
- Done!
