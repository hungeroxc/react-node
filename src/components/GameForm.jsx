import React, { Component } from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {saveGame, fetchOneGame, editGame} from './../actions'
import {Redirect} from 'react-router-dom'

class GameForm extends Component {
    state = {
        _id: this.props.game ? this.props.game._id : '',
        title: this.props.game ? this.props.game.title : '',
        cover: this.props.game ? this.props.game.cover : '',
        errors: {},
        loading: false,
        done: false
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
        const {title, cover, _id} = this.state
        let errors = {}
        if(title.length === 0) errors.title = '不能为空'
        if(cover.length === 0) errors.cover = '不能为空'
        this.setState({errors})

        const isValid = Object.keys(errors).length === 0
        if(isValid) {
            this.setState({ loading: true })
            if(_id) {
                this.props.editGame({title, cover, _id})
                .then(() => {
                    this.setState({ done: true })
                }, err => {
                    err.res.json().then(({errors}) => {
                        this.setState({errors, loading: false})
                    })
                })
            } else {

                this.props.saveGame({title, cover})
                .then(() => {
                    this.setState({ done: true })
                }, err => {
                    err.res.json().then(({errors}) => {
                        this.setState({errors, loading: false})
                    })
                })
            }
        }
    }

    componentDidMount() {
        const {match} = this.props
        console.log(match)
        if(match.params._id) {
            this.props.fetchOneGame(match.params._id)
        }
    }

    componentDidUpdate(preProps) {
        if(preProps.game !== this.props.game) {
            const {_id, title, cover} = this.props.game
            this.setState({
                _id,
                title,
                cover
            })
        }
    }

    render(){
        const {title, cover, errors, done} = this.state
        const {_id} = this.props.match.params
        const form = (
            <form onSubmit={this.handleSubmit} className={ classnames('ui', 'form', { loading: this.state.loading }) }>
                <h1>{_id ? 'Edit ' : 'Add new '}game</h1>

                { 
                    !!errors.global && <div className="ui negative message">{errors.global}</div>
                }

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
        return (
            <div>
                {
                    done ? <Redirect to="/games" /> : form
                }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const {match} = props
    if(match.params._id) {
        return {
            game: state.games.find(item => item._id === match.params._id)
        }
    }
    return { game: null }
}

export default connect(mapStateToProps, {saveGame, fetchOneGame, editGame})(GameForm)
