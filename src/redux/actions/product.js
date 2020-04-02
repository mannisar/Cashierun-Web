import axios from 'axios'

export const createProduct = (data) => {
  return {
    type: 'CREATE_PRODUCT',
    payload: axios({
      method: 'POST',
      url: `${process.env.REACT_APP_URL}product`,
      data: data
    })
  }
}

export const readProduct = (data) => {
  const paginateId = data.paginateId || 1
  const limit = data.limit || 12

  const product = data.product || ''
  const category = data.category || ''

  const sortBy = data.sortBy || 'id'
  const orderBy = data.orderBy || 'ASC'
  if (product != null || category != null || sortBy != null || orderBy != null || paginateId != null || limit != null) {
    return {
      type: 'READ_PRODUCT',
      payload: axios({
        method: 'GET',
        url: `${process.env.REACT_APP_URL}product?product=${product}&category=${category}&sortBy=${sortBy}&orderBy=${orderBy}&paginateId=${paginateId}&limit=${limit}`
      })
    }
  } else {
    return {
      type: 'READ_PRODUCT',
      payload: axios({
        method: 'GET',
        url: `${process.env.REACT_APP_URL}product`
      })
    }
  }
}

export const updateProduct = (id, data) => {
  return {
    type: 'UPDATE_PRODUCT',
    payload: axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_URL}product/${id}`,
      data: data
    })
  }
}

export const deleteProduct = (id) => {
  return {
    type: 'DELETE_PRODUCT',
    payload: axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_URL}product/${id}`
    })
  }
}

export const detailProduct = (id) => {
  return {
    type: 'DETAIL_PRODUCT',
    payload: axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}product/${id}`
    })
  }
}
