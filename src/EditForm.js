import React, { Component } from 'react';

class EditForm extends Component {

  state = {
    edFirstName: '',
    edLastName: '',
    edPhoneNumber: '',
    edEmail: '',
    showEditForm: null
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
      <div>
      {this.props.showEditForm === this.props.contactId ? (
        <form onSubmit={event => event.preventDefault()}>
          <input type='text' placeholder='first name' value={this.state.edFirstName} onChange={(event) => this.setState({edFirstName: event.target.value})}/>
          <input type='text' placeholder='last name' value={this.state.edLastName} onChange={(event) => this.setState({edLastName: event.target.value})}/>
          <input type='number' placeholder='phone number' value={this.state.edPhoneNumber} onChange={(event) => this.setState({edPhoneNumber: event.target.value})}/>
          <input type='email' placeholder='email address' value={this.state.edEmail} onChange={(event) => this.setState({edEmail: event.target.value})}/>
          <button onClick={() => this.handleEdit(this.props.contactId)}>Save</button>
        </form>
      ) : null}
      </div>
    )
  }

}

export default EditForm