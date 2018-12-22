import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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
        axios.get(`${URL_HEADER}/login/status`, {withCredentials: true}).then((res) => {
            
            if (res.status === HTTP_SUCCESS_CODE) {
                console.log(res);
                this.setState({
                    user: {
                        code: res.status,
                        data: res.data
                    }
                })
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
    document.getElementById('root')
)