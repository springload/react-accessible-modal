# React accessible Modal

React accessible modal component


## Commands

You need `rackt-cli v0.5.3` to execute some of these commands.

- `npm install` install node dependencies
- `npm start` run server
- `npm test` run tests
- `npm build` build component
- `npm publish` publish component to npm (verify versions in package.json and bower.json)
- `rackt pages` rebuild gh-pages branch


To install our dependencies:

```sh
npm install --global eslint eslint-plugin-react babel-eslint eslint-config-airbnb sass-lint
# Then, install all project dependencies.
npm install
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

## Example

You can find an example here: https://springload.github.io/react-accessible-modal/