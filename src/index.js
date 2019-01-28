import 'babel-polyfill'
import 'react-app-polyfill/ie9';
import 'core-js/es6/map';
import 'core-js/es6/set';


import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'
import {Route} from 'react-router'
import configureStore, {history} from 'reduxes/configureStore'
import axios from 'axios'
import PropTypes from 'prop-types'
import {URL_HEADER, HTTP_SUCCESS_CODE} from 'common/js/constant'


import 'common/css/style.scss'
import RouterIndex from 'router/RouterIndex'

const store = configureStore()

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                code: 301,
                data: {}
            }
        }
    }

    getChildContext() {
        return {
            user: this.state.user
        }
    }

    componentDidMount() {
        console.log("%c 小扇引微凉，悠悠夏日长。", "color: rgb(95, 164, 205); font-family: 'Microsoft Yahei'")
        
        axios.get(`${URL_HEADER}/login/status`, {withCredentials: true}).then((res) => {
            
            if (res.status === HTTP_SUCCESS_CODE) {
                this.setState({
                    user: {
                        code: res.status,
                        data: res.data
                    }
                })

                sessionStorage.setItem('code', res.status)
                sessionStorage.setItem('data', JSON.stringify(res.data.profile))
            }
        }).catch(error => {
            this.setState({
                user: {
                    code: 301,
                    data: {}
                }
            })
            // console.log(error);
        })
    }

    render() {
        return (
            <RouterIndex user={this.state.user} />
        )
    }
}

App.childContextTypes = {
    user: PropTypes.object
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('summeryio')
)