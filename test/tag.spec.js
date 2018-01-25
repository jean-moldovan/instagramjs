const nock = require('nock')
const Instagram = require('../src/lib/Instagram')
const fixtures = require('./fixtures')

describe('tag', () => {
  const baseURL = 'https://foo.com'
  let access

  beforeEach(() => {
    access = new Instagram('token', { baseURL })
  })

  it('should read by name', (done) => {
    nock(baseURL)
      .get('/tags/name')
      .query(true)
      .reply(200, { data: fixtures.tag })

    access.tag('name').get().then(res => {
      expect(res).toEqual(fixtures.tag)
      done()
    })
  })

  it('should search', (done) => {
    nock(baseURL)
      .get('/tags/search')
      .query({
        access_token: 'token',
        q: 'query'
      })
      .reply(200, { data: fixtures.tag })

    access.tag().search({q: 'query'}).then(res => {
      expect(res).toEqual(fixtures.tag)
      done()
    })
  })

  it('should read recent media', (done) => {
    nock(baseURL)
      .get('/tags/name/media/recent')
      .query(true)
      .reply(200, { data: fixtures.tagMedia })

    access.tag('name').media().get().then(res => {
      expect(res).toEqual(fixtures.tagMedia)
      done()
    })
  })
})
