'use strict';

module.exports = {
  path: function path(name) {
    return name ? '/tags/' + name : '/tags';
  },
  methods: ['get'],
  hasSearch: true,
  nested: [{
    name: 'media',
    path: '/media/recent',
    methods: ['get']
  }]
};