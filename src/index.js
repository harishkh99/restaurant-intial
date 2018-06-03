import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './Theme';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Router>
            <App />
        </Router>
    </MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
