import React, { Component } from 'react';
import { connect } from "react-redux"
import { withRouter } from "react-router-dom";

import { readProduct } from '../redux/actions/product'
import querystring from 'query-string'

class Option extends Component {
    state = {
        product: "",
        category: "",
        sortBy: "",
        paginateId: "" || 1,
        totalPages: null
    }

    async componentDidMount() {
        const data = {}
        await this.props.dispatch(readProduct(data))
        await this.setState({
            totalPages: this.props.paginates.length,
        })
        let value = querystring.parse(this.props.location.search);
        let id = querystring.parse(this.props.location.search);
        if (value.product !== undefined || value.category !== undefined || value.sortBy !== undefined || id.paginateId !== undefined) {
            this.setState({
                product: value.product,
                category: value.category,
                sortBy: value.sortBy,
                paginateId: id.paginateId
            })
            const data = {
                product: value.product,
                category: value.category,
                sortBy: value.sortBy,
                paginateId: id.paginateId
            }
            this.props.dispatch(readProduct(data))
        }
    }

    onProduct = async event => {
        if (this.state.category !== undefined && this.state.sortBy !== undefined && this.state.paginateId !== undefined) {
            this.props.history.push(`/?product=${event.target.value}&category=${this.state.category}&sortBy=${this.state.sortBy}&paginateId=${this.state.paginateId}`)
        } else if (this.state.category !== undefined) {
            this.props.history.push(`/?product=${event.target.value}&category=${this.state.category}`)
        } else if (this.state.sortBy !== undefined) {
            this.props.history.push(`/?product=${event.target.value}&sortBy=${this.state.sortBy}`)
        } else if (this.state.paginateId !== undefined) {
            this.props.history.push(`/?product=${event.target.value}&paginateId=${this.state.paginateId}`)
        } else {
            this.props.history.push(`/?product=${event.target.value}`)
        }
        await this.setState({
            product: event.target.value
        })
        const data = {
            product: this.state.product,
            category: this.state.category,
            sortBy: this.state.sortBy,
            paginateId: this.state.paginateId
        }
        await this.props.dispatch(readProduct(data))
    }

    onCategory = async event => {
        if (this.state.product !== undefined && this.state.sortBy !== undefined && this.state.paginateId !== undefined) {
            this.props.history.push(`/?product=${this.state.product}&category=${event.target.value}&sortBy=${this.state.sortBy}&paginateId=${this.state.paginateId}`)
        } else if (this.state.product !== undefined) {
            this.props.history.push(`/?product=${this.state.product}&category=${event.target.value}`)
        } else if (this.state.sortBy !== undefined) {
            this.props.history.push(`/?category=${event.target.value}&sortBy=${this.state.sortBy}`)
        } else if (this.state.paginateId !== undefined) {
            this.props.history.push(`/?category=${event.target.value}&paginateId=${this.state.paginateId}`)
        } else {
            this.props.history.push(`/?category=${event.target.value}`)
        }
        await this.setState({
            category: event.target.value
        })
        const data = {
            product: this.state.product,
            category: this.state.category,
            sortBy: this.state.sortBy,
            paginateId: this.state.paginateId
        }
        this.props.dispatch(readProduct(data))
    }

    onSort = async event => {
        if (this.state.category !== undefined && this.state.product !== undefined && this.state.paginateId !== undefined) {
            this.props.history.push(`/?product=${this.state.product}&category=${this.state.category}&sortBy=${event.target.value}&paginateId=${this.state.paginateId}`)
        } else if (this.state.category !== undefined) {
            this.props.history.push(`/?category=${this.state.category}&sortBy=${event.target.value}`)
        } else if (this.state.product !== undefined) {
            this.props.history.push(`/?product=${this.state.product}&sortBy=${event.target.value}`)
        } else if (this.state.paginateId !== undefined) {
            this.props.history.push(`/?sortBy=${event.target.value}&paginateId=${this.state.paginateId}`)
        } else {
            this.props.history.push(`/?sortBy=${event.target.value}`)
        }
        await this.setState({
            sortBy: event.target.value
        })
        const data = {
            product: this.state.product,
            category: this.state.category,
            sortBy: this.state.sortBy,
            paginateId: this.state.paginateId
        }
        await this.props.dispatch(readProduct(data))
    }

    onId = async (event) => {
        if (this.state.product !== undefined && this.state.category !== undefined && this.state.sortBy !== undefined) {
            this.props.history.push(`/?product=${this.state.product}&category=${this.state.category}&sortBy=${this.state.sortBy}&paginateId=${event.target.id}`)
        } else if (this.state.category !== undefined) {
            this.props.history.push(`/?category=${this.state.category}&paginateId=${event.target.id}`)
        } else if (this.state.product !== undefined) {
            this.props.history.push(`/?product=${this.state.product}&paginateId=${event.target.id}`)
        } else if (this.state.sortBy !== undefined) {
            this.props.history.push(`/?sortBy=${this.state.sortBy}&paginateId=${event.target.id}`)
        } else {
            this.props.history.push(`/?paginateId=${event.target.id}`)
        }
        await this.setState({
            paginateId: event.target.id
        });
        const data = {
            product: this.state.product,
            category: this.state.category,
            sortBy: this.state.sortBy,
            paginateId: this.state.paginateId
        }
        await this.props.dispatch(readProduct(data))
    }

    onNext = async () => {
        if (this.state.product !== undefined && this.state.category !== undefined && this.state.sortBy !== undefined) {
            this.props.history.push(`/?product=${this.state.product}&category=${this.state.category}&sortBy=${this.state.sortBy}&paginateId=${this.state.paginateId}`)
        } else if (this.state.category !== undefined) {
            this.props.history.push(`/?category=${this.state.category}&paginateId=${this.state.paginateId}`)
        } else if (this.state.product !== undefined) {
            this.props.history.push(`/?product=${this.state.product}&paginateId=${this.state.paginateId}`)
        } else if (this.state.sortBy !== undefined) {
            this.props.history.push(`/?sortBy=${this.state.sortBy}&paginateId=${this.state.paginateId}`)
        } else {
            this.props.history.push(`/?paginateId=${this.state.paginateId}`)
        }
        if (this.state.paginateId < this.state.totalPages) {
            await this.setState({
                paginateId: parseInt(this.state.paginateId) + 1
            });
            const data = {
                product: this.state.product,
                category: this.state.category,
                sortBy: this.state.sortBy,
                paginateId: this.state.paginateId
            }
            await this.props.dispatch(readProduct(data))
            await this.props.history.push(`?paginateId=${data.paginateId}`)
        } else {
            // return false;
        }
    }

    onPrevious = async () => {
        if (this.state.product !== undefined && this.state.category !== undefined && this.state.sortBy !== undefined) {
            this.props.history.push(`/?product=${this.state.product}&category=${this.state.category}&sortBy=${this.state.sortBy}&paginateId=${this.state.paginateId}`)
        } else if (this.state.category !== undefined) {
            this.props.history.push(`/?category=${this.state.category}&paginateId=${this.state.paginateId}`)
        } else if (this.state.product !== undefined) {
            this.props.history.push(`/?product=${this.state.product}&paginateId=${this.state.paginateId}`)
        } else if (this.state.sortBy !== undefined) {
            this.props.history.push(`/?sortBy=${this.state.sortBy}&paginateId=${this.state.paginateId}`)
        } else {
            this.props.history.push(`/?paginateId=${this.state.paginateId}`)
        }
        if (this.state.paginateId > 1) {
            await this.setState({
                paginateId: parseInt(this.state.paginateId) - 1
            });
            const data = {
                product: this.state.product,
                category: this.state.category,
                sortBy: this.state.sortBy,
                paginateId: this.state.paginateId
            }
            await this.props.dispatch(readProduct(data))
            await this.props.history.push(`?paginateId=${data.paginateId}`)
        } else {
            // return false;
        }
    }

    render() {
        const { paginates, categorys } = this.props
        const fontAW = {
            cursor: "pointer",
            color: "#4f3961",
            textShadow: "1px 1px 1px #ccc",
            padding: "10px 12px",
            fontSize: 18,
            textDecoration: "none"
        };
        const fontAWlable = {
            color: "#4f3961",
            textShadow: "1px 1px 1px #ccc",
            padding: "10px 12px",
            fontSize: 18,
            textDecoration: "none",
            boxShadow: "0px 0px 15px 3px rgba(0,0,0,.16), 3px 3px 0px 0px rgba(0,0,0,.12)"
        };
        return (
            <div style={{ backgroundColor: '#a6e3e9', textAlign: 'center', display: "block", border: "1px solid #eaeaea", padding: "4px" }}>
                <div style={{ backgroundColor: 'white' }}>
                    <input
                        className="form-control"
                        style={{ maxWidth: "24%", float: 'left', border: "1px solid #ced4da" }}
                        placeholder="Search.."
                        aria-label="Search"
                        onChange={this.onProduct}
                        value={this.state.product}
                    />
                </div>
                <span style={{ display: 'inline-block' }}>
                    <ul className="pagination m-0" style={{ backgroundColor: "#a6e3e9" }}>
                        <li className="fa fa-chevron-left" style={fontAW} onClick={this.onPrevious}></li>
                        {paginates.map((pagination) => (
                            <li className="page-item" key={pagination}>
                                <span className="page-link" style={{ cursor: "pointer", color: "#4f3961", fontWeight: 'bold', fontSize: 18 }} onClick={this.onId} id={pagination}>{pagination}</span>
                            </li>
                        ))}
                        <li className="fa fa-chevron-right" style={fontAW} onClick={this.onNext}></li>
                    </ul>
                </span>
                <div className="mr-1" disabled="disabled" style={{ backgroundColor: "#a6e3e9", maxWidth: "10%", float: 'right' }}>
                    <span className="fa fa-tags" style={fontAWlable} />
                </div>
                <select className="custom-select mr-1" style={{ maxWidth: "10%", float: 'right', cursor: 'pointer' }} name="category" onChange={this.onCategory} value={this.state.category} as="select">
                    <option value="">ALL</option>
                    {categorys.map((category) =>
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    )}
                </select>
                <div className="mr-1" disabled="disabled" style={{ backgroundColor: "#a6e3e9", maxWidth: "10%", float: 'right' }}>
                    <span className="fa fa-sort-amount-asc" style={fontAWlable} />
                </div>
                <select className="custom-select mr-1" style={{ maxWidth: "10%", float: 'right', cursor: 'pointer' }} name="by" onChange={this.onSort} value={this.state.sortBy} as="select">
                    <option value="">ALL</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                </select>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        paginates: state.products.paginates,
        categorys: state.categorys.categorys
    }
}

export default withRouter(connect(mapStateToProps)(Option))