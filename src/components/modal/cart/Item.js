import React from 'react'

const Item = ({ product, AddQty, ReduceQty, DeleteCart }) => {
  const onAddQty = event => {
    event.preventDefault()
    AddQty(product.id)
  }

  const onReduceQty = event => {
    event.preventDefault()
    ReduceQty(product.id)
  }

  const onDeleteCart = event => {
    event.preventDefault()
    DeleteCart(product.id)
  }

  const colCart = {
    margin: '0',
    padding: '2px',
    flex: 'none',
    textAlign: 'center'
  }

  const colCart2 = {
    margin: '0',
    padding: '2px',
    flex: 'none',
    textAlign: 'center',
    display: 'inline-table'
  }

  const colCartMid = {
    margin: '0px',
    padding: '0px',
    maxWidth: '100%',
    display: 'flex',
    textAlign: 'center'
  }

  const rowItem = {
    display: 'flex',
    boxShadow: '0 0px 3px 0 rgba(0,0,0,.16), 0 0px 0px 0 rgba(0,0,0,.12)',
    border: '1px solid #eaeaea'
  }

  return (
    <div style={rowItem}>
      <div className='col-md-4 mr-auto' style={colCart}>
        <img src={product.image} alt={product.image} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '5px' }} />
      </div>
      <div className='col-md-4 mr-auto' style={colCart}>
        <p style={{ marginBottom: 1 }}>{product.name}</p>
        <div className='col-sm-4' style={colCartMid}>
          <button className='btn btn' onClick={onReduceQty}>-</button>
          <p style={{ paddingTop: 12 }}>{product.quantity}</p>
          <button className='btn btn' onClick={onAddQty}>+</button>
          <button className='btn btn' style={{ marginLeft: 16 }} onClick={onDeleteCart}>Remove</button>
        </div>
      </div>
      <div className='col-md-4 mr-auto' style={colCart2}>
        <p style={{ marginBottom: 1 }}> Rp. {product.price}</p>
      </div>
    </div>
  )
}

export default Item
