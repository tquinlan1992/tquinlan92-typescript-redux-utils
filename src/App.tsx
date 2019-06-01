import React from 'react';
import './App.css';
import { State1ComponentConnected, ComponentWithProps } from './containers/State1';

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
