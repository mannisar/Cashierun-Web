import axios from 'axios'

export const readRole = () => {
  return {
    type: 'READ_ROLE',
    payload: axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}role`
    })
  }
}
