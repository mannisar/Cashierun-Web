import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import { deleteAccount } from '../../../redux/actions/account'

const Delete = (props) => {
  const { account, show, onHide, dispatch } = props

  const onCancelHandle = (event) => {
    event.preventDefault()
    onHide()
  }

  const onDeleteHandle = async (event) => {
    event.preventDefault()
    const id = account.id
    await dispatch(deleteAccount(id))
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide} variant='lg'>
      <Modal.Header>
        <p>Confirm Delete Account {account ? account.name : ''} ?</p>
      </Modal.Header>
      <Modal.Body>
        <button className='btn btn' size='sm' onClick={onCancelHandle} style={{ marginRight: '10px' }}>Cancel</button>
        <button className='btn btn' size='sm' onClick={onDeleteHandle}>Delete</button>
      </Modal.Body>
    </Modal>
  )
}

export default connect()(Delete)
