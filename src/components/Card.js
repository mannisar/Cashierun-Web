import React, { Component, Fragment } from "react";

import { connect } from 'react-redux'
import { addToCart } from "../redux/actions/cart"

class Card extends Component {
  addToCart = (data) => {
    if (data.available === 0) {
      return false;
    } else {
      this.props.dispatch(addToCart(data))
    }
  }

  render() {
    const { products } = this.props
    return (
      <div className="row scroll" id="row_posts">
        {products.map((product) => (
          <Fragment key={product.id}>
            <div className="col-sm-2" id="col_posts">
              <div className="card" id="card_posts" onClick={() => this.addToCart(product)}>
                <img src={product.image} alt={product.image} title={product.description} className="card-img-top" />
                <div className="card-body" style={{ padding: 0 }}>
                  <h5 className="card-title" style={{ fontSize: 15, marginBottom: "-0.1rem", marginTop: "0.75rem" }}>{product.name}</h5>
                  <p className="card-text" style={{ fontSize: 14 }}>{this.convertToRupiah(product.price)}</p>
                  <p className="card-text" style={{ fontSize: 14, fontWeight: 'bold' }}>Available: {product.available === 0 ? '-' : product.available}</p>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    );
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
    products: state.products.products
  }
}

export default connect(mapStateToProps)(Card);