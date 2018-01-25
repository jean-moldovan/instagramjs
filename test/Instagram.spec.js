const Instagram = require('../src/lib/Instagram')
const config = require('../src/lib/config')

describe('Instagram', () => {
  describe('init', () => {
    it('should throw if no token provided', () => {
      const badCall = () => new Instagram()
      expect(badCall).toThrow()
    })

    it('should throw if token is not a string', () => {
      const badCall = () => new Instagram({})
      expect(badCall).toThrow()
    })

    it('should build api config using default values', () => {
      const instagram = new Instagram('token')
      expect(instagram.api.config).toEqual(jasmine.any(Object))

      expect(instagram.api.config.baseURL).toBe(config.baseURL)
      expect(instagram.api.config.fullResponse).toBe(false)
      expect(instagram.api.config.timeout).toBe(0)
      expect(instagram.api.config.params).toEqual({ access_token: 'token' })
    })

    it('should allow custom config', () => {
      const instagram = new Instagram('token', { timeout: 2000 })
      expect(instagram.api.config.timeout).toBe(2000)
    })

    it('should allow to request api', () => {
      const instagram = new Instagram('token')
      instagram.api.request = jasmine.createSpy('request')
      instagram.request({ fullResponse: true })
      expect(instagram.api.request).toHaveBeenCalledWith({ fullResponse: true })
    })

    it('should have user resource', () => {
      const instagram = new Instagram('token')
      expect(instagram.user).toEqual(jasmine.any(Function))
    })

    it('should have media resource', () => {
      const instagram = new Instagram('token')
      expect(instagram.media).toEqual(jasmine.any(Function))
    })

    it('should have tag resource', () => {
      const instagram = new Instagram('token')
      expect(instagram.tag).toEqual(jasmine.any(Function))
    })

    it('should have location resource', () => {
      const instagram = new Instagram('token')
      expect(instagram.location).toEqual(jasmine.any(Function))
    })
  })
})
