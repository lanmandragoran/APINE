import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class DealerDraw extends Component {
  render() {
    return (
        <div>
            <img src={this.props.cardImage}/>
        </div>
    )
  }
}

DealerDraw.propTypes = {
  cardImage: PropTypes.string.isRequired
}