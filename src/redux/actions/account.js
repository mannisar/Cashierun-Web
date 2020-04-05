import axios from 'axios'

export const createAccount = (data) => {
  return {
    type: 'CREATE_ACCOUNT',
    payload: axios({
      method: 'POST',
      url: `${process.env.REACT_APP_URL}account`,
      data: data
    })
  }
}

export const readAccount = () => {
  return {
    type: 'READ_ACCOUNT',
    payload: axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}account`
    })
  }
}

export const updateAccount = (id, data) => {
  return {
    type: 'UPDATE_ACCOUNT',
    payload: axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_URL}account/${id}`,
      data: data
    })
  }
}

export const deleteAccount = (id) => {
  return {
    type: 'DELETE_ACCOUNT',
    payload: axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_URL}account/${id}`
    })
  }
}

export const changePassword = (id, data) => {
  return {
    type: 'CHANGE_PASSWORD',
    payload: axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_URL}account/password/${id}`,
      data: data
    })
  }
}
