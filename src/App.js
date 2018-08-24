import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ContactItem from './ContactItem'
import NewContact from "./NewContact";
import './App.css';

class App extends Component {

  state = {
    contacts: []
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

  render() {
    // return (
    //   <div className="App">
    //     <NewContact addContact={this.addContact}/>
    //     <ul>
    //       <ContactItem
    //         contacts={this.state.contacts}
    //         editContact={this.editContact}
    //         deleteContact={this.deleteContact}
    //       />
    //     </ul>
    //   </div>
    // )

    return (
      <Router>
        <div className="App">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ContactItem" contacts={this.state.contacts} editContact={this.editContact} deleteContact={this.deleteContact}>List of contacts</Link>
            </li>
            <li>
              <Link to="/NewContact" addContact={this.addContact}>Add a new contact</Link>
            </li>
          </ul>
          <Route exact path="/" render={() => 'This is your contacts app'} />
          <Route path="/ContactItem"  component={ContactItem} />
          <Route path="/NewContact"  component={NewContact} />
        </div>
      </Router>
    )
  }
}

export default App;
