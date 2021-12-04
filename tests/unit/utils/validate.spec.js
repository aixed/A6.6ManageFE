import { validUsername, isExternal } from '@/utils/validate.js'

describe('Utils:validate', () => {
  it('validUsername', () => {
    expect(validUsername('admin')).toBe(true)
    expect(validUsername('editor')).toBe(true)
    expect(validUsername('xxxx')).toBe(false)
  })
  it('isExternal', () => {
    expect(isExternal('https://github.com/snlie/A6.6ManagerFE')).toBe(true)
    expect(isExternal('http://github.com/snlie/A6.6ManagerFE')).toBe(true)
    expect(isExternal('github.com/snlie/A6.6ManagerFE')).toBe(false)
    expect(isExternal('/Home')).toBe(false)
    expect(isExternal('./Home')).toBe(false)
    expect(isExternal('Home')).toBe(false)
  })
})
