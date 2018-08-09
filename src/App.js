import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    contacts: []
  }

  componentDidMount() {
    fetch('http://localhost:3004/contacts')
      .then(response => response.json())
      .then(contacts => this.setState({
        contacts: [
          {
            firstName: contacts.firstName,
            lastName: contacts.lastName,
            phoneNumber: contacts.phoneNumber,
            emailAddress: contacts.emailAddress
          }
        ]
      }));
  }



  render() {
    return (
      <div className="App">
        <input type={'text'} placeholder={'first name'} />
        <input type={'text'} placeholder={'last name'} />
        <input type={'number'} placeholder={'phone number'} />
        <input type={'email'} placeholder={'email address'} />
        <button>Add</button>
        <ul>
          {
            this.state.contacts.map(
              contact => (
                <li>
                  first name: {contact.firstName}
                  last name: {this.state.contacts.lastName}
                  phone number: {this.phoneNumber}
                  email address: {this.emailAddress}
                </li>
              )
            )
          }
        </ul>
      </div>
    )
  }
}

export default App;
