module.exports = {
  path: buildUserPath,
  methods: ['get'],
  hasSearch: true,
  nested: [
    {
      name: 'media',
      path: buildMediaPath,
      methods: ['get']
    },

    {
      name: 'follows',
      path: '/follows',
      methods: ['get']
    },

    {
      name: 'followedBy',
      path: '/followed-by',
      methods: ['get']
    },

    {
      name: 'relationship',
      path: '/relationship',
      methods: ['get', 'post']
    }
  ]
}

function buildUserPath (id) {
  var path = '/users'

  if (id) {
    path += '/' + id
  }

  return path
}

function buildMediaPath (type) {
  return '/media/' + (type || 'recent')
}
