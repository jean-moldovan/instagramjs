module.exports = {
  path: id => id ? `/media/${id}` : '/media',
  methods: ['get'],
  hasSearch: true,
  nested: [
    {
      name: 'shortcode',
      path: code => code ? `/shortcode/${code}` : '/shortcode',
      methods: ['get']
    }
  ]
}