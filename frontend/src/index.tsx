import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from "@material-ui/styles";
import * as serviceWorker from './serviceWorker';
import Themes from "./themes";
import { Provider } from 'react-redux';
import store from './store/store';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={Themes.default}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
