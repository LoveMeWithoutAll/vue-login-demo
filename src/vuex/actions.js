import { UID, IS_AUTH, ERROR_STATE } from './mutation_types'
import api from '../service'

let setUID = ({ commit }, data) => {
  commit(UID, data)
}

let setErrorState = ({ commit }, data) => {
  commit(ERROR_STATE, data)
}

let setIsAuth = ({ commit }, data) => {
  commit(IS_AUTH, data)
}

let processResponse = (store, loginResponse) => {
  switch (loginResponse) {
    case 'noAuth':
      setErrorState(store, 'Wrong ID or Password')
      setIsAuth(store, false)
      break
    case 'done':
      setErrorState(store, 'Already finished')
      setIsAuth(store, false)
      break
    default:
      setUID(store, loginResponse.UID)
      setErrorState(store, '')
      setIsAuth(store, true)
  }
}

export default {
  async login (store, { uid, password }) {
    let loginResponse = await api.login(uid, password)
    processResponse(store, loginResponse)
    return store.getters.getIsAuth
  }
}
