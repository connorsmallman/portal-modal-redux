import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store'
import logo from './logo.svg';
import './App.css';
import { withModal } from './Modal';
import { showModal } from './modules/modal';

const MyComponent = (props) => (
  <div>
    This is my modal. There are many like it, but this one is mine. My modal is my best friend. It is my life. I must master it as I master my life. My modal, without me, is useless.
    <button onClick={props.close}>Close</button>
  </div>
);

const MyModal = withModal('MyModal')(MyComponent);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <MyModal />
          <button onClick={() => store.dispatch(showModal('MyModal'))}>Show modal</button>
        </div>
      </Provider>
    );
  }
}

export default App;
