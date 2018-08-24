import React, {Component, Fragment} from 'react'
import styled from 'styled-components'

const Span = styled.span`
  font-size: 14px;
  color: #8b2f2f;
`

class ContactData extends Component {
  render() {
    return (
      <Fragment>
        <Span>first name:</Span> {this.props.fName},
        <Span> last name:</Span> {this.props.lName},
        <Span> phone number:</Span> {this.props.pNumber},
        <Span> email address:</Span> {this.props.eMail}
      </Fragment>
    )
  }
}

export default ContactData