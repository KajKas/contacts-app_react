import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import App from "../components/App/App";
import ContactData from "../components/ContactData/ContactData";
import ContactItem from "../components/ContactItem/ContactItem";
import NewContact from "../components/NewContact/NewContact";

import { Button, Welcome } from '@storybook/react/demo';



storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf('App', module).add('default', () => <App/>)

storiesOf('ContactData', module).add('default', () =>
  <ContactData
    fName={'bzzzzz'}
    lName={'dupa'}
    pNumber={1212121}
    eMail={'aaaqq@qqa'}
  />
)

storiesOf('ContactItem', module).add('default', () =>
  <ContactItem
    contacts={[
      {
        "firstName": "zzz",
        "lastName": "zzz",
        "phoneNumber": "77777777",
        "email": "zzzzzz@zz",
        "id": 12
      }
    ]}
    editContact={() => {}}
    deleteContact={() => {}}
  />
)

storiesOf('NewContact', module).add('default', () => <NewContact/>)