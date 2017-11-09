import React from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'

import Board from '../src'

import './board.css'

const data = require('./data/base.json')

storiesOf('Advanced Features', module).add(
  'Board Styling',
  withInfo('Change the background and other css styles for the board container')(() =>
    <Board data={data} style={{padding: '30px 20px'}} className='boardContainer' />
  )
)
