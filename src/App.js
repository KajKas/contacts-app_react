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

  handleSubmit = event => {
    event.preventDefault()
    this.props.addContact(this.state.firstName, this.state.lastName, this.state.phoneNumber, this.state.email)

  }



  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='first name' value={this.state.firstName} onChange={(event) => this.setState({firstName: event.target.value})}/>
          <input type='text' placeholder='last name' value={this.state.lastName} onChange={(event) => this.setState({lastName: event.target.value})}/>
          <input type='number' placeholder='phone number' value={this.state.phoneNumber} onChange={(event) => this.setState({phoneNumber: event.target.value})}/>
          <input type='email' placeholder='email address' value={this.state.email} onChange={(event) => this.setState({email: event.target.value})}/>
          <button onClick={() => this.addContact(this.props.firstName, this.props.lastName, this.props.phoneNumber, this.props.email)}>Add</button>
        </form>
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
