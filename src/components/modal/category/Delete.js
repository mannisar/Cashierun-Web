import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import { deleteCategory } from '../../../redux/actions/category'

const Delete = (props) => {
  const { category, show, onHide, dispatch } = props

  const onCancelHandle = (event) => {
    event.preventDefault()
    onHide()
  }

  const onDeleteHandle = async (event) => {
    event.preventDefault()
    const id = category.id
    await dispatch(deleteCategory(id))
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide} variant='lg'>
      <Modal.Header>
        <p>Confirm Delete Category {category ? category.name : ''} ?</p>
      </Modal.Header>
      <Modal.Body>
        <button className='btn btn' onClick={onCancelHandle} style={{ marginRight: '10px' }}>Cancel</button>
        <button className='btn btn' onClick={onDeleteHandle}>Delete</button>
      </Modal.Body>
    </Modal>
  )
}

export default connect()(Delete)
