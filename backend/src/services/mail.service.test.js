const sib = require('sib-api-v3-sdk')
const mailService = require('./mail.service')

describe('Test mail sercvice', () => {
  const mockSendTransacEmail = jest.fn()

  const mockTransactionalEmailsApi = jest
    .spyOn(sib, 'TransactionalEmailsApi')
    .mockReturnValue({
      sendTransacEmail: mockSendTransacEmail,
    })

  it('send message', async () => {
    const mockMailData = { message: 'test', email: 'test' }
    const mockApiKey = 'test-api-key'
    process.env.SENDBLUE_API_KEY = mockApiKey

    await mailService(mockMailData)

    expect(sib.ApiClient.instance.authentications['api-key'].apiKey).toBe(
      mockApiKey
    )
    expect(mockTransactionalEmailsApi).toHaveBeenCalled()
    expect(mockSendTransacEmail).toHaveBeenCalledTimes(1)
  })
})
