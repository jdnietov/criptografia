import React, { Component } from 'react';

import DesView from './DesView';
import SaesView from './SaesView';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="/logo.svg" className="App-logo" alt="logo" />
          <h1 className="App-title">Criptografía - DES Y SAES</h1>
        </header>
        <div className="App-intro">
          <br/>
          <br/>
          <div className="ui container">
            <div className="ui grid">
              <div className="eight wide column">
                <DesView />
              </div>
              <div className="eight wide column">
                <SaesView />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
