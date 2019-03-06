import React, {Component} from 'react'
import {storiesOf} from '@storybook/react'
import debug from './helpers/debug'

import Board from '../src'

const data = require('./data/base.json')
const smallData = require('./data/data-sort')

storiesOf('Editable Board', module)
  .add(
    'Add/Delete Cards',
    () => {
      const shouldReceiveNewData = nextData => {
        debug('Board has changed')
        debug(nextData)
      }

      const handleCardDelete = (cardId, laneId) => {
        debug(`Card: ${cardId} deleted from lane: ${laneId}`)
      }

      const handleCardAdd = (card, laneId) => {
        debug(`New card added to lane ${laneId}`)
        debug(card)
      }

      return (
        <Board
          data={data}
          draggable
          id="EditableBoard1"
          onDataChange={shouldReceiveNewData}
          onCardDelete={handleCardDelete}
          onCardAdd={handleCardAdd}
          onCardClick={(cardId, metadata, laneId) => alert(`Card with id:${cardId} clicked. Card in lane: ${laneId}`)}
          editable
        />
      )
    },
    {info: 'Add/delete cards or delete lanes'}
  )
  .add(
    'Add New Lane',
    () => {
      return (
        <Board
          data={smallData}
          editable
          canAddLanes
          onLaneAdd={t => debug('You added a line with title ' + t.title)}
        />
      )
    },
    {info: 'Allow adding new lane'}
  )
