const initialState = {
  purchases: [],
  historyCard: [],
  historyChart: [],
  historyTable: [],
  historyTableDetail: [],
  messages: ''
}

const purchase = (state = initialState, action) => {
  switch (action.type) {
    case 'PURCHASE_PENDING':
      return {
        ...state
      }
    case 'PURCHASE_REJECTED':
      return {
        ...state
      }
    case 'PURCHASE_FULFILLED':
      return {
        ...state,
        purchases: action.payload.data.result
      }

    case 'HISTORY_TABLE_PENDING':
      return {
        ...state
      }
    case 'HISTORY_TABLE_REJECTED':
      return {
        ...state
      }
    case 'HISTORY_TABLE_FULFILLED':
      return {
        ...state,
        historyTable: action.payload.data.result
      }

    case 'HISTORY_TABLE_DETAIL_PENDING':
      return {
        ...state
      }
    case 'HISTORY_TABLE_DETAIL_REJECTED':
      return {
        ...state
      }
    case 'HISTORY_TABLE_DETAIL_FULFILLED':
      return {
        ...state,
        historyTableDetail: action.payload.data.result
      }

    case 'HISTORY_CHART_PENDING':
      return {
        ...state
      }
    case 'HISTORY_CHART_REJECTED':
      return {
        ...state
      }
    case 'HISTORY_CHART_FULFILLED':
      return {
        ...state,
        historyChart: action.payload.data.result
      }

    case 'HISTORY_CARD_PENDING':
      return {
        ...state
      }
    case 'HISTORY_CARD_REJECTED':
      return {
        ...state
      }
    case 'HISTORY_CARD_FULFILLED':
      return {
        ...state,
        historyCard: action.payload.data.result
      }
    default:
      return state
  }
}

export default purchase
