import React from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'

import {Board} from '../src'

const data = require('./data.json')

let eventBus = undefined

let setEventBus = handle => {
  eventBus = handle
}

const completeMilkEvent = () => {
  eventBus.publish({
    type: 'ADD_CARD',
    laneId: 'COMPLETED',
    card: {id: 'Milk', title: 'Buy Milk', label: '15 mins', description: 'Use Headspace app'}
  })
  eventBus.publish({type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: 'Milk'})
}

const addBlockedEvent = () => {
  eventBus.publish({
    type: 'ADD_CARD',
    laneId: 'BLOCKED',
    card: {id: 'Ec2Error', title: 'EC2 Instance Down', label: '30 mins', description: 'Main EC2 instance down'}
  })
}

const shouldReceiveNewData = nextData => {
  console.log('data has changed')
  console.log(nextData)
}

storiesOf('React Trello', module).add(
  'Realtime Events',
  withInfo('This is an illustration of external events that modify the cards in the board')(() => {
    return (
      <div>
        <button onClick={completeMilkEvent} style={{margin: 5}}>
          Complete Buy Milk
        </button>
        <button onClick={addBlockedEvent} style={{margin: 5}}>
          Add Blocked
        </button>
        <Board data={data} onDataChange={shouldReceiveNewData} eventBusHandle={setEventBus} />
      </div>
    )
  })
)
