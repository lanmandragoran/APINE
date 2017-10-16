import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class OpponentFrame extends Component {
  render() {
    return (
            <img src={this.props.opponentImage}/>
    )
  }
}

OpponentFrame.propTypes = {
  opponent: PropTypes.string
}