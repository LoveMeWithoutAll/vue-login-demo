import {UID, IS_AUTH, ERROR_STATE} from './mutation_types'
import api from '../service'

let setUID = ({commit}, data) => {
  commit(UID, data)
}

let setErrorState = ({commit}, data) => {
  commit(ERROR_STATE, data)
}

let setIsAuth = ({commit}, data) => {
  commit(IS_AUTH, data)
}

export default {
  async login (store, {uid, password}) {
    let loginResponse = await api.login(uid, password)
    switch (loginResponse) {
      case 'noAuth':
        setErrorState(store, 'Not qualified or Wrong student number/Password. Please check it and log in again.')
        setIsAuth(store, false)
        break
      case 'done':
        setErrorState(store, 'You have already finished the questionnaire. Thank you.')
        setIsAuth(store, false)
        break
      default:
        setUID(store, loginResponse.data[0].UID)
        setErrorState(store, '')
        setIsAuth(store, true)
    }
    return store.getters.getIsAuth
  }
}
