<template lang='pug'>
  #app
    router-link(to="/" tag="button" id='home-button') Home
    button(v-if='authenticated' v-on:click='logout' id='logout-button') Logout
    button(v-else v-on:click='$auth.loginRedirect' id='login-button') Login
    router-link(v-if='!authenticated' to="/register" tag="button" id='home-button') Register

    router-link(to="/jobs" tag="button" id='jobs-button') Jobs
    router-link(v-if='authenticated', to="/opportunities" tag="button" id='opportunities-button') Opportunities

    router-link(v-if="userHasRole('admin')" to="/admin" tag="button" id='jobs-button') ADMIN


    .user-info(v-if='current_user')
      .name {{current_user.firstName}} {{current_user.lastName}}
    
    transition(name="fade")
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

import scopeObject from './services/scope'
import _ from 'lodash'

export default {
  name: 'app',
  data: function () {
    return {
      authenticated: false,
      current_user: null
    }
  },
  created () {
    this.isAuthenticated()
  },
  watch: {
    '$route': 'isAuthenticated'
  },
  methods: {
    userHasRole(role) {
      if (!this.current_user) {
        return false;
      }
      return _.find(this.current_user.Roles, (userRole) => {
        return userRole.name === role
      })
    },

    isAuthenticated() {
      this.$auth.isAuthenticated().then((result) => {
        this.authenticated = result
        this.current_user = scopeObject.current_user
      })
      
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
