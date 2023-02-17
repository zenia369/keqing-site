import KFetch from '@Lib/k-fetch'
import state from './state'

export default async (cred) => {
  const { data } = await KFetch.post(`auth/registration${state.newUrl}`, cred)

  const { uid, ...response } = data

  if (!uid) throw Error(response.message)

  return uid
}
