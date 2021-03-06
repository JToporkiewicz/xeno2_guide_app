import updateAvailability from "./updateAvailability"

class HttpError extends Error {
  constructor (status, message = 'HTTP Error') {
    super(message)
    this.status = status
  }
}

/** Get the response for a specific request **/
async function request (url, path, query = {}, options = {}) {
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
  constructor (url, name) {
    this.url = url
    this.name = name
  }

  /** CRUD methods **/

  find (query = {}, options = {}) {
    return request(this.url, this.name, query, Object.assign({ method: 'get' }, options))
  }

  get (id, query = {}, options = {}) {
    return request(this.url, this.name + '/' + id, query, Object.assign({ method: 'get' }, options))
  }

  update (id, data = {}, options = {}) {
    const defaultOptions = { method: 'put', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
    if(this.name === "storyProgress"){
      updateAvailability(data)
    }
    return request(this.url, this.name + '/' + id, {}, Object.assign(defaultOptions, options))
  }
}

/** Represents the API client **/
class ApiClient {
  constructor (url) {
    this.url = "http://localhost:" + url
  }

  /** Returns a single resource **/
  resource (name) {
    return new Resource(this.url, name)
  }
}

export { ApiClient }
export default new ApiClient(process.env.PORT || 4001)
