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
        contacts: contacts
      }));
  }

  addContact = (firstName, lastName, phoneNumber, email) => {
    this.setState({
      contacts: this.state.contacts.concat({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email
      })
    })
  }


  render() {
    return (
      <div className="App">
        <input type='text' placeholder='first name' onChange={(event) => this.setState({firstName: event.target.value})}/>
        <input type='text' placeholder='last name' />
        <input type='number' placeholder='phone number' />
        <input type='email' placeholder='email address' />
        <button onClick={() => this.addContact(this.props.firstName, 'dupa', '666', 'ddd@vb.pl')}>Add</button>
        <ul>
          {
            this.state.contacts.map(
              contact => (
                <li>
                  first name: {contact.firstName},
                  last name: {contact.lastName},
                  phone number: {contact.phoneNumber},
                  email address: {contact.email}
                  <button>x</button>
                  <button>edit</button>
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
