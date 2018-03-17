class ScopeObject {
  get auth_token() {
    return this._auth_token
  }
  set auth_token(token) {
    this._auth_token = JSON.parse(token)
  }

  get current_user() {
    return this._current_user
  }
  set current_user(user) {
    this._current_user = user
  }
}


export default new ScopeObject();