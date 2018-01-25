const axios = require('axios')
const config = require('./config')
const utils = require('./utils')

module.exports = class Api {
  constructor (token, customConfig) {
    this.config = utils.assign(config, this._applyToken(customConfig || {}, token))
  }

  request (options) {
    options.params = utils.assign(this.config.params, options.params)
    const requestOptions = utils.assign(this.config, options)

    return axios(requestOptions)
      .then(requestOptions.fullResponse ? this._handleFullResponse : this._handleResponse)
      .catch(this._handleError)
  }

  _applyToken (obj, token) {
    obj.params = utils.assign(obj.params, { access_token: token })
    return obj
  }

  _handleResponse (res) {
    return res.data.data
  }

  _handleFullResponse (res) {
    return {
      status: res.status,
      headers: res.headers,
      data: res.data.data
    }
  }

  _handleError (err) {
    return Promise.reject(err.response ? utils.buildApiError(err) : utils.buildConnectionError(err))
  }
}
