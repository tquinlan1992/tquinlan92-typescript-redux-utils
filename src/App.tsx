import React from 'react';
import './App.css';
import { State1ComponentConnected } from './containers/State1';
import { ComponentWithProps } from './containers/StyleComponent';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <State1ComponentConnected />
        <ComponentWithProps valueFromProp='valueFromProp' />
      </header>
    </div>
  );
}

export default App;
