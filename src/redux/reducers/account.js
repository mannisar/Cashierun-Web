const initialState = {
  accounts: []
}

const account = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_ACCOUNT_PENDING':
      return {
        ...state
      }
    case 'CREATE_ACCOUNT_REJECTED':
      return {
        ...state
      }
    case 'CREATE_ACCOUNT_FULFILLED':
      return {
        ...state,
        accounts: action.payload.data.result
      }

    case 'READ_ACCOUNT_PENDING':
      return {
        ...state
      }
    case 'READ_ACCOUNT_REJECTED':
      return {
        ...state
      }
    case 'READ_ACCOUNT_FULFILLED':
      return {
        ...state,
        accounts: action.payload.data.result
      }

    case 'UPDATE_ACCOUNT_PENDING':
      return {
        ...state
      }

    case 'UPDATE_ACCOUNT_REJECTED':
      return {
        ...state
      }

    case 'UPDATE_ACCOUNT_FULFILLED':
      return {
        ...state,
        accounts: action.payload.data.result
      }

    case 'DELETE_ACCOUNT_PENDING':
      return {
        ...state
      }
    case 'DELETE_ACCOUNT_REJECTED':
      return {
        ...state
      }
    case 'DELETE_ACCOUNT_FULFILLED':
      return {
        ...state,
        accounts: action.payload.data.result
      }

    case 'CHANGE_PASSWORD_PENDING':
      return {
        ...state
      }
    case 'CHANGE_PASSWORD_REJECTED':
      return {
        ...state
      }
    case 'CHANGE_PASSWORD_FULFILLED':
      return {
        ...state
        // accounts: action.payload.data.result
      }
    default:
      return state
  }
}

export default account
