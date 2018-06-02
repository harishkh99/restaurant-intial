import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import store, { history } from './store';
import App from './containers/app';

import 'sanitize.css/sanitize.css';
import './index.css';

const target = document.querySelector('#root');

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <App />
        </div>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>,
  target
);
