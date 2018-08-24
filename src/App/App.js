import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ContactItem from '../ContactItem/ContactItem';
import NewContact from "../NewContact/NewContact";
import './App.css';
import styled from 'styled-components'

const MenuItem = styled.li`
  list-style: none;
  font-size: 30px;
  color: blue;
`;

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
    return (
      <Router>
        <div className="App">
          <ul>
            <MenuItem>
              <Link to="/">Home</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/ContactItem">List of contacts</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/NewContact">Add a new contact</Link>
            </MenuItem>
          </ul>
          <Route
            exact path="/"
            render={() =>
              'This is your contacts app. Use it wisely.'
            }
          />
          <Route
            path="/ContactItem"
            render={() => (
              <ContactItem
                contacts={this.state.contacts}
                editContact={this.editContact}
                deleteContact={this.deleteContact}
              />
            )}
          />
          <Route
            path="/NewContact"
            render={() => (
              <NewContact
                addContact={this.addContact}
              />
            )}
          />
        </div>
      </Router>
    )
  }
}

export default App;
