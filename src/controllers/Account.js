import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col, Table } from 'react-bootstrap';

import { logout } from '../redux/actions/auth';

import Navbar from "../components/Navbar";
import Item from '../components/modal/account/Item';
import Add from '../components/modal/account/Add';
import Edit from '../components/modal/account/Edit'
import Delete from '../components/modal/account/Delete'
import Password from '../components/modal/account/Password'

class Account extends Component {
    state = {
        showAdd: false,
        showEdit: false,
        showDelete: false,
        showPassword: false,
        selectAccountEdit: [],
        selectAccountDelete: [],
        selectAccountPassword: []
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

    onCloseEdit = () => {
        this.setState({
            showEdit: false
        })
    }

    onSelectAccountEdit = account => {
        this.setState({
            selectAccountEdit: account,
            showEdit: true
        })
    }

    onCloseDelete = () => {
        this.setState({
            showDelete: false
        })
    }

    onSelectAccountDelete = account => {
        this.setState({
            selectAccountDelete: account,
            showDelete: true
        })
    }

    onClosePassword = () => {
        this.setState({
            showPassword: false
        })
    }

    onSelectAccountPassword = account => {
        this.setState({
            selectAccountPassword: account,
            showPassword: true
        })
    }

    onLogout() {
        this.props.dispatch(logout());
        this.props.history.push('/login');
    }

    render() {
        const { accounts, roles } = this.props;
        const listaccounts = accounts.map((account) => <Item key={account.id} account={account} onSelectAccountEdit={this.onSelectAccountEdit} onSelectAccountDelete={this.onSelectAccountDelete} onSelectAccountPassword={this.onSelectAccountPassword} />)
        return (
            <Fragment>
                <Navbar onLogout={this.onLogout.bind(this)} />
                <Container style={{ marginTop: 24 }}>
                    <Row style={{ display: 'block' }}>
                        <Col style={{ width: "100%", height: "15%", maxHeight: "15%", minHeight: "15%", margin: 0, padding: 0 }}>
                            <button className="btn btn" disabled="disabled"><span className="fa fa-users" /></button>
                            <button className="btn btn" style={{ float: 'right' }} onClick={this.onShowAdd}><span className="fa fa-plus" /></button>
                        </Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ROLE</th>
                                    <th>IMAGE</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaccounts}
                            </tbody>
                        </Table>
                    </Row>
                    <Add show={this.state.showAdd} onHide={this.onCloseAdd} roles={roles} />
                    <Edit show={this.state.showEdit} onHide={this.onCloseEdit} account={this.state.selectAccountEdit} roles={roles} />
                    <Delete show={this.state.showDelete} onHide={this.onCloseDelete} account={this.state.selectAccountDelete} />
                    <Password show={this.state.showPassword} onHide={this.onClosePassword} account={this.state.selectAccountPassword} />
                </Container>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        accounts: state.accounts.accounts,
        roles: state.roles.roles
    }
}

export default withRouter(connect(mapStateToProps)(Account));