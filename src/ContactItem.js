import React, { Component } from 'react';
import ContactData from "./ContactData";

class ContactItem extends Component {

  state = {
    edFirstName: '',
    edLastName: '',
    edPhoneNumber: '',
    edEmail: '',
    showEditForm: null
  }

  componentDidMount() {
    this.getContacts()
  }

  getContacts() {
    fetch('http://localhost:3004/contacts')
      .then(response => response.json())
      .then(contacts => {
        contacts.sort(this.sortContacts).map(contact => contact);
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

  handleEdit = (contactId) => {
    this.props.editContact(
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

  render() {
    return (
      <ul>
        {
          this.props.contacts.map(
            contact => (
              <li key={contact.id}>
                <ContactData
                  fName={contact.firstName}
                  lName={contact.lastName}
                  pNumber={contact.phoneNumber}
                  eMail={contact.email}
                />
                <button onClick={() => this.props.deleteContact(contact.id)}>x</button>
                <button onClick={() => this.setState({
                  edFirstName: contact.firstName,
                  edLastName: contact.lastName,
                  edPhoneNumber: contact.phoneNumber,
                  edEmail: contact.email,
                  showEditForm: contact.id
                })}>edit</button>
                {this.state.showEditForm === contact.id ? (
                  <form onSubmit={event => {
                    event.preventDefault();
                    this.handleEdit(contact.id)
                  }}>
                    <input type='text' placeholder='first name' value={this.state.edFirstName} onChange={(event) => this.setState({ edFirstName: event.target.value })} />
                    <input type='text' placeholder='last name' value={this.state.edLastName} onChange={(event) => this.setState({ edLastName: event.target.value })} />
                    <input type='number' placeholder='phone number' value={this.state.edPhoneNumber} onChange={(event) => this.setState({ edPhoneNumber: event.target.value })} />
                    <input type='email' placeholder='email address' value={this.state.edEmail} onChange={(event) => this.setState({ edEmail: event.target.value })} />
                    <button>Save</button>
                  </form>
                ) : null}
              </li>
            )
          )
        }
      </ul>
    )
  }
}

export default ContactItem