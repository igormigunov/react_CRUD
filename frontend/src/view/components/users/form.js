import React, {Component} from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {saveUser, fetchUser} from '../../../actions';
import {Redirect} from 'react-router-dom'

class UserForm extends Component {
    state = {
        id: this.props.user ? this.props.user.id : null,
        login: this.props.login ? this.props.user.login : "",
        name: this.props.name ? this.props.user.name : "",
        password: "",
        errors: {},
        loading: false,
        redirect: false
    }
    componentWillReceiveProps = (nextProps) => {
        this.setState({
            id: nextProps.user.id,
            login: nextProps.user.login,
            name: nextProps.user.name
        });
    }
    componentDidMount = () => {
        const {match} = this.props;
        if (match.params.id) {
            this.props.fetchUser(match.params.id);
        }
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let errors = {}
        if (this.state.login === "") errors.login = "This field is required!"
        if (this.state.name === "") errors.name = "This field is required!"
        if (this.state.password === "" && !this.state.id) errors.password = "This field is required!"
        this.setState({errors: errors})

        const isValid = Object.keys(errors).length === 0

        if (isValid) {
            const {login, name, password, id} = this.state
            this.setState({loading: true})
            this.props.saveUser({id, login, name, password}).then((res) => this.setState({
                loading: false,
                redirect: true
            }))
        }
    }
    render() {
        const Form = (
            <form onSubmit={this.handleSubmit}>
                    <span className={classnames('glyphicon glyphicon-refresh gly-ani', {'hide': !this.state.loading})}
                          style={{fontSize: '40px'}}></span>

                <div className={classnames('form-group', {'has-error': !!this.state.errors.login})}>
                    <label className="control-label">Login</label>
                    <input type="text" name="login" value={this.state.login} onChange={this.handleChange}
                           className="form-control"/>
                    <span className="help-block">{this.state.errors.login}</span>
                </div>

                <div className={classnames('form-group', {'has-error': !!this.state.errors.name})}>
                    <label className="control-label">Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange}
                           className="form-control"/>
                    <span className="help-block">{this.state.errors.name}</span>
                </div>

                <div className={classnames('form-group', {'has-error': !!this.state.errors.password})}>
                    <label className="control-label">Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange}
                           className="form-control"/>
                    <span className="help-block">{this.state.errors.password}</span>
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        )
        return (
            <div>
                {this.state.redirect ? <Redirect to="/users"/> : Form}
            </div>
        );
    }
}
function mapStateToProps(state, props) {
    const {match} = props;
    if (match.params.id) {
        return {
            user: state.users.find(item => item.id === parseInt(match.params.id))
        }
    }

    return {user: null};
}

export default connect(mapStateToProps, {saveUser, fetchUser})(UserForm);
