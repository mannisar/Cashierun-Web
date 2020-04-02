import React from 'react'

const TableItem = ({ table, onSelectDetail }) => {
  const onClickDetail = (event) => {
    event.preventDefault()
    onSelectDetail(table.id)
  }

  return (
    <tr key={table.id}>
      <td>{table.id}</td>
      <td>{table.account}</td>
      <td>{table.total}</td>
      <td>{table.DAY} {table.MONTH} {table.YEAR}</td>
      <td><button className='btn btn' onClick={onClickDetail}>Detail</button></td>
    </tr>
  )
}

export default TableItem
