const user = {
  id: 'id',
  name: 'John Doe'
}

const media = {
  id: 'id',
  images: {}
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
  media
}
