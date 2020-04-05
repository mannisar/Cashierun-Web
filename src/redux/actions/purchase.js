import axios from 'axios'

export const purchase = (data) => {
  return {
    type: 'PURCHASE',
    payload: axios({
      method: 'POST',
      url: `http://54.159.148.159/purchase`,
      data: data
    })
  }
}

export const historyTable = () => {
  return {
    type: 'HISTORY_TABLE',
    payload: axios({
      method: 'GET',
      url: `http://54.159.148.159/purchase/history/table`
    })
  }
}

export const historyTableDetail = (id) => {
  return {
    type: 'HISTORY_TABLE_DETAIL',
    payload: axios({
      method: 'GET',
      url: `http://54.159.148.159/purchase/history/table/${id}`
    })
  }
}

export const historyChart = () => {
  return {
    type: 'HISTORY_CHART',
    payload: axios({
      method: 'GET',
      url: `http://54.159.148.159/purchase/history/chart`
    })
  }
}

export const historyCard = () => {
  return {
    type: 'HISTORY_CARD',
    payload: axios({
      method: 'GET',
      url: `http://54.159.148.159/purchase/history/card`
    })
  }
}
