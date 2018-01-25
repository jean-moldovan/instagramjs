'use strict';

module.exports = {
  path: function path(id) {
    return id ? '/media/' + id : '/media';
  },
  methods: ['get'],
  hasSearch: true,
  nested: [{
    name: 'shortcode',
    path: function path(code) {
      return code ? '/shortcode/' + code : '/shortcode';
    },
    methods: ['get']
  }, {
    name: 'comment',
    path: function path(id) {
      return id ? '/comments/' + id : '/comments';
    },
    methods: ['get', 'delete']
  }, {
    name: 'like',
    path: '/likes',
    methods: ['get', 'post', 'delete']
  }]
};