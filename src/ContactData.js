import React, {Component, Fragment} from 'react'

class ContactData extends Component {
  render() {
    return (
      <Fragment>
        first name: {this.props.fName},
        last name: {this.props.lName},
        phone number: {this.props.pNumber},
        email address: {this.props.eMail}
      </Fragment>
    )
  }
}

export default ContactData