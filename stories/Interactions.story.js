import React from 'react';
import {storiesOf} from '@kadira/storybook';

import {Board} from '../src';

const data = {
  lanes: [{
    id: 'lane1',
    title: 'Planned Tasks',
    cards: [{id: 'Card1', title: 'Card1', description: 'foo card', metadata: 'foo'},
            {id: 'Card2', title: 'Card2', description: 'bar card', metadata: 'bar'}]
  }]
}

storiesOf('react-trello', module)

  .addWithInfo('Event Handling',
    'Adding event handlers to cards',
    () => (
      <div>
        <Board data={data}
               onCardClick={(cardId, metadata) => alert(`Card with id:${cardId} clicked. Has metadata: ${metadata}`)}
        />
      </div>
    ))

