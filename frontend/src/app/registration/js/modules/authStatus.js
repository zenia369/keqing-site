export default () => {
  const emailInput = document.querySelector('#email')
  const passwordInput = document.querySelector('#password')
  emailInput.value = ''
  emailInput.required = false
  passwordInput.value = ''
  passwordInput.required = false

  document.querySelector('.status').style.transform = 'translateY(0)'
}
