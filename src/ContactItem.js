import React, { Component } from 'react';
import EditForm from "./EditForm";

class ContactItem extends Component {

  state = {
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

  render() {
    return (
      this.props.contacts.map(
        contact => (
          <li key={contact.id}>
            first name: {contact.firstName},
            last name: {contact.lastName},
            phone number: {contact.phoneNumber},
            email address: {contact.email}
            <button onClick={() => this.props.deleteContact(contact.id)}>x</button>
            <button onClick={() => this.setState({showEditForm: contact.id})}>edit</button>
            <EditForm showEditForm={this.state.showEditForm} contactId={contact.id} editContact={this.props.editContact}/>
          </li>
        )
      )
    )
  }

}

export default ContactItem