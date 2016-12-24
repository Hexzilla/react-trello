import React, {Component} from 'react'
import Loader from './Loader'
import Card from './Card'
import {Section, Header, Title, RightContent, DraggableList} from '../styles/Base'

export default class Lane extends Component {

  state = {cards: this.props.cards, loading: false}

  handleScroll = (evt) => {
    const node = evt.target
    const elemScrolPosition = node.scrollHeight - node.scrollTop - node.clientHeight
    const {onScroll} = this.props
    if (elemScrolPosition <= 0 && onScroll) {
      const {cards} = this.state
      this.setState({loading: true})
      onScroll(this.lastCardId(), this.props.id).then((moreCards) => {
        this.setState({cards: [...cards, ...moreCards], loading: false})
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({cards: nextProps.cards})
  }

  laneDidMount = (node) => {
    if (node) {
      node.addEventListener('scroll', this.handleScroll);
    }
  };

  lastCardId = () => {
    const {cards} = this.state
    return cards[cards.length - 1].key
  }

  render() {
    const {loading} = this.state
    const {title, rightHeader, cards, ...otherProps} = this.props
    return <Section {...otherProps} innerRef={this.laneDidMount}>
      <Header>
        <Title>{title}</Title>
        <RightContent>{rightHeader}</RightContent>
      </Header>
      <DraggableList>
        {this.state.cards && this.state.cards.map((card) => (
          <Card key={card.key}
                title={card.title}
                description={card.description}/>
        ))
        }
        {this.props.children}
      </DraggableList>
      {loading && <Loader/>}
    </Section>
  }
}

Lane.propTypes = {
  title: React.PropTypes.string.isRequired,
  cards: React.PropTypes.array,
  rightHeader: React.PropTypes.string,
  onScroll: React.PropTypes.func
}
