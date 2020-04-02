import React from 'react'

const Item = ({ product, onSelectProductEdit, onSelectProductDelete }) => {
  const onClickEdit = (event) => {
    event.preventDefault()
    onSelectProductEdit(product)
  }

  const onClickDelete = (event) => {
    event.preventDefault()
    onSelectProductDelete(product)
  }

  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>{product.available}</td>
      <td>{product.category}</td>
      <td><img src={product.image} alt={product.image} style={{ width: 45, minHeight: 45 }} /></td>
      <td><button className='btn btn' onClick={onClickEdit}>Edit</button>
        <button className='btn btn' onClick={onClickDelete}>Delete</button>
      </td>
    </tr>
  )
}

export default Item
