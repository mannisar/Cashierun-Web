import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { readProduct } from '../redux/actions/product'
import querystring from 'query-string'

class Navbar extends Component {
  state = {
    product: "",
    category: "",
    sortBy: "",
    paginateId: "",
  }

  onProduct = async event => {
    if (this.state.category !== "" && this.state.sortBy !== "") {
      this.props.history.push(`/?product=${event.target.value}&category=${this.state.category}&sortBy=${this.state.sortBy}`)
    } else if (this.state.category !== "") {
      this.props.history.push(`/?product=${event.target.value}&category=${this.state.category}`)
    } else if (this.state.sortBy !== "") {
      this.props.history.push(`/?product=${event.target.value}&sortBy=${this.state.sortBy}`)
    } else {
      this.props.history.push(`/?product=${event.target.value}`)
    }
    await this.setState({
      product: event.target.value
    })
    const data = {
      product: this.state.product,
      category: this.state.category,
      sortBy: this.state.sortBy
    }
    await this.props.dispatch(readProduct(data))
  }

  onCategory = async event => {
    if (this.state.product !== "" && this.state.sortBy !== "") {
      this.props.history.push(`/?product=${this.state.product}&category=${event.target.value}&sortBy=${this.state.sortBy}`)
    } else if (this.state.product !== "") {
      this.props.history.push(`/?product=${this.state.product}&category=${event.target.value}`)
    } else if (this.state.sortBy !== "") {
      this.props.history.push(`/?category=${event.target.value}&sortBy=${this.state.sortBy}`)
    } else {
      this.props.history.push(`/?category=${event.target.value}`)
    }
    await this.setState({
      category: event.target.value
    })
    const data = {
      product: this.state.product,
      category: this.state.category,
      sortBy: this.state.sortBy
    }
    this.props.dispatch(readProduct(data))
  }

  onSort = async event => {
    if (this.state.category !== "" && this.state.product !== "") {
      this.props.history.push(`/?product=${this.state.product}&category=${this.state.category}&sortBy=${event.target.value}`)
    } else if (this.state.category !== "") {
      this.props.history.push(`/?category=${this.state.category}&sortBy=${event.target.value}`)
    } else if (this.state.product !== "") {
      this.props.history.push(`/?product=${this.state.product}&sortBy=${event.target.value}`)
    } else {
      this.props.history.push(`/?sortBy=${event.target.value}`)
    }
    await this.setState({
      sortBy: event.target.value
    })
    const data = {
      product: this.state.product,
      category: this.state.category,
      sortBy: this.state.sortBy
    }
    await this.props.dispatch(readProduct(data))
  }

  componentDidMount() {
    var value = querystring.parse(this.props.location.search);
    if (value.product !== undefined || value.category !== undefined || value.sortBy !== undefined) {
      this.setState({
        product: value.product,
        category: value.category,
        sortBy: value.sortBy
      })
      const data = {
        product: value.product,
        category: value.category,
        sortBy: value.sortBy
      }
      this.props.dispatch(readProduct(data))
    }
  }

  render() {
    const { onLogout } = this.props;
    const fontAW = {
      cursor: "pointer",
      color: "#4f3961",
      textShadow: "1px 1px 1px #ccc",
      padding: "12px 27px",
      textDecoration: "none",
      fontSize: "1.8em"
    };
    const Menu = () => {
      if (this.props.location.pathname === '/') {
        return (
          <nav className="navbar navbar-light bg-blue" style={{ display: 'block', textAlign: 'center', maxHeight: 60 }}>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ color: '#4f3961', float: 'left', marginTop: '6px' }}
            >
              <span className="fa fa-chevron-down"></span>
            </button>
            <span className="navbar-text" style={{ fontSize: 24, fontWeight: 'bold', color: '#4f3961', marginTop: '-6px' }}>
              CASHIERUN APP
            </span>
          </nav>
        )
      } else {
        return (
          <nav className="navbar navbar-light bg-blue" style={{ display: 'block', textAlign: 'center', maxHeight: 60 }}>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ color: 'white', float: 'left', marginTop: '6px' }}
            >
              <span className="fa fa-chevron-down"></span>
            </button>
            <span className="navbar-text" style={{ fontSize: 24, fontWeight: 'bold', color: '#4f3961', marginTop: '-6px' }}>
              CASHIERUN APP
            </span>
          </nav>
        )
      }
    }
    const MainMenu = () => {
      if ((this.props.auth.profile.role === "Super Admin") === true || (this.props.auth.profile.role === "Admin") === true) {
        return (
          <Fragment>
            <Link className="fa fa-cutlery" style={fontAW} to="/product" title={"Product"} />
            <Link className="fa fa-tags" style={fontAW} to="/category" title={"Category"} />
            <Link className="fa fa-users" style={fontAW} to="/account" title={"Account"} />
          </Fragment>
        )
      } else {
        return (
          <Fragment>
          </Fragment>
        )
      }
    }
    return (
      <div className="pos-f-t">
        <div className="collapse" id="navbarToggleExternalContent" style={{ backgroundColor: '#a6e3e9', }}>
          <Link className="fa fa-home" style={fontAW} to="/" title={"Home"} />
          <MainMenu />
          <Link className="fa fa-bar-chart" style={fontAW} to="/history" title={"History"} />
          <Link className="fa fa-sign-out" style={fontAW} to="#" onClick={onLogout} title={"Logout"} />
        </div>
        <Menu />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    categorys: state.categorys.categorys
  }
}

export default withRouter(connect(mapStateToProps)(Navbar));
