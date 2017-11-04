function buildApiError (err) {
  return buildError(err.response.data.meta.error_message, {
    config: buildErrorConfig(err.config),
    status: err.response.status,
    type: err.response.data.meta.error_type
  })
}

function buildConnectionError (err) {
  return buildError(err.message, {
    config: buildErrorConfig(err.config),
    code: err.code
  })
}

function buildErrorConfig (config) {
  return {
    headers: config.headers,
    timeout: config.timeout,
    method: config.method,
    fullResponse: config.fullResponse,
    url: config.url,
    params: config.params,
    data: config.data
  }
}

function buildError (msg, extendWith) {
  return Object.assign(new Error(msg), extendWith)
}

function buildRequestMethod (method, url, request) {
  return function (params, fullResponse, timeout) {
    // .get(true) -> fullResponse === true
    if (typeof params === 'boolean') {
      timeout = fullResponse
      fullResponse = params
      params = null

    // .get(10) -> timeout === 10
    } else if (typeof params === 'number') {
      timeout = params
      params = null
      fullResponse = null

    // .get({}, 20) -> timeout === 20
    } else if (typeof fullResponse === 'number') {
      timeout = fullResponse
      fullResponse = null
    }

    return request(removeEmpty({ method, url, timeout, fullResponse, params }))
  }
}

function buildSearchMethod (path, request) {
  return buildRequestMethod('get', path + '/search', request)
}

function removeEmpty (obj) {
  Object.keys(obj).forEach(key => {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key]
    }
  })

  return obj
}

function assign (target, source) {
  return Object.assign({}, target, source)
}

module.exports = {
  buildApiError,
  buildConnectionError,
  buildRequestMethod,
  buildSearchMethod,
  assign
}
