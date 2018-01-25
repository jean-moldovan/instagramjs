module.exports = {
  path: id => id ? `/locations/${id}` : '/locations',
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
