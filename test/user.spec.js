const nock = require('nock')
const Instagram = require('../lib/Instagram')
const fixtures = require('./fixtures')

describe('user', () => {
  const baseURL = 'https://foo.com'
  let access

  beforeEach(() => {
    access = new Instagram('token', { baseURL })
  })

  it('should read user by id', (done) => {
    nock(baseURL)
      .get('/users/id')
      .query(true)
      .reply(200, { data: fixtures.user })

    access.user('id').get().then(res => {
      expect(res).toEqual(fixtures.user)
      done()
    })
  })

  it('should search user', (done) => {
    nock(baseURL)
      .get('/users/search')
      .query({
        access_token: 'token',
        q: 'aklotos'
      })
      .reply(200, { data: fixtures.user })

    access.user().search('aklotos').then(res => {
      expect(res).toEqual(fixtures.user)
      done()
    })
  })

  describe('media', () => {
    it('should read user media (recent by default)', (done) => {
      nock(baseURL)
        .get('/users/id/media/recent')
        .query(true)
        .reply(200, { data: fixtures.userMedia })

      access.user('id').media().get().then(res => {
        expect(res).toEqual(fixtures.userMedia)
        done()
      })
    })

    it('should read specific media type', (done) => {
      nock(baseURL)
        .get('/users/id/media/type')
        .query(true)
        .reply(200, { data: fixtures.userMedia })

      access.user('id').media('type').get().then(res => {
        expect(res).toEqual(fixtures.userMedia)
        done()
      })
    })

    it('should allow counter param for user media', (done) => {
      nock(baseURL)
        .get('/users/id/media/recent')
        .query({
          access_token: 'token',
          counter: 20
        })
        .reply(200, { data: fixtures.userMedia })

      access.user('id').media().get({ counter: 20 }).then(res => {
        expect(res).toEqual(fixtures.userMedia)
        done()
      })
    })
  })

  describe('relationship', () => {
    it('should read user follows', (done) => {
      nock(baseURL)
        .get('/users/id/follows')
        .query(true)
        .reply(200, { data: fixtures.userFollows })

      access.user('id').follows().get().then(res => {
        expect(res).toEqual(fixtures.userFollows)
        done()
      })
    })

    it('should read user followed by', (done) => {
      nock(baseURL)
        .get('/users/id/followed-by')
        .query(true)
        .reply(200, { data: fixtures.userFollowedBy })

      access.user('id').followedBy().get().then(res => {
        expect(res).toEqual(fixtures.userFollowedBy)
        done()
      })
    })

    it('should read relationship', (done) => {
      nock(baseURL)
        .get('/users/id/relationship')
        .query(true)
        .reply(200, { data: fixtures.userRelationship })

      access.user('id').relationship().get().then(res => {
        expect(res).toEqual(fixtures.userRelationship)
        done()
      })
    })

    it('should modify relationship', (done) => {
      nock(baseURL)
        .post('/users/id/relationship')
        .query({
          access_token: 'token',
          action: 'unfollow'
        })
        .reply(200, { data: fixtures.userRelationship })

      access.user('id').relationship().post({ action: 'unfollow' }).then(res => {
        expect(res).toEqual(fixtures.userRelationship)
        done()
      })
    })
  })
})
