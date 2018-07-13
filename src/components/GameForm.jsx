import React, { Component } from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {saveGame} from './../actions'

class GameForm extends Component {
    state = {
        title: '',
        cover: '',
        errors: {},
        loading: false
    }

    handleChange = e => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors)
            delete errors[e.target.name]
            this.setState({
                [e.target.name]: e.target.value,
                errors
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value,
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        const {title, cover} = this.state
        let errors = {}
        if(title.length === 0) errors.title = '不能为空'
        if(cover.length === 0) errors.cover = '不能为空'
        this.setState({errors})

        const isValid = Object.keys(errors).length === 0
        if(isValid) {
            this.setState({ loading: true })
            this.props.saveGame({title, cover})
        }
    }

    render(){
        const {title, cover, errors} = this.state
        return (
            <form onSubmit={this.handleSubmit} className={ classnames('ui', 'form', { loading: this.state.loading }) }>
                <h1>Add new game</h1>

                <div className={classnames('field', {error: !!errors.title})}>
                    <label htmlFor="title">Title</label>
                    <input onChange={this.handleChange} type="text" name="title" value={title}/>
                    <span>{errors.title}</span>
                </div>

                <div className={classnames('field', {error: !!errors.cover})}>
                    <label htmlFor="title">Cover Url</label>
                    <input onChange={this.handleChange} type="text" name="cover" value={cover}/>
                    <span>{errors.cover}</span>
                </div>

                <div className="field">
                    {
                        cover !== '' && <img src={cover} alt="cover" className="ui small bordered image"/>
                    }
                </div>

                <div className="field">
                    <button className="ui primary button">Save</button>
                </div>
            </form>
        )
    }
}

export default connect(null, {saveGame})(GameForm)
