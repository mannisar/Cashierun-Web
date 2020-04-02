import React from 'react'

const Item = ({ category, onSelectCategoryEdit, onSelectCategoryDelete }) => {
  const onClickEdit = (event) => {
    event.preventDefault()
    onSelectCategoryEdit(category)
  }

  const onClickDelete = (event) => {
    event.preventDefault()
    onSelectCategoryDelete(category)
  }

  return (
    <tr>
      <td>{category.id}</td>
      <td>{category.name}</td>
      <td><button className='btn btn' onClick={onClickEdit}>Edit</button>
        <button className='btn btn' onClick={onClickDelete}>Delete</button>
      </td>
    </tr>
  )
}

export default Item
