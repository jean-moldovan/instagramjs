'use strict';

module.exports = {
  path: function path(id) {
    return id ? '/users/' + id : '/users';
  },
  methods: ['get'],
  hasSearch: true,
  nested: [{
    name: 'media',
    path: function path(type) {
      return '/media/' + (type || 'recent');
    },
    methods: ['get']
  }, {
    name: 'follows',
    path: '/follows',
    methods: ['get']
  }, {
    name: 'followedBy',
    path: '/followed-by',
    methods: ['get']
  }, {
    name: 'requestedBy',
    path: '/requested-by',
    methods: ['get']
  }, {
    name: 'relationship',
    path: '/relationship',
    methods: ['get', 'post']
  }]
};