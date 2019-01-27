import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'

import reducers from './reducer'

const rootReducer = combineReducers({
    ...reducers,
    router: routerReducer // 路由也由redux来管理
})

const history = createHistory()
export {history}

const routerML = routerMiddleware(history)


export default function configureStore() {
    if (process.env.NODE_ENV === 'production') {
        return createStore(
            rootReducer,
            compose(
                applyMiddleware(thunk, routerML)
            )
        )
    } else {
        return createStore(
            rootReducer,
            compose(
                applyMiddleware(thunk, routerML),
                // window.devToolsExtension ? window.devToolsExtension() : f => f
                window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
            )
        )
    }
}