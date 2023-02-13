// IMPORT
import '../styles/style.scss'

// END IMPORT

import state from './modules/state'
import fetchRegistration from './modules/fetchRegistration'
import googleAuthHandler from './modules/google'
import showMessage from './modules/showMessage'

const form = document.querySelector('#form')

// Auth
const google = document.querySelector('#google')
window.addEventListener('load', () => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const { target } = event

    const cred = {
      email: target.querySelector('#email').value || state.email,
      password: target.querySelector('#password').value || state.password,
      userName: target.querySelector('#name').value,
      userCity: target.querySelector('#city').value,
      userElement: target.querySelector('#elemental').value,
      idToken: state.idToken,
    }

    const btn = target.querySelector('.btn-submit')
    btn.disabled = true
    try {
      const uid = await fetchRegistration(cred)

      target.querySelector('#email').value = ''
      target.querySelector('#password').value = ''
      target.querySelector('#name').value = ''
      target.querySelector('#city').value = ''
      target.querySelector('#elemental').value = ''
      btn.disabled = false

      window.location.assign(`/userProfile?uid=${uid}`)
    } catch (error) {
      btn.disabled = false
      target.querySelector('#email').value = ''
      target.querySelector('#email').focus()

      showMessage(error.message)
    }
  })

  google.addEventListener('click', googleAuthHandler)
})
