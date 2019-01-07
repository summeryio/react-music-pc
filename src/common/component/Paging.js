import React, { Component } from 'react'
import { Pagination } from 'antd'

export default class Paging extends Component {
    constructor(props) {
        super(props)
    }
    
    render () {
        let {commentPaging, total, id, urlType} = this.props
        
        return (
            <div id="paging">
                <Pagination 
                    defaultCurrent={1} 
                    total={total}
                    pageSize={20}
                    onChange={(page, pageSize) => {
                        commentPaging(id, page, urlType)
                    }}
                />
            </div>
        )
    }
}
