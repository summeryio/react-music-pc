import React, { Component } from 'react'

export default class BackTop extends Component {
    constructor(props) {
        super(props)

        this.state = {
            codeType: false
        }

        this.bindScroll = this.bindScroll.bind(this)
        this.back = this.back.bind(this)
    }
    
    componentDidMount() {
        window.addEventListener('scroll', this.bindScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.bindScroll.bind(this))
        this.setState = (state, callback)=>{
            return
        }
    }
    
    render() {
        return (
            this.state.codeType
            ? (<div id="m_back" onClick={ev => this.back()}><a href="javascript: void(0);" className="icon-four" title="返回顶部"></a></div>) : null
        )
    }

    bindScroll(ev) {
        let scrollTop = (ev.srcElement ? ev.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (ev.srcElement ? ev.srcElement.body.scrollTop : false)
        let clientH = (ev.srcElement ? ev.srcElement.documentElement.clientHeight : false) || document.body.clientHeight
        let scrollH = (ev.srcElement ? ev.srcElement.documentElement.scrollHeight : false) || document.body.scrollHeight

        if (scrollTop > 0 && scrollH > clientH) {
            this.setState({
                codeType: true
            })
        } else {
            this.setState({
                codeType: false
            })
        }
    }

    back() {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
    }
}
