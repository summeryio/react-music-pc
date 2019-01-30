import 'babel-polyfill'
import 'react-app-polyfill/ie9';
import 'core-js/es6/map';
import 'core-js/es6/set';

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'
import configureStore, {history} from 'reduxes/configureStore'
import App from './App'


import 'common/css/style.scss'

const store = configureStore()

console.log("%c 小扇引微凉，悠悠夏日长。", "color: rgb(95, 164, 205); font-family: 'Microsoft Yahei'")

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('summeryio')
)