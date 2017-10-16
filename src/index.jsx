import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import 'babel-polyfill'
import Root from './containers/Root'

ReactDOM.render(
  <AppContainer>
    <Root/>
  </AppContainer>,
  document.getElementById('root')
);



// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    ReactDOM.render(
      <AppContainer>
      <Root />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
