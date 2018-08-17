import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    contacts: []
  }

  componentDidMount() {
    this.getContacts()
  }

  getContacts() {
    fetch('http://localhost:3004/contacts')
    .then(response => response.json())
    .then(contacts => this.setState({
      contacts: contacts
    }));
  }

  clearInputs() {
    this.setState({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: ''
    })
  }

  addContact = (firstName, lastName, phoneNumber, email) => {
    const sync = () => this.getContacts()
    fetch(
      'http://localhost:3004/contacts', {
        method: 'POST',
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      }
    ).then(sync)
  }

  handleSubmit = event => {
    event.preventDefault()
    this.clearInputs()
    this.addContact(
      this.state.firstName,
      this.state.lastName,
      this.state.phoneNumber,
      this.state.email
    )
  }

  handleDelete = contactId => {
    const sync = () => this.getContacts()
    fetch(
      'http://localhost:3004/contacts/' + contactId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(sync)
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='first name' onChange={(event) => this.setState({firstName: event.target.value})}/>
          <input type='text' placeholder='last name' onChange={(event) => this.setState({lastName: event.target.value})}/>
          <input type='number' placeholder='phone number' onChange={(event) => this.setState({phoneNumber: event.target.value})}/>
          <input type='email' placeholder='email address' onChange={(event) => this.setState({email: event.target.value})}/>
          <button>Add</button>
        </form>
        <ul>
          {
            this.state.contacts.map(
              contact => (
                <li key={contact.id}>
                  first name: {contact.firstName},
                  last name: {contact.lastName},
                  phone number: {contact.phoneNumber},
                  email address: {contact.email}
                  <button onClick={() => this.handleDelete(contact.id)}>x</button>
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
