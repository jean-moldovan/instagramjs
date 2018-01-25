const nock = require('nock')
const Api = require('../src/lib/Api')

describe('Api', () => {
  const baseURL = 'https://foo.com'

  describe('init', () => {
    it('should add token to api config', () => {
      const api = new Api('token')
      expect(api.config.params.access_token).toEqual('token')
    })

    it('should allow custom config', () => {
      const api = new Api('token', {
        baseURL,
        params: {
          foo: 'bar'
        }
      })
      expect(api.config.baseURL).toEqual(baseURL)
      expect(api.config.params).toEqual({
        access_token: 'token',
        foo: 'bar'
      })
    })
  })

  describe('request', () => {
    it('should allow request options', (done) => {
      const api = new Api('token', { baseURL })

      nock(baseURL)
        .get('/users')
        .query(true)
        .reply(200, function () {
          expect(this.req.path).toBe('/users?access_token=token&foo=bar')
          done()
        })

      api.request({
        url: '/users',
        params: {
          foo: 'bar'
        }
      })
    })

    it('should resolve response data', (done) => {
      const api = new Api('token', { baseURL })

      nock(baseURL)
        .get('/users')
        .query(true)
        .reply(200, {
          data: { foo: 'bar' }
        })

      api.request({
        url: '/users'
      }).then(res => {
        expect(res).toEqual({ foo: 'bar' })
        done()
      })
    })

    it('should support full response', (done) => {
      const api = new Api('token', { baseURL })

      nock(baseURL)
        .get('/users')
        .query(true)
        .reply(200, {
          data: { foo: 'bar' }
        })

      api.request({
        url: '/users',
        fullResponse: true
      }).then(res => {
        expect(res.status).toBe(200)
        expect(res.headers).toEqual(jasmine.any(Object))
        expect(res.data).toEqual({ foo: 'bar' })
        done()
      })
    })

    it('should handle api errors', (done) => {
      const api = new Api('token', { baseURL })

      nock(baseURL)
        .get('/users')
        .query(true)
        .reply(400, {
          meta: {
            code: 400,
            error_type: 'APINotFoundError',
            error_message: 'this user does not exist'
          }
        })

      api.request({
        url: '/users'
      }).catch(err => {
        expect(err.status).toBe(400)
        expect(err.type).toBe('APINotFoundError')
        expect(err.message).toBe('this user does not exist')
        done()
      })
    })

    it('should handle \'Page not found\' errors', (done) => {
      const api = new Api('token', { baseURL })

      nock(baseURL)
        .get('/users')
        .query(true)
        .reply(404, '<html></html>')

      api.request({
        url: '/users'
      }).catch(err => {
        expect(err.status).toBe(404)
        expect(err.message).toBe('Resource not found')
        done()
      })
    })

    it('should handle connection errors', (done) => {
      const api = new Api('token', { baseURL })

      nock(baseURL)
        .get('/users')
        .query(true)
        .delay(2) // simulate connection timeout
        .reply(200) // should not get here

      api.request({
        url: '/users',
        timeout: 1
      }).catch(err => {
        expect(err.message).toEqual(jasmine.any(String))
        expect(err.code).toBe('ECONNABORTED')
        done()
      })
    })
  })
})
