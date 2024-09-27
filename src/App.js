// src/App.js
import React from 'react';
import './App.css'; // Import styles
import Editor from './components/Editor'; // Import the Editor component

function App() {
  return (
    <div className="App">
      <h1>ProseMirror Autocomplete Editor</h1>
      {/* Render the Editor component */}
      <Editor />
    </div>
  );
}

export default App;

