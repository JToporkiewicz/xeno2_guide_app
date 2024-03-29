class HttpError extends Error {
  status: number
  constructor (status:number, message = 'HTTP Error') {
    super(message)
    this.status = status
  }
}

/** Get the response for a specific request **/
const request = async (
  url:string,
  path:string,
  query:{[key:string]:any} = {},
  options:{[key:string]:any} = {}
) => {
  let queryString = ''
  if (Object.keys(query).length > 0) {
    queryString = '?' + Object.keys(query).map(param => `${param}=${query[param]}`).join('&')
  }
  const response = await fetch(new Request (url + '/' + path + queryString, options))
  if (response.status >= 400) {
    throw new HttpError(response.status)
  }
  return response.json()
}

/** Represents a single API resource **/
class Resource {
  url: string
  name: string
  constructor (url:string, name:string) {
    this.url = url
    this.name = name
  }

  /** CRUD methods **/

  find (query = {}, options = {}) {
    return request(this.url, this.name, query, Object.assign({ method: 'get' }, options))
  }

  get (id:number, query = {}, options = {}) {
    return request(this.url, this.name + '/' + id, query, Object.assign({ method: 'get' }, options))
  }

  update (id:number, data = {}, options = {}) {
    const defaultOptions = {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    return request(this.url, this.name + '/' + id, {}, Object.assign(defaultOptions, options))
  }
}

/** Represents the API client **/
class ApiClient {
  url: string
  constructor (url:string) {
    this.url = 'http://localhost:' + url
  }

  async callAPI (api: string, method: string, body?: unknown) {
    return await fetch(this.url + api,
      Object.assign({
        method,
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
      }))
  }

  /** Returns a single resource **/
  resource (name:string) {
    return new Resource(this.url, name)
  }
}

export { ApiClient }
export default new ApiClient(process.env.PORT || '4001')
