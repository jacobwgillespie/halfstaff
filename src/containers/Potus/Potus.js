import React from 'react';

import Card from '../../components/Card';
import Cards from '../../components/Cards';
import FlagContainer from '../../components/FlagContainer';

export default function Potus() {
  return (
    <FlagContainer lowered>
      <Cards>
        <Card title="About">
          <p>
            Half Staff displays the current US flag status in a clean, simple format and allows for
            browsing past flag notices.  It automatically reads the
            <a href="https://www.whitehouse.gov/briefing-room/presidential-actions/proclamations">President's proclamations</a>
            looking for flag orders and reads the duration and surrounding details.  Half Staff also
            works on iOS and Android via add-to-homescreen.
          </p>

          <p>
            More technical details and the website's source code can be found on
            <a href="https://github.com/jacobwgillespie/halfstaff">GitHub</a>.  Contributions are welcome.
          </p>

          <p>The website is copyright &copy; 2016 <a href="https://jacobwgillespie.com">Jacob Gillespie</a>.  All rights reserved.</p>
        </Card>
      </Cards>
    </FlagContainer>
  );
}
