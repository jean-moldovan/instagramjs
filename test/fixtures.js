const user = {
  id: 'id',
  name: 'John Doe'
}

module.exports = {
  user,
  userMedia: [{
    id: 'id',
    images: {}
  }],
  userFollows: [user],
  userFollowedBy: [user],
  userRelationship: {
    outgoing_status: 'none',
    incoming_status: 'none'
  }
}
