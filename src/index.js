import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import 'semantic-ui-css/semantic.min.css';
import './index.css';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
    
    <Provider store={store}>
        
            <App />
        
    </Provider>        
    
    ,document.getElementById('root'));
    registerServiceWorker();
