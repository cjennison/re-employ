<template lang='pug'>
  #app.container-fluid
    .row
      #top-nav-container.col-xs-12
        top-navigation-bar(:current_user="current_user", :authenticated="authenticated")
    .row
      #side-nav-container.col-xs-2
        left-navigation-bar(:authenticated="authenticated")
      #main-container.col-xs-10
         transition(name="fade")
          router-view
</template>

<script>

import scopeObject from './services/scope'
import _ from 'lodash'
import TopNavigationBar from './components/structure/TopNavigationBar.vue'
import LeftNavigationBar from './components/structure/LeftNavigationBar.vue'

export default {
  name: 'app',
  components: {
    TopNavigationBar,
    LeftNavigationBar
  },
  data () {
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
    isAuthenticated() {
      this.$auth.isAuthenticated().then((result) => {
        this.authenticated = result
        this.current_user = scopeObject.current_user
      }) 
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
