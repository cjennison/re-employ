import { DataStore } from 'js-data';
import { HttpAdapter } from 'js-data-http';
import scopeObject from './scope'

const store = new DataStore();
const httpAdapter = new HttpAdapter({
  basePath: 'http://127.0.0.1:3000',
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

export {store, httpAdapter}