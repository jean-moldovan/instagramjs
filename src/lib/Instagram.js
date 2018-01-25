const Api = require('./Api')

const user = require('./user')
const media = require('./media')
const tag = require('./tag')
const location = require('./location')

const utils = require('./utils')

module.exports = class Instagram {
  constructor (token, customConfig = {}) {
    if (typeof token !== 'string') {
      throw new Error('Token must be string!')
    }

    this.api = new Api(token, customConfig)
  }

  request (options) {
    return this.api.request(options)
  }

  user (id) {
    return this._buildResource(user, id)
  }

  media (id) {
    return this._buildResource(media, id)
  }

  tag (name) {
    return this._buildResource(tag, name)
  }

  location (id) {
    return this._buildResource(location, id)
  }

  _buildResource (config, id, parentPath) {
    var resource = {}

    resource.path = this._buildPath(config.path, id, parentPath)

    if (config.methods) {
      resource = this._attachMethods(resource, config.methods)
    }

    if (config.nested) {
      resource = this._attachNested(resource, config.nested)
    }

    if (config.hasSearch) {
      resource = this._attachSearch(resource)
    }

    return resource
  }

  _buildPath (path, id, parentPath) {
    if (typeof path !== 'string') {
      path = path(id) // use path formatter
    }

    return (parentPath || '') + path
  }

  _attachMethods (resource, methods) {
    methods.forEach(method => {
      resource[method] = utils.buildRequestMethod(method, resource.path, this.request.bind(this))
    })

    return resource
  }

  _attachNested (resource, nested) {
    nested.forEach(config => {
      resource[config.name] = id => this._buildResource(config, id, resource.path)
    })

    return resource
  }

  // .search({ foo: 'bar' }) -> /search?foo=bar
  _attachSearch (resource) {
    resource['search'] = params => {
      return utils.buildSearchMethod(resource.path, this.request.bind(this))(params)
    }

    return resource
  }
}
