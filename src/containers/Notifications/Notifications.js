import React from 'react';
import TextField from 'material-ui/TextField';

import Card from '../../components/Card';
import Cards from '../../components/Cards';
import FlagContainer from '../../components/FlagContainer';

export default function Notifications() {
  return (
    <FlagContainer lowered>
      <Cards>
        <Card title="Notifications">
          <p>
            Do you fly an American flag?  Would you like to receive a text message notifying you
            when to lower your flag?
          </p>

          <p>$1.99 / year</p>

          <TextField hintText="123-456-7890" floatingLabelText="Phone Number" />
        </Card>
      </Cards>
    </FlagContainer>
  );
}
