const user = {
  id: 'id',
  name: 'John Doe'
}

const media = {
  id: 'id',
  images: {}
}

const comment = {
  id: 'id',
  text: 'Uh, shame I don\'t speak French'
}

const tag = {
  name: 'sdk'
}

const location = {
  id: 'id',
  name: 'Europe/Minsk'
}

module.exports = {
  user,
  userMedia: [media],
  userFollows: [user],
  userFollowedBy: [user],
  userRelationship: {
    outgoing_status: 'none',
    incoming_status: 'none'
  },
  media,
  mediaComments: [comment],
  mediaComment: comment,
  mediaLikes: [{
    id: 'id',
    username: 'John Doe'
  }],
  tag,
  tagMedia: [media],
  location,
  locationMedia: [media]
}
