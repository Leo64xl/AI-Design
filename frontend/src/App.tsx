import React from 'react';
import Counter from './components/Counter';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React con Redux en TypeScript</h1>
        <Counter />
      </header>
    </div>
  );
};

export default App;