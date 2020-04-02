import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Option from '../components/Option'
import Cart from './Cart'

import { logout } from '../redux/actions/auth'
import { readProduct } from '../redux/actions/product'
import { readCategory } from '../redux/actions/category'
import { readAccount } from '../redux/actions/account'
import { readRole } from '../redux/actions/role'
import querystring from 'query-string'

class Home extends Component {
  async componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      const data = {}
      await this.props.dispatch(readProduct(data))
      await this.props.dispatch(readCategory())
      await this.props.dispatch(readAccount())
      await this.props.dispatch(readRole())
      const value = querystring.parse(this.props.location.search)
      const id = querystring.parse(this.props.location.search)
      if (value.product !== undefined || value.category !== undefined || value.sortBy !== undefined || id.paginateId !== undefined) {
        const data = {
          product: value.product,
          category: value.category,
          sortBy: value.sortBy,
          paginateId: id.paginateId
        }
        this.props.dispatch(readProduct(data))
      }
    } else {
      this.props.history.push('/login')
    }
  }

  onLogout () {
    this.props.dispatch(logout())
    this.props.history.push('/login')
  }

  render () {
    return (
      <>
        <div className='row'>
          <div className='col-md-9' id='col_posts'>
            <Navbar onLogout={this.onLogout.bind(this)} />
            <Card />
            <Option />
          </div>
          <div className='col-md-3' id='col_carts'>
            <Cart />
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    categorys: state.categorys.categorys
  }
}

export default withRouter(connect(mapStateToProps)(Home))
