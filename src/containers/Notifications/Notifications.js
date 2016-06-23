import Helmet from 'react-helmet';
import React from 'react';
import TextField from 'material-ui/TextField';

import Card from '../../components/Card';
import Cards from '../../components/Cards';

export default function Notifications() {
  const title = 'Notifications';
  const description = '';

  return (
    <Cards>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: description },
        ]}
      />

      <Card title="Notifications">
        <p>
          Do you fly an American flag?  Would you like to receive a text message notifying you
          when to lower your flag?
        </p>

        <p>$1.99 / year</p>

        <TextField hintText="123-456-7890" floatingLabelText="Phone Number" />
      </Card>
    </Cards>
  );
}
