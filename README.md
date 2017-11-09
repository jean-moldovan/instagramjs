# InstagramJS

Javascript wrapper around [Instagram API](https://www.instagram.com/developer)

[![Build Status](https://travis-ci.org/jean-moldovan/instagramjs.svg?branch=master)](https://travis-ci.org/jean-moldovan/instagramjs) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![codecov](https://codecov.io/gh/jean-moldovan/instagramjs/branch/master/graph/badge.svg)](https://codecov.io/gh/jean-moldovan/instagramjs)

## Features

* Promise based
* No browser support (sorry, can't get excited about JSONP)
* [Tested](https://travis-ci.org/jean-moldovan/instagramjs) on NodeJS 6, 7, 8

## Install

```
npm i instagramjs
```

## Usage

All requests are made using an access token. See [Authentication](https://www.instagram.com/developer/authentication/) for a step-by-step guide on how to obtain a token.

```javascript
const Instagram = require('instagramjs')
const access = new Instagram('access_token')
```

Note: to quickly get a token for testing purposes, check out our [InstAuth](https://github.com/jean-moldovan/instauth) tool.


## Global config

Below are defaults:

```javascript
const access = new Instagram('access_token', {
  baseURL: 'https://api.instagram.com/v1',
  fullResponse: false, // true -> include status code & headers
  timeout: 0 // request timeout in ms
})
```

## Scenarios

### User

```javascript
access.user('self').get()
  .then(console.log) // GET /users/self

access.user('id').get()
  .then(console.log) // GET /users/id

access.user('id').media().get()
  .then(console.log) // GET /users/id/media/recent (recent is by default)

access.user('self').media('liked').get({count: 20})
  .then(console.log) // GET /users/self/media/liked?count=20

access.user().search({q: 'foo'})
  .then(console.log) // GET /users/search?q=foo
```

### User Relationship

```javascript
access.user('self').follows().get()
  .then(console.log) // GET /users/self/follows

access.user('self').followedBy().get()
  .then(console.log) // GET /users/self/followed-by

access.user('self').requestedBy().get()
  .then(console.log) // GET /users/self/requested-by

access.user('id').relationship().get()
  .then(console.log) // GET /users/id/relationship

access.user('id').relationship().post({action: 'unfollow'})
  .then(console.log) // POST /users/id/relationship?action=unfollow
```

### Media

```javascript
access.media('id').get()
  .then(console.log) // GET /media/id

access.media().shortcode('abc').get()
  .then(console.log) // GET /media/shortcode/abc

access.media().search({distance: 1000, lat: 10, lng: 20})
  .then(console.log) // GET /media/search?distance=1000&lat=10&lng=20
```

### Media Comments

```javascript
access.media('id').comment().get()
  .then(console.log) // GET /media/id/comments

access.media('id').comment('cid').delete().then(() => {
  console.log('deleted')
}) // DELETE /media/id/comments/cid
```
### Media Likes

```javascript
access.media('id').like().get()
  .then(console.log) // GET /media/id/likes

access.media('id').like().post().then(() => {
  console.log('liked')
}) // POST /media/id/likes

access.media('id').like().delete().then(() => {
  console.log('deleted')
}) // DELETE /media/id/likes
```

### Tags

```javascript
access.tag('name').get()
  .then(console.log) // GET /tags/name

access.tag('name').media().get()
  .then(console.log) // GET /tags/name/media/recent (recent is by default)

access.tag().search({q: 'foo'})
  .then(console.log) // GET /tags/search?q=foo
```

### Locations

```javascript
access.location('id').get()
  .then(console.log) // GET /locations/id

access.location('id').media().get()
  .then(console.log) // GET /locations/id/media/recent (recent is by default)

access.location().search({distance: 100, lat: 5, lng: 10})
  .then(console.log) // GET /locations/search?distance=100&lat=5&lng=10
```

## Request Options
As you might've noticed in the exaples, it's possible to specify
query params in the request options, e. g.:

```javascript
access.user('self').media('liked').get({count: 20}) // ?count=20
```

Additionaly, a full response option could be enabled for a single request:

```javascript
access.user('self').get(true).then(console.log)

// Returns full response
{
  status: 200,
  headers: { ... },
  data: { ... }
}
```

If you need to specify request timeout:

```javascript
access.user('self').get(100) // request timeout 100ms
```

And, finally, combination of above:

```javascript
access.user('self').get({foo: 'bar'}, true, 100)
```

## Custom Request

If some of the endpoints are not available via Resource interface, it's always possible
to build a custom request:

```javascript
access.request({
  url: '/my/url',
  method: 'get',
  params: {
    foo: 'bar'
  },
  fullResponse: false,
  timeout: 0
}).then(console.log)
```
