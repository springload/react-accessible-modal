import React from 'react';
import Modal from '../../lib/index';

const App = React.createClass({
  render() {
    return (
      <div className="example">
        <h1>react-accessible-modal</h1>
        <Modal/>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('container'));
