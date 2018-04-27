import axios from 'axios'

const getUserInfo = (uid, password) => {
  return axios.get('/endpoint-for-get-user-info', {
    params: {
      'uid': uid,
      'password': password
    }
  })
}

const isFinished = uid => {
  return axios.get('/endpoint-for-is-finished', {
    params: {
      'uid': uid
    }
  })
}

export default {
  async login (uid, password) {
    try {
      const getUserInfoPromise = await getUserInfo(uid, password)
      const isFinishedPromise = await isFinished(uid) // Promise.all의 예시를 위해 집어넣음
      const [userInfoResponse, isFinishedResponse] = await Promise.all([getUserInfoPromise, isFinishedPromise])
      if (userInfoResponse.data.length === 0) return 'noAuth'
      if (isFinishedResponse.data[0].CNT > 0) return 'done'
      axios.defaults.headers.common['Authorization'] = userInfoResponse.jwt
      return userInfoResponse
    } catch (err) {
      console.error(err)
    }
  }
}
