module.exports = {
  path: name => name ? `/tags/${name}` : '/tags',
  methods: ['get'],
  hasSearch: true,
  nested: [
    {
      name: 'media',
      path: '/media/recent',
      methods: ['get']
    }
  ]
}
