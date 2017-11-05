const nock = require('nock')
const Instagram = require('../lib/Instagram')
const fixtures = require('./fixtures')

describe('media', () => {
  const baseURL = 'https://foo.com'
  let access

  beforeEach(() => {
    access = new Instagram('token', { baseURL })
  })

  it('should read by id', (done) => {
    nock(baseURL)
      .get('/media/id')
      .query(true)
      .reply(200, { data: fixtures.media })

    access.media('id').get().then(res => {
      expect(res).toEqual(fixtures.media)
      done()
    })
  })

  it('should search', (done) => {
    nock(baseURL)
      .get('/media/search')
      .query({
        access_token: 'token',
        distance: 100,
        lat: 10,
        lng: 20
      })
      .reply(200, { data: fixtures.media })

    access.media().search({ distance: 100, lat: 10, lng: 20 }).then(res => {
      expect(res).toEqual(fixtures.media)
      done()
    })
  })

  it('should read by shortcode', (done) => {
    nock(baseURL)
      .get('/media/shortcode/05112017ABC')
      .query(true)
      .reply(200, { data: fixtures.media })

    access.media().shortcode('05112017ABC').get().then(res => {
      expect(res).toEqual(fixtures.media)
      done()
    })
  })

  describe('comment', () => {
    it('should read by id', (done) => {
      nock(baseURL)
        .get('/media/id/comments/cid')
        .query(true)
        .reply(200, { data: fixtures.mediaComment })

      access.media('id').comment('cid').get().then(res => {
        expect(res).toEqual(fixtures.mediaComment)
        done()
      })
    })

    it('should delete by id', (done) => {
      nock(baseURL)
        .delete('/media/id/comments/cid')
        .query(true)
        .reply(200, { data: null })

      access.media('id').comment('cid').delete().then(res => {
        expect(res).toBe(null)
        done()
      })
    })
  })

  describe('like', () => {
    it('should read', (done) => {
      nock(baseURL)
        .get('/media/id/likes')
        .query(true)
        .reply(200, { data: fixtures.mediaLikes })

      access.media('id').like().get().then(res => {
        expect(res).toEqual(fixtures.mediaLikes)
        done()
      })
    })

    it('should post', (done) => {
      nock(baseURL)
        .post('/media/id/likes')
        .query(true)
        .reply(200, { data: null })

      access.media('id').like().post().then(res => {
        expect(res).toEqual(null)
        done()
      })
    })

    it('should delete', (done) => {
      nock(baseURL)
        .delete('/media/id/likes')
        .query(true)
        .reply(200, { data: null })

      access.media('id').like().delete().then(res => {
        expect(res).toEqual(null)
        done()
      })
    })
  })
})
