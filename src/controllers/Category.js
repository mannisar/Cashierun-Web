import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Table } from 'react-bootstrap';

import { logout } from '../redux/actions/auth';

import Navbar from "../components/Navbar";
import Item from '../components/modal/category/Item';
import Add from '../components/modal/category/Add';
import Edit from '../components/modal/category/Edit'
import Delete from '../components/modal/category/Delete'

class Category extends Component {
    state = {
        showAdd: false,
        showEdit: false,
        showDelete: false,
        selectCategoryEdit: [],
        selectCategoryDelete: []
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/login");
        }
    }

    onShowAdd = event => {
        this.setState({
            showAdd: true
        })
    }

    onCloseAdd = () => {
        this.setState({
            showAdd: false
        })
    }

    onShowEdit = event => {
        this.setState({
            showEdit: true
        })
    }

    onCloseEdit = () => {
        this.setState({
            showEdit: false
        })
    }

    onSelectCategoryEdit = category => {
        this.setState({
            selectCategoryEdit: category,
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

    onSelectCategoryDelete = category => {
        this.setState({
            selectCategoryDelete: category,
            showDelete: true
        })
    }

    onLogout() {
        this.props.dispatch(logout());
        this.props.history.push('/login');
    }

    render() {
        const { categorys } = this.props;
        const listcategorys = categorys.map((category) => <Item key={category.id} category={category} onSelectCategoryEdit={this.onSelectCategoryEdit} onSelectCategoryDelete={this.onSelectCategoryDelete} />)
        return (
            <Fragment>
                <Navbar onLogout={this.onLogout.bind(this)} />
                <Container style={{ marginTop: 24 }}>
                    <Row style={{ display: 'block' }}>
                        <Col style={{ width: "100%", height: "15%", maxHeight: "15%", minHeight: "15%", margin: 0, padding: 0 }}>
                            <button className="btn btn" disabled="disabled"><span className="fa fa-tags" /></button>
                            <button className="btn btn" style={{ float: 'right' }} onClick={this.onShowAdd}><span className="fa fa-plus" /></button>
                        </Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listcategorys}
                            </tbody>
                        </Table>
                    </Row>
                    <Add show={this.state.showAdd} onHide={this.onCloseAdd} />
                    <Edit show={this.state.showEdit} onHide={this.onCloseEdit} category={this.state.selectCategoryEdit} />
                    <Delete show={this.state.showDelete} onHide={this.onCloseDelete} category={this.state.selectCategoryDelete} />
                </Container>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        categorys: state.categorys.categorys
    }
}

export default withRouter(connect(mapStateToProps)(Category));