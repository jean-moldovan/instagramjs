'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var axios = require('axios');
var config = require('./config');
var utils = require('./utils');

module.exports = function () {
  function Api(token, customConfig) {
    _classCallCheck(this, Api);

    this.config = utils.assign(config, this._applyToken(customConfig || {}, token));
  }

  _createClass(Api, [{
    key: 'request',
    value: function request(options) {
      options.params = utils.assign(this.config.params, options.params);
      var requestOptions = utils.assign(this.config, options);

      return axios(requestOptions).then(requestOptions.fullResponse ? this._handleFullResponse : this._handleResponse).catch(this._handleError);
    }
  }, {
    key: '_applyToken',
    value: function _applyToken(obj, token) {
      obj.params = utils.assign(obj.params, { access_token: token });
      return obj;
    }
  }, {
    key: '_handleResponse',
    value: function _handleResponse(res) {
      return res.data.data;
    }
  }, {
    key: '_handleFullResponse',
    value: function _handleFullResponse(res) {
      return {
        status: res.status,
        headers: res.headers,
        data: res.data.data
      };
    }
  }, {
    key: '_handleError',
    value: function _handleError(err) {
      return Promise.reject(err.response ? utils.buildApiError(err) : utils.buildConnectionError(err));
    }
  }]);

  return Api;
}();