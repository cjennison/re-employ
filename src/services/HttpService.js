import { DataStore } from 'js-data';
import { HttpAdapter } from 'js-data-http';
import scopeObject from './scope'

const basePath = process.env.VUE_APP_API_URL;

const store = new DataStore();
const httpAdapter = new HttpAdapter({
  basePath: basePath,
  beforeHTTP: function (config, opts) {
    config.headers || (config.headers = {});

    if (scopeObject.auth_token) {
      config.headers.authorization = `Bearer ${scopeObject.auth_token.accessToken.accessToken}`;
    }
    // Now do the default behavior
    return HttpAdapter.prototype.beforeHTTP.call(this, config, opts);
  }
});

store.registerAdapter('http', httpAdapter, { 'default': true });
store.defineMapper('user', {
  name: 'user',
  endpoint: 'users'
});

store.defineMapper('job', {
  name: 'job',
  endpoint: 'jobs'
});

store.defineMapper('jobOpening', {
  name: 'jobOpening',
  endpoint: 'job_openings'
});

httpAdapter.resourceBasePath = (resourceType, resourceId) => {
  return `${basePath}/${resourceType}/${resourceId}/`
}

export {store, httpAdapter};