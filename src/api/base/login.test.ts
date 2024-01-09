import { describe, expect, it } from 'vitest'
import { type Credentials } from '../models'
import { login } from './login'

describe('login function', () => {
  it('should throw an error with wrong credentials', async () => {
    const wrongCredentials: Credentials = {
      username: 'wrongUsername',
      password: 'wrongPassword',
    }

    await expect(login(wrongCredentials)).rejects.toThrow()
  })
})
