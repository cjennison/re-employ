import scopeObject from './scope'
import { store } from './HttpService';

class UserUpdater {
  updateUser() {
    const token = localStorage.getItem("okta-token-storage");
    scopeObject.auth_token = token;
    return store.find('user', scopeObject.auth_token.idToken.claims.sub, {
        params: {
          fields: ['Job']
        },
        force: true  
      })
        .then((user) => {
          scopeObject.current_user = user
        })
        .catch((err) => {
          console.warn(err)
        })
  }
}

export default new UserUpdater();