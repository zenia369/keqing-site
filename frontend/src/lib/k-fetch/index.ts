import axios from 'axios'
import KCookie from '@Lib/k-cookie'

const originV1 = '/api/v1'

const headers = { 'CSRF-Token': KCookie.getCookie().get('XSRF-TOKEN') }

export const KFetchV1 = axios.create({
  baseURL: originV1,
  headers,
})

export default {}
