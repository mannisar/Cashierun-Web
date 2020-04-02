import axios from 'axios'

export const createCategory = (data) => {
  return {
    type: 'CREATE_CATEGORY',
    payload: axios({
      method: 'POST',
      url: `${process.env.REACT_APP_URL}category`,
      data: data
    })
  }
}

export const readCategory = () => {
  return {
    type: 'READ_CATEGORY',
    payload: axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}category`
    })
  }
}

export const updateCategory = (data) => {
  const id = data.id
  return {
    type: 'UPDATE_CATEGORY',
    payload: axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_URL}category/${id}`,
      data: data
    })
  }
}

export const deleteCategory = (id) => {
  return {
    type: 'DELETE_CATEGORY',
    payload: axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_URL}category/${id}`
    })
  }
}

export const searchCategory = (name) => {
  return {
    type: 'SEARCH_CATEGORY',
    payload: axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}category/${name}`
    })
  }
}
