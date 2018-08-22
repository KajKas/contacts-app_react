import React, { Component } from 'react';
import './App.css';

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
      .then(data => {
        const contacts = data.sort(this.sortContacts).map(contact => contact);
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
    fetch(
      'http://localhost:3004/contacts/' + contactId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(() => this.getContacts())
  }

  handleEdit = (contactId) => {
    this.editContact(
      contactId,
      this.state.edFirstName,
      this.state.edLastName,
      this.state.edPhoneNumber,
      this.state.edEmail
    )
    this.setState({
      edFirstName: '',
      edLastName: '',
      edPhoneNumber: '',
      edEmail: ''
    })
    this.setState({
      showEditForm: null
    })
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
        headers:{
          'Content-Type': 'application/json'
        }
      }
    ).then(() => this.getContacts())
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
          {
            this.state.contacts.map(
              contact => (
                <li key={contact.id}>
                  first name: {contact.firstName},
                  last name: {contact.lastName},
                  phone number: {contact.phoneNumber},
                  email address: {contact.email}
                  <button onClick={() => this.handleDelete(contact.id)}>x</button>
                  <button onClick={() => this.setState({showEditForm: contact.id})}>edit</button>
                  {this.state.showEditForm === contact.id ? (
                  <form onSubmit={event => event.preventDefault()}>
                    <input type='text' placeholder='first name' value={this.state.edFirstName} onChange={(event) => this.setState({edFirstName: event.target.value})}/>
                    <input type='text' placeholder='last name' value={this.state.edLastName} onChange={(event) => this.setState({edLastName: event.target.value})}/>
                    <input type='number' placeholder='phone number' value={this.state.edPhoneNumber} onChange={(event) => this.setState({edPhoneNumber: event.target.value})}/>
                    <input type='email' placeholder='email address' value={this.state.edEmail} onChange={(event) => this.setState({edEmail: event.target.value})}/>
                    <button onClick={() => this.handleEdit(contact.id)}>Save</button>
                  </form>
                  ) : null}
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
