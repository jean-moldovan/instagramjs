module.exports = {
  path: id => id ? `/users/${id}` : '/users',
  methods: ['get'],
  hasSearch: true,
  nested: [
    {
      name: 'media',
      path: type => '/media/' + (type || 'recent'),
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
