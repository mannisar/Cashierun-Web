import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form } from 'react-bootstrap';

import { updateAccount } from '../../../redux/actions/account'

class Edit extends Component {
    state = {
        id: "",
        name: "",
        email: "",
        id_role: "",
        image: ""
    }

    componentWillReceiveProps({ account }) {
        this.setState({
            id: account.id,
            name: account.name,
            email: account.email,
            id_role: account.id_role,
            // image: account.image
        })
    }

    onChangeValue = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onChangeImage = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    }

    onSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData();
        data.append("name", this.state.name);
        data.append("email", this.state.email);
        data.append("id_role", this.state.id_role);
        data.append("image", this.state.image);

        if (this.state.image === "") {
            data.delete("image")
            const id = this.state.id
            await this.props.dispatch(updateAccount(id, data))
            await this.props.onHide()
        } else {
            const id = this.state.id
            await this.props.dispatch(updateAccount(id, data))
            await this.props.onHide()
        }
    }

    render() {
        const { show, onHide, roles } = this.props
        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>EDIT ACCOUNT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.onSubmit} encType="multipart/form-data">
                        <Form.Group>
                            <Form.Label>NAME</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" name="name" onChange={this.onChangeValue} value={this.state.name} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>EMAIL</Form.Label>
                            <Form.Control type="text" placeholder="Enter Email" name="email" onChange={this.onChangeValue} value={this.state.email} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ROLE</Form.Label>
                            <Form.Control type="text" placeholder="Enter Role" name="id_role" onChange={this.onChangeValue} defaultValue={this.state.id_role} as="select">
                                <option value="DEFAULT" disabled>Choose..</option>
                                {roles.map((role) =>
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>IMAGE</Form.Label>
                            <Form.Control type="file" name="image" onChange={this.onChangeImage} />
                        </Form.Group>
                        <button className="btn btn" style={{ width: "97%" }} type="submit">SUBMIT</button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default connect()(Edit);