<template lang='pug'>
  #app
    router-link(to="/" tag="button" id='home-button') Home
    button(v-if='authenticated' v-on:click='logout' id='logout-button') Logout
    button(v-else v-on:click='$auth.loginRedirect' id='login-button') Login
    router-link(v-if='!authenticated' to="/register" tag="button" id='home-button') Register

    .user-info(v-if='current_user')
      .name {{current_user.firstName}} {{current_user.lastName}}
    
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

import scopeObject from './services/scope'
import { store } from './services/HttpService';

export default {
  name: 'app',
  data: function () {
    return {
      authenticated: false,
      current_user: null
    }
  },
  async created () {
    this.isAuthenticated()
  },
  watch: {
    '$route': 'isAuthenticated'
  },
  methods: {
    async isAuthenticated() {
      this.authenticated = await this.$auth.isAuthenticated()
      if (this.authenticated) {
        const token = localStorage.getItem("okta-token-storage");
        scopeObject.auth_token = token;
        store.find('user', scopeObject.auth_token.idToken.claims.sub)
          .then((user) => {
            scopeObject.current_user = user
            this.current_user = scopeObject.current_user
          })
          .catch((err) => {
            console.warn(err)
          })
      }
    },
    async logout() {
      await this.$auth.logout();
      await this.isAuthenticated();

      this.current_user = scopeObject.current_user = null;

      // Navigate back to home
      this.$router.push({ path: '/' });
    }
  }
}
</script>

<style lang="scss">
  #app {
    .user-info {
      float: right;
    }
  }
</style>
