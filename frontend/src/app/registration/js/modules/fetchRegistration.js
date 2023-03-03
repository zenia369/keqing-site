import { KFetchV1 } from '@Lib/k-fetch'
import state from './state'

export default async (cred) => {
  const { data } = await KFetchV1.post(`auth/registration${state.newUrl}`, cred)

  const { uid, ...response } = data

  if (!uid) throw Error(response.message)

  return uid
}
