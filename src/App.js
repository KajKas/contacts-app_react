import React, { Component } from 'react';
import './App.css';
import ContactItem from './ContactItem'

class App extends Component {

  state = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    contacts: [],
    showEditForm: null
  }

  componentDidMount() {
    this.getContacts()
  }

  getContacts() {
    fetch('http://localhost:3004/contacts')
      .then(response => response.json())
      .then(contacts => {
        contacts.sort(this.sortContacts);
        this.setState({
          contacts: contacts
        })
      })
  }

  sortContacts = (a, b) => {
    if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) {
      return -1;
    } else if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) {
      return 1;
    }
    return 0;
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
    ).then(() => this.getContacts())
  }

  editContact = (contactId, contactFirstName, contactLastName, contactNumber, contactEmail) => {
    fetch(
      'http://localhost:3004/contacts/' + contactId, {
        method: 'PATCH',
        body: JSON.stringify({
          firstName: contactFirstName,
          lastName: contactLastName,
          phoneNumber: contactNumber,
          email: contactEmail
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(() => this.getContacts())
  }

  deleteContact = contactId => {
    fetch(
      'http://localhost:3004/contacts/' + contactId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(() => this.getContacts())
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

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='first name' value={this.state.firstName} onChange={(event) => this.setState({firstName: event.target.value})}/>
          <input type='text' placeholder='last name' value={this.state.lastName} onChange={(event) => this.setState({lastName: event.target.value})}/>
          <input type='number' placeholder='phone number' value={this.state.phoneNumber} onChange={(event) => this.setState({phoneNumber: event.target.value})}/>
          <input type='email' placeholder='email address' value={this.state.email} onChange={(event) => this.setState({email: event.target.value})}/>
          <button>Add</button>
        </form>
        <ul>
          <ContactItem
            contacts={this.state.contacts}
            editContact={this.editContact}
            deleteContact={this.deleteContact}
          />
        </ul>
      </div>
    )
  }
}

export default App;
