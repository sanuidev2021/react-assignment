import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider as QueryProvider, createClient,defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import 'react-toastify/dist/ReactToastify.css';

const URL = 'https://react.eogresources.com/graphql';
const WS_URL = 'ws://react.eogresources.com/graphql';
const Root = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
    <QueryProvider value={client}>
    </QueryProvider>
    </Provider>
  </MuiThemeProvider>
);

const subscriptionClient = new SubscriptionClient(WS_URL, {
  reconnect: true,
});

export const client = createClient({
  url: URL,
  exchanges:[
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    }),
  ],
});

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});


export default Root;
