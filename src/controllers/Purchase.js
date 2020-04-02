import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Table, Modal, OverlayTrigger, Popover } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

import { logout } from '../redux/actions/auth';
import { historyCard, historyChart, historyTable, historyTableDetail } from '../redux/actions/purchase';

import Navbar from "../components/Navbar";
import TableItem from "../components/modal/purchase/TableItem"

class Purchase extends Component {
    state = {
        show: false,
        card: [],
        chart: [],
        month: null,
        total: null
    }

    async componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            await this.props.dispatch(historyCard())
            await this.props.dispatch(historyChart())
            await this.props.dispatch(historyTable())
            await this.setState({
                card: this.props.historyCard[0],
                chart: this.props.historyChart
            })
            const month = []
            const total = []
            await this.state.chart.forEach(function (item) {
                month.push(item.MONTH)
                total.push(item.TOTAL)
            })
            this.setState({
                month: month,
                total: total
            })
        } else {
            this.props.history.push("/login");
        }
    }

    onSelectDetail = (id) => {
        this.setState({
            show: true
        })
        this.props.dispatch(historyTableDetail(id))
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    onLogout() {
        this.props.dispatch(logout());
        this.props.history.push('/login');
    }

    render() {
        const data_today = (
            <Popover style={{ textAlign: 'center' }} id="popover-basic">
                <Popover.Title style={{ fontSize: 24 }} as="h1">{this.state.card.todayorder} PURCHASE</Popover.Title>
                <Popover.Content style={{ fontSize: 24 }}>Rp. {this.state.card.today}</Popover.Content>
            </Popover>
        );
        const data_weekly = (
            <Popover style={{ textAlign: 'center' }} id="popover-basic">
                <Popover.Title style={{ fontSize: 24 }} as="h1">{this.state.card.weeklyorder} PURCHASE</Popover.Title>
                <Popover.Content style={{ fontSize: 24 }}>Rp. {this.state.card.weekly}</Popover.Content>
            </Popover>
        );
        const data_monthly = {
            labels: this.state.month, // ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember'],
            datasets: [
                {
                    label: 'MONTHLY INCOME',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 4,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 12,
                    pointHitRadius: 10,
                    data: this.state.total
                }
            ]
        }
        const { historyTable, historyTableDetail } = this.props;
        const listtable = historyTable.map((table) => <TableItem key={table.id} table={table} onSelectDetail={this.onSelectDetail} />)
        const modaldetail = historyTableDetail.map((table) => {
            return (
                <Modal.Body key={table.id}>
                    <Row style={{ marginBottom: "15px", borderLeft: "dashed" }}>
                        <Col>{table.product} {table.quantity}x <span style={{ fontWeight: "bolder" }}>{table.price}</span></Col>
                    </Row>
                </Modal.Body>
            );
        })
        return (
            <Fragment>
                <Navbar onLogout={this.onLogout.bind(this)} />
                <Container style={{ marginTop: 24 }}>
                    <Row style={{ display: "block", maxHeight: "35%", textAlign: "center" }}>
                        <OverlayTrigger trigger="click" placement="bottom" overlay={data_today}>
                            <button className="btn btn" style={{ width: 425, height: 100, fontSize: 30 }}>TODAY INCOME</button>
                        </OverlayTrigger>
                        <OverlayTrigger trigger="click" placement="bottom" overlay={data_weekly}>
                            <button className="btn btn" style={{ width: 425, height: 100, fontSize: 30 }}>WEEKLY INCOME</button>
                        </OverlayTrigger>
                    </Row>
                    <Row>
                        <Line data={data_monthly} />
                    </Row>
                    <Row>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID PURCHASE</th>
                                    <th>CASHIER</th>
                                    <th>TOTAL</th>
                                    <th>DATE</th>
                                    <th>DETAIL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listtable}
                            </tbody>
                        </Table>
                    </Row>
                </Container>
                <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                    {modaldetail}
                    <Modal.Footer>
                        <button className="btn btn" style={{ width: '100%' }} onClick={this.handleClose}>Close</button>
                    </Modal.Footer>
                </Modal>
            </Fragment >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        historyCard: state.purchases.historyCard,
        historyChart: state.purchases.historyChart,
        historyTable: state.purchases.historyTable,
        historyTableDetail: state.purchases.historyTableDetail
    }
}

export default withRouter(connect(mapStateToProps)(Purchase));