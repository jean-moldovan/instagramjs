const utils = require('../src/lib/utils')

describe('buildRequestMethod', () => {
  let request

  beforeEach(() => {
    request = jasmine.createSpy('request')
  })

  it('should build request method correctly', () => {
    utils.buildRequestMethod('get', '/test', request)()
    expect(request).toHaveBeenCalledWith({
      method: 'get',
      url: '/test'
    })
  })

  it('should support full response option', () => {
    utils.buildRequestMethod('get', '/test', request)(true)
    expect(request).toHaveBeenCalledWith({
      method: 'get',
      url: '/test',
      fullResponse: true
    })
  })

  it('should support timeout option', () => {
    utils.buildRequestMethod('get', '/test', request)(20)
    expect(request).toHaveBeenCalledWith({
      method: 'get',
      url: '/test',
      timeout: 20
    })
  })

  it('should support params', () => {
    utils.buildRequestMethod('get', '/test', request)({ foo: 'bar' })
    expect(request).toHaveBeenCalledWith({
      method: 'get',
      url: '/test',
      params: {
        foo: 'bar'
      }
    })
  })

  it('should support combination of two options', () => {
    utils.buildRequestMethod('get', '/test', request)({ foo: 'bar' }, 30)
    expect(request).toHaveBeenCalledWith({
      method: 'get',
      url: '/test',
      params: {
        foo: 'bar'
      },
      timeout: 30
    })
  })

  it('should support combination of three options', () => {
    utils.buildRequestMethod('get', '/test', request)({ foo: 'bar' }, true, 40)
    expect(request).toHaveBeenCalledWith({
      method: 'get',
      url: '/test',
      params: {
        foo: 'bar'
      },
      fullResponse: true,
      timeout: 40
    })
  })
})
