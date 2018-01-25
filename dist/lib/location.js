'use strict';

module.exports = {
  path: function path(id) {
    return id ? '/locations/' + id : '/locations';
  },
  methods: ['get'],
  hasSearch: true,
  nested: [{
    name: 'media',
    path: '/media/recent',
    methods: ['get']
  }]
};