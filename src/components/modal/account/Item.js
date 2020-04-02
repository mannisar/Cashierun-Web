import React from 'react'

const Item = ({ account, onSelectAccountPassword, onSelectAccountEdit, onSelectAccountDelete }) => {
  const onClickPassword = (event) => {
    event.preventDefault()
    onSelectAccountPassword(account)
  }

  const onClickEdit = (event) => {
    event.preventDefault()
    onSelectAccountEdit(account)
  }

  const onClickDelete = (event) => {
    event.preventDefault()
    onSelectAccountDelete(account)
  }

  return (
    <tr>
      <td>{account.id}</td>
      <td>{account.name}</td>
      <td>{account.email}</td>
      <td>{account.role}</td>
      <td><img src={account.image} alt={account.image} style={{ width: 45, minHeight: 45 }} /></td>
      <td><button className='btn btn' onClick={onClickPassword}>Password</button>
        <button className='btn btn' onClick={onClickEdit}>Edit</button>
        <button className='btn btn' onClick={onClickDelete}>Delete</button>
      </td>
    </tr>
  )
}

export default Item
