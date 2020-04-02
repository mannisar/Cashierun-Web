import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form } from 'react-bootstrap';

import { createProduct } from '../../../redux/actions/product'

class Add extends Component {
    state = {
        name: "",
        description: "",
        price: "",
        available: "",
        id_category: "",
        image: "",
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
        event.preventDefault();
        const data = new FormData();
        data.append("name", this.state.name);
        data.append("description", this.state.description);
        data.append("price", this.state.price);
        data.append("available", this.state.available);
        data.append("id_category", this.state.id_category);
        data.append("image", this.state.image);

        if (this.state.image === "") {
            data.delete("image")
            await this.props.dispatch(createProduct(data));
            await this.props.onHide();
        } else {
            await this.props.dispatch(createProduct(data));
            await this.props.onHide();
        }
    }

    render() {
        const { show, onHide, categorys } = this.props
        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>ADD PRODUCT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.onSubmit} encType="multipart/form-data">
                        <Form.Group>
                            <Form.Label>NAME</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" name="name" onChange={this.onChangeValue} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>DESCRIPTION</Form.Label>
                            <Form.Control type="text" placeholder="Enter Description" name="description" onChange={this.onChangeValue} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>PRICE</Form.Label>
                            <Form.Control type="text" placeholder="Enter Price" name="price" onChange={this.onChangeValue} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>QUANTITY</Form.Label>
                            <Form.Control type="text" placeholder="Enter Quantity" name="available" onChange={this.onChangeValue} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>CATEGORY</Form.Label>
                            <Form.Control type="text" placeholder="Enter Category" name="id_category" onChange={this.onChangeValue} defaultValue={this.state.id_category} as="select">
                                <option value="DEFAULT" disabled>Choose..</option>
                                {categorys.map((category) =>
                                    <option key={category.id} value={category.id}>
                                        {category.name}
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

export default connect()(Add);