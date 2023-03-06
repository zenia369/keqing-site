const mockValueIdToken = 'test-idToken'
const mockValueUid = 'test-uid'
const mockValueCreateSessionCookie = 'test-createSessionCookie'
const mockValueGetAuth = 'test-get-auth'

const mockVerifyIdToken = jest.fn().mockResolvedValue({ uid: mockValueUid })
const mockGetAuth = jest.fn().mockReturnValue(mockValueGetAuth)
const mockCreateSessionCookie = jest
  .fn()
  .mockResolvedValue(mockValueCreateSessionCookie)
const mockCreateUserWithEmailAndPassword = jest
  .fn()
  .mockResolvedValue({ _tokenResponse: { idToken: mockValueIdToken } })

jest.mock('firebase/auth', () => ({
  getAuth: mockGetAuth,
  createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
}))
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}))
jest.mock('firebase-admin/auth', () => ({
  getAuth: jest.fn().mockImplementation(() => ({
    verifyIdToken: mockVerifyIdToken,
    createSessionCookie: mockCreateSessionCookie,
  })),
}))

const { create_session, registration } = require('./auth.service')

describe('Test auth service', () => {
  it('#create_session', async () => {
    const expiresIn = 60 * 60 * 24 * 5 * 100
    const options = { maxAge: expiresIn, httpOnly: true, secure: true }

    const res = await create_session(mockValueIdToken)

    expect(mockVerifyIdToken).toBeCalledWith(mockValueIdToken)
    expect(mockCreateSessionCookie).toBeCalledWith(mockValueIdToken, {
      expiresIn,
    })
    expect(res).toEqual({
      options,
      uid: mockValueUid,
      sessionCookie: mockValueCreateSessionCookie,
    })
  })

  it('#registration', async () => {
    const mockCred = {
      password: 'test-password',
      email: 'test-email',
    }

    const res = await registration(mockCred)

    expect(mockCreateUserWithEmailAndPassword).toBeCalledWith(
      mockValueGetAuth,
      mockCred.email,
      mockCred.password
    )
    expect(res).toBe(mockValueIdToken)
  })
})
