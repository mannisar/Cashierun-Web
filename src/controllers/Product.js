import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Table } from 'react-bootstrap';

import { readProduct } from '../redux/actions/product'
import { logout } from '../redux/actions/auth';

import Item from '../components/modal/product/Item';
import Add from '../components/modal/product/Add';
import Edit from '../components/modal/product/Edit';
import Delete from '../components/modal/product/Delete';
import Navbar from "../components/Navbar";

class Product extends Component {
  state = {
    showAdd: false,
    showEdit: false,
    showDelete: false,
    selectProductEdit: [],
    selectProductDelete: []
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    } else {
      const data = {
        limit: 100
      }
      this.props.dispatch(readProduct(data))
    }
  }

  onShowAdd = (event) => {
    this.setState({
      showAdd: true
    })
  }

  onCloseAdd = () => {
    this.setState({
      showAdd: false
    })
  }

  onShowEdit = (event) => {
    this.setState({
      showEdit: true
    })
  }

  onCloseEdit = () => {
    this.setState({
      showEdit: false
    })
  }

  onSelectProductEdit = (product) => {
    this.setState({
      selectProductEdit: product,
      showEdit: true
    })
  }

  onShowDelete = event => {
    this.setState({
      showDelete: true
    })
  }

  onCloseDelete = () => {
    this.setState({
      showDelete: false
    })
  }

  onSelectProductDelete = (product) => {
    this.setState({
      selectProductDelete: product,
      showDelete: true
    })
  }

  onLogout() {
    this.props.dispatch(logout());
    this.props.history.push('/login');
  }

  render() {
    const { products, categorys } = this.props;
    const listproducts = products.map((product) => <Item key={product.id} product={product} onSelectProductEdit={this.onSelectProductEdit} onSelectProductDelete={this.onSelectProductDelete} />);
    return (
      <Fragment>
        <Navbar onLogout={this.onLogout.bind(this)} />
        <Container style={{ marginTop: 24 }}>
          <Row style={{ display: 'block' }}>
            <Col style={{ width: "100%", height: "15%", maxHeight: "15%", minHeight: "15%", margin: 0, padding: 0 }}>
              <button className="btn btn" disabled="disabled"><span className="fa fa-cutlery" /></button>
              <button className="btn btn" style={{ float: 'right' }} onClick={this.onShowAdd}><span className="fa fa-plus" /></button>
            </Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>DESCRIPTION</th>
                  <th>PRICE</th>
                  <th>AVAILABLE</th>
                  <th>CATEGORY</th>
                  <th>IMAGE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {listproducts}
              </tbody>
            </Table>
          </Row>
          <Add show={this.state.showAdd} onHide={this.onCloseAdd} categorys={categorys} />
          <Edit show={this.state.showEdit} onHide={this.onCloseEdit} product={this.state.selectProductEdit} categorys={categorys} />
          <Delete show={this.state.showDelete} onHide={this.onCloseDelete} product={this.state.selectProductDelete} />
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    products: state.products.products,
    categorys: state.categorys.categorys
  }
}

export default withRouter(connect(mapStateToProps)(Product));