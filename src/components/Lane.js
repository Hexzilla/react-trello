import React, {Component} from 'react'
import Loader from './Loader'
import PropTypes from 'prop-types'
import Card from './Card'
import {
  Section,
  Header,
  Title,
  RightContent,
  DraggableList,
  Placeholder,
  AddCardLink,
  LaneWrapper,
  ScrollableLane
} from '../styles/Base'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import update from 'immutability-helper'
import isEqual from 'lodash/isEqual'
import NewCard from './NewCard'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import uuidv1 from 'uuid/v1'

import * as laneActions from '../actions/LaneActions'

class Lane extends Component {
  state = {
    loading: false,
    currentPage: this.props.currentPage,
    cards: this.props.cards,
    shouldUpdate: true,
    addCardMode: false
  }

  handleScroll = evt => {
    const node = evt.target
    const elemScrolPosition = node.scrollHeight - node.scrollTop - node.clientHeight
    const {onLaneScroll} = this.props
    if (elemScrolPosition <= 0 && onLaneScroll && !this.state.loading) {
      const {currentPage} = this.state
      this.setState({loading: true})
      const nextPage = currentPage + 1
      onLaneScroll(nextPage, this.props.id).then(moreCards => {
        if (!moreCards || moreCards.length === 0) {
          // if no cards present, stop retrying until user action
          node.scrollTop = node.scrollTop - 50
        } else {
          this.props.actions.paginateLane({
            laneId: this.props.id,
            newCards: moreCards,
            nextPage: nextPage
          })
        }
        this.setState({loading: false})
      })
    }
  }

  sortCards(cards, sortFunction) {
    if (!cards) return []
    if (!sortFunction) return cards
    return cards.concat().sort(function(card1, card2) {
      return sortFunction(card1, card2)
    })
  }

  laneDidMount = (node, dragReference) => {
    if (node) {
      node.addEventListener('scroll', this.handleScroll)
      dragReference(node)
    }
  }

  moveCard = (dragIndex, hoverIndex) => {
    const {cards} = this.state
    const dragCard = cards[dragIndex]

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    )
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.cards, nextProps.cards)) {
      this.setState({
        cards: nextProps.cards,
        currentPage: nextProps.currentPage
      })
    }
  }

  moveCardAcrossLanes = (fromLaneId, toLaneId, cardId) => {
    toLaneId &&
      this.props.actions.moveCardAcrossLanes({
        fromLaneId: fromLaneId,
        toLaneId: toLaneId,
        cardId: cardId
      })
  }

  removeCard = (laneId, cardId) => {
    this.props.actions.removeCard({laneId: laneId, cardId: cardId})
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props.cards, nextProps.cards) || nextState !== this.state
  }

  handleCardClick = (e, card) => {
    const {onCardClick} = this.props
    onCardClick && onCardClick(card.id, card.metadata, card.laneId)
    e.stopPropagation()
  }

  showEditableCard = () => {
    this.setState({addCardMode: true})
  }

  hideEditableCard = () => {
    this.setState({addCardMode: false})
  }

  addNewCard = params => {
    const laneId = this.props.id
    const id = uuidv1()
    this.hideEditableCard()
    let card = {...params, id}
    this.props.actions.addCard({laneId, card})
    this.props.onCardAdd(card, laneId)
  }

  renderAddCardLink = () => {
    const {addCardLink} = this.props
    if (addCardLink) {
      return <span onClick={this.showEditableCard}>{addCardLink}</span>
    } else {
      return <AddCardLink onClick={this.showEditableCard}>Add Card</AddCardLink>
    }
  }

  renderNewCard = () => {
    const {newCardTemplate} = this.props
    if (newCardTemplate) {
      const newCardWithProps = React.cloneElement(newCardTemplate, {
        onCancel: this.hideEditableCard,
        onAdd: this.addNewCard
      })
      return <span>{newCardWithProps}</span>
    } else {
      return <NewCard onCancel={this.hideEditableCard} onAdd={this.addNewCard} />
    }
  }

  onDragEnd = result => {
    console.log('onDragEnd')
    console.log(result)
  }

  renderDragContainer = () => {
    const {laneSortFunction, editable, tagStyle, cardStyle, draggable} = this.props
    const {addCardMode} = this.state

    const cardList = this.sortCards(this.state.cards, laneSortFunction).map((card, idx) => (
      <Card
        key={card.id}
        index={idx}
        customCardLayout={this.props.customCardLayout}
        customCard={this.props.children}
        handleDragStart={this.props.handleDragStart}
        handleDragEnd={this.props.handleDragEnd}
        tagStyle={tagStyle}
        cardStyle={cardStyle}
        moveCard={this.moveCard}
        moveCardAcrossLanes={this.moveCardAcrossLanes}
        removeCard={this.removeCard}
        onClick={e => this.handleCardClick(e, card)}
        onDelete={this.props.onCardDelete}
        draggable={draggable}
        editable={editable}
        {...card}
      />
    ))

    return (
      <div>
        <DraggableList>{cardList}</DraggableList>
        {editable && !addCardMode && this.renderAddCardLink()}
        {addCardMode && this.renderNewCard()}
      </div>
    )
  }

  renderHeader = () => {
    if (this.props.customLaneHeader) {
      const customLaneElement = React.cloneElement(this.props.customLaneHeader, {...this.props})
      return <span>{customLaneElement}</span>
    } else {
      const {title, label, titleStyle, labelStyle} = this.props
      return (
        <Header>
          <Title style={titleStyle}>{title}</Title>
          {label && (
            <RightContent>
              <span style={labelStyle}>{label}</span>
            </RightContent>
          )}
        </Header>
      )
    }
  }

  render() {
    const {loading} = this.state
    const {id, onLaneClick, index, droppable, ...otherProps} = this.props
    const isDropDisabled = !droppable
    return (
      <Droppable droppableId={id} type="card" index={index} isDropDisabled={isDropDisabled}>
        {(dropProvided, dropSnapshot) => {
          const isDraggingOver = dropSnapshot.isDraggingOver
          return (
            <Section
              {...otherProps}
              key={id}
              onClick={() => onLaneClick && onLaneClick(id)}
              innerRef={ref => this.laneDidMount(ref, dropProvided.innerRef)}
              isDraggingOver={isDraggingOver}
              {...dropProvided.draggableProps}>
              {this.renderHeader()}
              {this.renderDragContainer()}
              {loading && <Loader />}
            </Section>
          )
        }}
      </Droppable>
    )
  }
}

Lane.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.node,
  index: PropTypes.number,
  laneSortFunction: PropTypes.func,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  cards: PropTypes.array,
  label: PropTypes.string,
  droppable: PropTypes.bool,
  onLaneScroll: PropTypes.func,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func,
  onCardClick: PropTypes.func,
  onCardDelete: PropTypes.func,
  onCardAdd: PropTypes.func,
  newCardTemplate: PropTypes.node,
  addCardLink: PropTypes.node,
  editable: PropTypes.bool
}

Lane.defaultProps = {
  style: {},
  titleStyle: {},
  labelStyle: {},
  label: undefined,
  editable: false,
  onCardAdd: () => {}
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(laneActions, dispatch)
})

export default connect(null, mapDispatchToProps)(Lane)
