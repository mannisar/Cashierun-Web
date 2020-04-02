import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form } from 'react-bootstrap';

import { createCategory } from '../../../redux/actions/category';

class Add extends Component {
    state = {
        name: ""
    }

    onChangeValue = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = async (event) => {
        event.preventDefault()
        const data = {
            name: this.state.name
        }
        await this.props.dispatch(createCategory(data))
        await this.props.onHide()
    }

    render() {
        const { show, onHide } = this.props
        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>ADD CATEGORY</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group>
                            <Form.Label>NAME</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" name="name" onChange={this.onChangeValue} />
                        </Form.Group>
                        <button className="btn btn" style={{ width: "97%" }} type="submit">SUBMIT</button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default connect()(Add);