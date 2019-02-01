import React, { Component } from 'react'

export default class EmptyData extends Component {
    render () {
        let {tip} = this.props
        
        return (
            <div id="empty_data">
                {tip}
                <i className="icon-three"></i>
            </div>
        )
    }
}
