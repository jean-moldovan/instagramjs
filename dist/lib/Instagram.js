'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Api = require('./Api');

var _user = require('./user');
var _media = require('./media');
var _tag = require('./tag');
var _location = require('./location');

var utils = require('./utils');

module.exports = function () {
  function Instagram(token) {
    var customConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Instagram);

    if (typeof token !== 'string') {
      throw new Error('Token must be string!');
    }

    this.api = new Api(token, customConfig);
  }

  _createClass(Instagram, [{
    key: 'request',
    value: function request(options) {
      return this.api.request(options);
    }
  }, {
    key: 'user',
    value: function user(id) {
      return this._buildResource(_user, id);
    }
  }, {
    key: 'media',
    value: function media(id) {
      return this._buildResource(_media, id);
    }
  }, {
    key: 'tag',
    value: function tag(name) {
      return this._buildResource(_tag, name);
    }
  }, {
    key: 'location',
    value: function location(id) {
      return this._buildResource(_location, id);
    }
  }, {
    key: '_buildResource',
    value: function _buildResource(config, id, parentPath) {
      var resource = {};

      resource.path = this._buildPath(config.path, id, parentPath);

      if (config.methods) {
        resource = this._attachMethods(resource, config.methods);
      }

      if (config.nested) {
        resource = this._attachNested(resource, config.nested);
      }

      if (config.hasSearch) {
        resource = this._attachSearch(resource);
      }

      return resource;
    }
  }, {
    key: '_buildPath',
    value: function _buildPath(path, id, parentPath) {
      if (typeof path !== 'string') {
        path = path(id); // use path formatter
      }

      return (parentPath || '') + path;
    }
  }, {
    key: '_attachMethods',
    value: function _attachMethods(resource, methods) {
      var _this = this;

      methods.forEach(function (method) {
        resource[method] = utils.buildRequestMethod(method, resource.path, _this.request.bind(_this));
      });

      return resource;
    }
  }, {
    key: '_attachNested',
    value: function _attachNested(resource, nested) {
      var _this2 = this;

      nested.forEach(function (config) {
        resource[config.name] = function (id) {
          return _this2._buildResource(config, id, resource.path);
        };
      });

      return resource;
    }

    // .search({ foo: 'bar' }) -> /search?foo=bar

  }, {
    key: '_attachSearch',
    value: function _attachSearch(resource) {
      var _this3 = this;

      resource['search'] = function (params) {
        return utils.buildSearchMethod(resource.path, _this3.request.bind(_this3))(params);
      };

      return resource;
    }
  }]);

  return Instagram;
}();