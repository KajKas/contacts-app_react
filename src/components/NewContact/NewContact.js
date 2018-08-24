import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components'
import ContactItem from '../ContactItem/ContactItem';

const Input = styled.input`
  height: 20px;
  border-color: blue;
  padding-left: 10px;
`
const Button = styled.button`
  height: 26px;
  width: 80px;
  background-color: blue;
  border: none;
  color: #000;
`

class NewContact extends Component {

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

  clearInputs() {
    this.setState({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: ''
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.clearInputs()
    this.props.addContact(
      this.state.firstName,
      this.state.lastName,
      this.state.phoneNumber,
      this.state.email
    )
  }

  render() {
    return (
      <div className="App">
        <form>
          <Input type='text' placeholder='first name' value={this.state.firstName} onChange={(event) => this.setState({firstName: event.target.value})}/>
          <Input type='text' placeholder='last name' value={this.state.lastName} onChange={(event) => this.setState({lastName: event.target.value})}/>
          <Input type='number' placeholder='phone number' value={this.state.phoneNumber} onChange={(event) => this.setState({phoneNumber: event.target.value})}/>
          <Input type='email' placeholder='email address' value={this.state.email} onChange={(event) => this.setState({email: event.target.value})}/>
          <Button onClick={this.handleSubmit}>
            <Link to='/ContactItem'>Add</Link>
          </Button>
        </form>
      </div>
    )
  }
}

export default NewContact;
