import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <input type={'text'} placeholder={'first name'} />
        <input type={'text'} placeholder={'last name'} />
        <input type={'number'} placeholder={'phone number'} />
        <input type={'email'} placeholder={'email address'} />
        <button>Add</button>
        <ul></ul>
      </div>
    );
  }
}

export default App;
