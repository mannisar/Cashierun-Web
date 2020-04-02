import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Row, Col, Modal, Form } from 'react-bootstrap';

import { addQty, reduceQty, deleteCart, cancleCart } from '../redux/actions/cart'
import { purchase } from '../redux/actions/purchase'
import { readProduct } from '../redux/actions/product';

import Item from '../components/modal/cart/Item'

class Cart extends Component {
    state = {
        show: false,
        count: 0,
        id_account: parseInt(this.props.auth.profile.id),
        name: this.props.auth.profile.name
    };

    onAddQty = (id) => {
        this.props.dispatch(addQty(id))
    }

    onReduceQty = (id) => {
        this.props.dispatch(reduceQty(id))
    }

    onDeleteCart = (id) => {
        this.props.dispatch(deleteCart(id))
    }

    onCancleCart = async (data) => {
        await this.setState({
            show: false
        })
        await this.props.dispatch(cancleCart(data))
        await this.props.dispatch(readProduct(data))
    }

    onCloseCart = async (data) => {
        await this.setState({
            show: false
        })
        await this.props.dispatch(cancleCart(data))
        await this.props.dispatch(readProduct(data))
    }

    onHistory = async (data) => {
        await this.setState({
            show: false
        })
        await this.props.dispatch(cancleCart(data))
        await this.props.history.push('/history')
    }

    handleShow = () => {
        this.setState({
            show: true
        })
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    onSubmit = async (event) => {
        event.preventDefault()
        this.setState({
            show: true
        })
        const data = {
            id_account: this.state.id_account,
            total: this.props.total,
            product: this.props.carts
        }
        await this.props.dispatch(purchase(data))
        // alert(this.props.purchases)
    }

    render() {
        const { carts, total } = this.props;
        const listcarts = carts.map((product) => {
            return (
                <Item key={product.id} product={product} AddQty={this.onAddQty} ReduceQty={this.onReduceQty} DeleteCart={this.onDeleteCart} />
            )
        })
        const itemCheckout = carts.map((product) => {
            return (
                <Row style={{ marginBottom: "15px", borderLeft: "dashed" }} key={product.id}>
                    <Col>{product.name} {product.quantity}x <span style={{ fontWeight: "bolder" }}>{this.convertToRupiah(product.price)}</span></Col>
                </Row>
            );
        })
        const CartMenu = () => {
            if (carts.length <= 0) {
                return (
                    <Fragment>
                        <img src="/Cart.png" alt="" style={{ width: "100%", maxHeight: "100%", marginTop: "80px" }} />
                    </Fragment>
                )
            } else {
                return (
                    <Fragment>
                        <div className="rowCart scrollCart">
                            <div className="col-3 mr-auto" style={{ margin: 0, padding: 0, flex: "none", maxWidth: "none" }}>
                                {listcarts}
                            </div>
                            <div className="col-9" style={{ margin: 0, padding: 0, flex: "none", maxWidth: "none" }}>
                                <Form onSubmit={this.onSubmit}>
                                    <Row style={{ fontWeight: "bold", marginTop: 10 }}>
                                        <Col sm={3} style={{ fontSize: 20 }}>Total: </Col>
                                        <Col sm={9} style={{ fontSize: 20 }}>{this.convertToRupiah(total)}</Col>
                                    </Row>
                                    <p style={{ marginTop: 10, marginLeft: 10, marginBottom: 10 }}> * Belum Termasuk ppn</p>
                                    <Row className="justify-content-md-center">
                                        <Col sm={12}>
                                            <button className="btn btn" style={{ width: "100%" }} type="submit">Checkout</button>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-md-center">
                                        <Col sm={12}>
                                            <button className="btn btn" style={{ width: "100%" }} onClick={() => (this.onCancleCart(carts))} type="button">Cancel</button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                            <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                                <Modal.Body>
                                    <Row>
                                        <Col style={{ fontSize: 17, marginBottom: "15px" }}>Checkout</Col>
                                        <Col style={{ fontSize: 17 }}>Receipt no: ?</Col>
                                    </Row>
                                    {itemCheckout}
                                    <Row>
                                        <p>
                                            <span style={{ fontSize: 17, marginRight: "90px" }}>Cashier: {this.state.name}</span>
                                            <span style={{ fontSize: 17, fontStyle: "italic" }}>Total: {this.convertToRupiah(total)}</span>
                                        </p>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer style={{ display: "block" }}>
                                    <button className="btn btn" onClick={() => (this.onCloseCart(carts))}>Close</button>
                                    <button className="btn btn" style={{ float: "right" }} type="submit" onClick={() => (this.onHistory(carts))}>History</button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </Fragment >
                )
            }
        }
        return (
            <Fragment>
                <nav className="navbar navbar-light bg-blue" style={{ display: 'block', textAlign: 'center', maxHeight: 60 }}>
                    <span className="navbar-text" style={{ fontSize: 24, color: '#4f3961', marginTop: '-6px' }}>
                        <span className="fa fa-shopping-cart" style={{ fontSize: 28 }}></span> <span className={this.getBadgeClasses()}>{carts.length}</span>
                    </span>
                </nav>
                <CartMenu />
            </Fragment >
        )
    }
    getBadgeClasses() {
        let classes = "badge badge-";
        classes += this.state.count === this.props.carts.length ? "#4f3961" : "danger";
        return classes;
    }
    convertToRupiah(angka) {
        var rupiah = '';
        var angkarev = angka.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.';
        return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('') + ',-';
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        carts: state.carts.carts,
        orders: state.carts.orders,
        total: state.carts.total,
        // purchases: state.purchases.messages
    }
}

export default withRouter(connect(mapStateToProps)(Cart));