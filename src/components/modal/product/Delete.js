import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import { deleteProduct } from '../../../redux/actions/product'

const Delete = (props) => {
  const { product, show, onHide, dispatch } = props

  const onCancelHandle = (event) => {
    event.preventDefault()
    onHide()
  }

  const onDeleteHandle = async (event) => {
    event.preventDefault()
    const id = product.id
    await dispatch(deleteProduct(id))
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide} variant='lg'>
      <Modal.Header>
        <p>Confirm Delete Product {product ? product.name : ''} ?</p>
      </Modal.Header>
      <Modal.Body>
        <button className='btn btn' onClick={onCancelHandle} style={{ marginRight: '10px' }}>Cancel</button>
        <button className='btn btn' onClick={onDeleteHandle}>Delete</button>
      </Modal.Body>
    </Modal>
  )
}

export default connect()(Delete)
