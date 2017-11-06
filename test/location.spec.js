const nock = require('nock')
const Instagram = require('../lib/Instagram')
const fixtures = require('./fixtures')

describe('location', () => {
  const baseURL = 'https://foo.com'
  let access

  beforeEach(() => {
    access = new Instagram('token', { baseURL })
  })

  it('should read by id', (done) => {
    nock(baseURL)
      .get('/locations/id')
      .query(true)
      .reply(200, { data: fixtures.location })

    access.location('id').get().then(res => {
      expect(res).toEqual(fixtures.location)
      done()
    })
  })

  it('should search', (done) => {
    nock(baseURL)
      .get('/locations/search')
      .query({
        access_token: 'token',
        lat: 10,
        lng: 20
      })
      .reply(200, { data: fixtures.location })

    access.location().search({lat: 10, lng: 20}).then(res => {
      expect(res).toEqual(fixtures.location)
      done()
    })
  })

  it('should read recent media', (done) => {
    nock(baseURL)
      .get('/locations/id/media/recent')
      .query(true)
      .reply(200, { data: fixtures.locationMedia })

    access.location('id').media().get().then(res => {
      expect(res).toEqual(fixtures.locationMedia)
      done()
    })
  })
})
