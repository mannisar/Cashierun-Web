import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import './Login.css'

import { login } from '../redux/actions/auth';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    onChange = event => {
        event.preventDefault()
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = async event => {
        event.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        await this.props.dispatch(login(data));
        await this.props.history.push("/");
    }

    render() {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">

                    <div className="fadeIn first">
                        <img src="/Icon.png" style={{ width: "100%", height: "100%", padding: 28 }} id="icon" alt="User Icon" />
                    </div>

                    <form>
                        <input type="text" id="email" className="fadeIn second text" name="email" onChange={this.onChange} placeholder="Email" />
                        <input type="password" id="password" className="fadeIn third password" name="password" onChange={this.onChange} placeholder="Password" />
                        <input type="submit" className="fadeIn fourth" value="Login" style={{ fontWeight: 'bold', color: "#4f3961" }} onClick={this.onSubmit} />
                    </form>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps)(Login));