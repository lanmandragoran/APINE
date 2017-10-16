import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    selectOpponent,
    fetchOpponentIfNeeded,
    genDecksIfNeeded
} from '../actions'

import Picker from '../components/Picker'
import OpponentFrame from '../components/OpponentFrame'

class AsyncApp extends Component {
    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const { dispatch, selectedOpponent} = this.props
        dispatch(fetchOpponentIfNeeded(selectedOpponent))
        dispatch(genDecksIfNeeded(1))
      }

    componentDidUpdate(prevProps) {
        if(this.props.selectedOpponent !== prevProps.selectedOpponent) {
            const {dispatch, selectedOpponent} = this.props
            dispatch(fetchOpponentIfNeeded(selectedOpponent))
        }
    }

    handleChange(nextOpponent) {
        this.props.dispatch(selectOpponent(nextOpponent))
    }

    render() {
        const {selectedOpponent, opponent, isFetching, lastUpdated} = this.props
        return (
                <div>
                    <Picker
                        value={selectedOpponent}
                        onChange={this.handleChange}
                        options={['Greg', 'Steve']}
                    />
                    <p>
                    {lastUpdated &&
                        <span>
                            Last Updated at: {new Date(lastUpdated).toLocaleTimeString()}
                        {' '}
                        </span>}
                    </p>
                        {isFetching && <h2>Loading</h2>}
                    <p>
                        {opponent !== '' && <OpponentFrame opponentImage={opponent}/>}
                    </p>
                    
                </div>
            )
    }
}

    AsyncApp.propTypes = {
        selectedOpponent: PropTypes.string.isRequired,
        opponent: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired,
      }
      
      function mapStateToProps(state) {
        const { selectedOpponent, opponentImageByOpponentName } = state

        const {
            isFetching,
            lastUpdated,
            choices: opponent
          } = opponentImageByOpponentName[selectedOpponent] || {
            isFetching: true,
            choices: []
          }

        return {
          selectedOpponent,
          opponent,
          isFetching,
          lastUpdated,
        }
      }
      
      export default connect(mapStateToProps)(AsyncApp)