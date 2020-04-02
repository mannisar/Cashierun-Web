import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form } from 'react-bootstrap';

import { changePassword } from '../../../redux/actions/account'

class Password extends Component {
    state = {
        id: "",
        password: ""
    }

    componentWillReceiveProps({ account }) {
        this.setState({
            id: account.id,
            // password: account.password
        })
    }

    onChangeValue = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = async (event) => {
        event.preventDefault()
        const id = this.state.id
        const data = {
            password: this.state.password
        }
        await this.props.dispatch(changePassword(id, data))
        await this.props.onHide()
    }

    render() {
        const { show, onHide } = this.props
        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>CHANGE PASSWORD</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group>
                            <Form.Label>PASSWORD</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" name="password" onChange={this.onChangeValue} value={this.state.password} />
                        </Form.Group>
                        <button className="btn btn" type="submit">SUBMIT</button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default connect()(Password);