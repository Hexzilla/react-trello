import React, { Component } from 'react'
import dragula from 'dragula'

export default class Board extends Component {

  componentDidMount() {
    if (this.props.draggable) {
      dragula([...document.querySelectorAll('.drag-inner-list')])
        .on('drag', (el) => el.classList.add('is-moving'))
        .on('dragend', (el) => el.classList.remove('is-moving'))
    }
  }

  render() {
    return <div className='board'>
      {this.props.children}
    </div>
  }
}

Board.propTypes = {
  children: React.PropTypes.node,
  draggable: React.PropTypes.bool,
  onDragStart: React.PropTypes.func,
  onDragEnd: React.PropTypes.func
}
