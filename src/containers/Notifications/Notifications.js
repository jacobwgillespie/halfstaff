import Helmet from 'react-helmet';
import React from 'react';

import Card from '../../components/Card';
import Cards from '../../components/Cards';
import TextMessageNotifications from '../../components/TextMessageNotifications';

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
          Receive a text message notification when the US flag is lowered.
        </p>

        <p>
          <strong>$1.99 per year</strong>
        </p>
      </Card>

      <Card>
        <TextMessageNotifications />
      </Card>
    </Cards>
  );
}
