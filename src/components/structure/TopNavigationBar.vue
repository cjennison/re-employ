<template lang="pug">
  .top-nav-bar
    button(v-if='authenticated' v-on:click='logout' id='logout-button') Logout
    button(v-else v-on:click='$auth.loginRedirect' id='login-button') Login
    router-link(v-if='!authenticated' to="/register" tag="button" id='home-button') Register
    router-link(v-if="userHasRole('admin')" to="/admin" tag="button" id='jobs-button') ADMIN
    .user-info(v-if='current_user')
      .name {{current_user.firstName}} {{current_user.lastName}}
</template>

<script>
export default {
  name: 'top_navigation_bar',
  props: {
    current_user: {
      type: Object,
      required: false,
      default: null
    },
    authenticated: {
      type: Boolean,
      required: true
    }
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

