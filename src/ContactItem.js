import React, { Component } from 'react';
import ContactData from "./ContactData";
import styled from 'styled-components'

const ListItem = styled.li`
  list-style: none;
  font-size: 20px;
  width: 800px;
  margin: auto;
  min-height: 30px;
`
const Names = styled.div`
  float: left;
`

const Buttons = styled.div`
  float: right;
`

const EditForm = styled.form`
  display: inline-block;
`

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
              <ListItem key={contact.id}>
                <Names>
                <ContactData
                  fName={contact.firstName}
                  lName={contact.lastName}
                  pNumber={contact.phoneNumber}
                  eMail={contact.email}
                />
                </Names>
                <Buttons>
                <button onClick={() => this.setState({
                  edFirstName: contact.firstName,
                  edLastName: contact.lastName,
                  edPhoneNumber: contact.phoneNumber,
                  edEmail: contact.email,
                  showEditForm: contact.id
                })}>edit</button>
                <button onClick={() => this.props.deleteContact(contact.id)}>delete</button>
                </Buttons>
                {this.state.showEditForm === contact.id ? (
                  <EditForm onSubmit={event => {
                    event.preventDefault();
                    this.handleEdit(contact.id)
                  }}>
                    <input type='text' placeholder='first name' value={this.state.edFirstName} onChange={(event) => this.setState({ edFirstName: event.target.value })} />
                    <input type='text' placeholder='last name' value={this.state.edLastName} onChange={(event) => this.setState({ edLastName: event.target.value })} />
                    <input type='number' placeholder='phone number' value={this.state.edPhoneNumber} onChange={(event) => this.setState({ edPhoneNumber: event.target.value })} />
                    <input type='email' placeholder='email address' value={this.state.edEmail} onChange={(event) => this.setState({ edEmail: event.target.value })} />
                    <button>Save</button>
                  </EditForm>
                ) : null}
              </ListItem>
            )
          )
        }
      </ul>
    )
  }
}

export default ContactItem