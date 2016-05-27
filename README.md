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
- `rackt release` Publish a new release to npm. Use --preview to preview release.


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

## Contributing

Have a look at [our contribution guidelines](CONTRIBUTING.md).

### Releasing a new version

Use `rackt release`

## LICENSE

The MIT License (MIT)

Copyright (c) 2016 Springload

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
