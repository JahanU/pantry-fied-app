import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import { ApolloProvider } from 'react-apollo';

import './index.css';

import * as serviceWorker from './serviceWorker';
import Routes from './routes';
import client from './apollo';

WebFont.load({
    google: {
        families: ['Open Sans', 'sans-serif'],
    },
});

const App = (
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
serviceWorker.unregister();
